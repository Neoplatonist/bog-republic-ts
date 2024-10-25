import { AppThunkDispatch, RootState } from '@/libs/redux';
import { z } from 'zod';
// MyceliumObject is used in the HarvestTerrain jdoc
// eslint-disable-next-line no-unused-vars
import {
  MyceliumObject,
  MyceliumObjectSchema,
  TerrainObject,
  UserTerrainsObject,
} from '@/libs/types';
import { GreaterThanOrEqualTo } from '@/libs/myceliumMath';
import { DecreaseMycelium } from '@/libs/redux/user';
import { CalculateNextCost } from './calculateNextCost';
import { CalculateNextIncome } from './calculateNextIncome';
import {
  incrementNumberOwned,
  lockHarvest,
  unlockHarvest,
  addUserTerrain,
} from '.';
import { time } from 'console';

/**
 * Schema for the parameters required to harvest a terrain.
 */
const buyTerrainSchema = z.object({
  terrainId: z.number(),
  cost: MyceliumObjectSchema.optional(),
  waitTime: z.number().optional(),
  income: MyceliumObjectSchema.optional(),
  coefficient: z.number().optional(),
  numberOwned: z.number().optional(),
});

/**
 * Type representing the parameters for harvesting a terrain.
 */
type buyTerrainParams = z.infer<typeof buyTerrainSchema>;

/**
 * Redux action thunk to harvest a terrain.
 * Harvesting means adding the terrain's income to the user's mycelium.
 *
 * @export
 * @param {buyTerrainParams}
 * @returns {Promise<void>}
 */
const BuyTerrain =
  ({
    terrainId,
    cost,
    waitTime,
    income,
    coefficient,
    numberOwned,
  }: buyTerrainParams) =>
  async (dispatch: AppThunkDispatch, getState: RootState) => {
    const terrain: TerrainObject = getState().terrains.data.find(
      (terrain: TerrainObject) => terrain.id === terrainId
    );

    console.info({ terrain });

    const user = getState().user.data;

    // Check and see if the user's myclium is greater than the cost of the growth purchase
    // If it is, subtract the cost of the growth purchase from the user's mycelium
    // If it is not, return an error message
    const canBuy = GreaterThanOrEqualTo(
      {
        mycelium: user.mycelium,
        myceliumNotation: user.myceliumNotation,
      },
      {
        mycelium: terrain.baseCost,
        myceliumNotation: terrain.baseCostNotation,
      }
    );

    if (!canBuy) return;

    // Subtract the cost of the growth purchase from the user's mycelium
    dispatch(
      DecreaseMycelium({
        mycelium: terrain.baseCost,
        myceliumNotation: terrain.baseCostNotation,
      })
    );

    // Calculates the cost of the next Growth purchase
    const calculatedNextCost = CalculateNextCost({
      cost: {
        mycelium: terrain.baseCost,
        myceliumNotation: terrain.baseCostNotation,
      },
      coefficient: terrain.coefficient,
      numberOwned: 1,
    });

    // Calculates the new mycelium production rate
    const calculatedIncome = CalculateNextIncome({
      income: {
        mycelium: terrain.income,
        myceliumNotation: terrain.incomeNotation,
      },
      coefficient: terrain.coefficient,
      numberOwned: 1,
    });

    dispatch(
      addUserTerrain({
        userId: user.id,
        id: terrainId,
        terrainId: terrainId,
        currentIncome: calculatedIncome.mycelium,
        currentIncomeNotation: calculatedIncome.myceliumNotation,
        nextCost: calculatedNextCost.mycelium,
        nextCostNotation: calculatedNextCost.myceliumNotation,
        numberOwned: 1,
        isManaged: false,
        isContributionLocked: false,
        createdAt: '',
        updatedAt: '',
      })
    );
  };

export default BuyTerrain;
