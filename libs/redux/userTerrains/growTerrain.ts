import { AppThunkDispatch, RootState } from '@/libs/redux';
import { z } from 'zod';
// MyceliumObject is used in the HarvestTerrain jdoc
// eslint-disable-next-line no-unused-vars
import {
  MyceliumObject,
  MyceliumObjectSchema,
  TerrainObject,
  UserObject,
  UserTerrainsObject,
} from '@/libs/types';
import { GreaterThanOrEqualTo } from '@/libs/myceliumMath';
import { DecreaseMycelium } from '@/libs/redux/user';
import { CalculateNextCost } from './calculateNextCost';
import { CalculateNextIncome } from './calculateNextIncome';
import {
  incrementNumberOwned,
  lockHarvest,
  setNextCost,
  setCurrentIncome,
  unlockHarvest,
} from '.';
import { time } from 'console';

/**
 * Schema for the parameters required to harvest a terrain.
 */
const growTerrainSchema = z.object({
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
type GrowTerrainParams = z.infer<typeof growTerrainSchema>;

/**
 * Redux action thunk to harvest a terrain.
 * Harvesting means adding the terrain's income to the user's mycelium.
 *
 * @export
 * @param {GrowTerrainParams}
 * @returns {Promise<void>}
 */
const GrowTerrain =
  ({ terrainId }: GrowTerrainParams) =>
  async (dispatch: AppThunkDispatch, getState: RootState) => {
    // Lock terrain harvest
    dispatch(lockHarvest(terrainId));

    const terrain: TerrainObject = getState().terrains.data.find(
      (terrain: TerrainObject) => terrain.id === terrainId
    );
    const userTerrain: UserTerrainsObject = getState().userTerrains.data.find(
      (userTerrain: UserTerrainsObject) => userTerrain.id === terrainId
    );
    const user: UserObject = getState().user.data;

    // Sanity check
    if (!terrain || !userTerrain) {
      dispatch(unlockHarvest(terrainId));
      return;
    }

    // Check and see if the user's myclium is greater than the cost of the growth purchase
    // If it is, subtract the cost of the growth purchase from the user's mycelium
    // If it is not, return an error message
    const canGrow = GreaterThanOrEqualTo(
      {
        mycelium: user.mycelium,
        myceliumNotation: user.myceliumNotation,
      },
      {
        mycelium: userTerrain.nextCost,
        myceliumNotation: userTerrain.nextCostNotation,
      }
    );

    if (!canGrow) {
      dispatch(unlockHarvest(terrainId));
      return;
    }

    // Subtract the cost of the growth purchase from the user's mycelium
    dispatch(
      DecreaseMycelium({
        mycelium: userTerrain.nextCost,
        myceliumNotation: userTerrain.nextCostNotation,
      })
    );

    // Calculates the cost of the next Growth purchase
    const calculatedNextCost = CalculateNextCost({
      cost: {
        mycelium: userTerrain.nextCost,
        myceliumNotation: userTerrain.nextCostNotation,
      },
      coefficient: terrain.coefficient,
      numberOwned: userTerrain.numberOwned + 1,
    });

    // Calculates the new mycelium production rate
    const calculatedIncome = CalculateNextIncome({
      income: {
        mycelium: userTerrain.currentIncome,
        myceliumNotation: userTerrain.currentIncomeNotation,
      },
      coefficient: terrain.coefficient,
      numberOwned: userTerrain.numberOwned + 1,
    });

    // Increment number of terrain owned
    dispatch(incrementNumberOwned(terrainId));

    // Set the new cost and income
    // dispatch(setNextCost({ terrainId, ...calculatedNextCost }));
    // dispatch(setCurrentIncome({ terrainId, ...calculatedIncome }));

    // switched the calculations to see how it affects the speed of the game
    dispatch(setNextCost({ terrainId, ...calculatedIncome }));
    dispatch(setCurrentIncome({ terrainId, ...calculatedNextCost }));

    // not sure if this is needed
    // dispatch(aggregateTheIncome(name));
    // if (numberOwned === 0) {
    //   dispatch(unlockIndustry(name));
    // }

    // Unlock terrain harvest
    dispatch(unlockHarvest(terrainId));
  };

export default GrowTerrain;
