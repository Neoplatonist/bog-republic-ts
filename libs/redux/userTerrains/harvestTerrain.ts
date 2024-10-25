import { AppThunkDispatch } from '@/libs/redux';
import { startTimer, stopTimer } from '@/libs/redux/timers';
import { IncreaseMycelium } from '@/libs/redux/user';
import { z } from 'zod';
// MyceliumObject is used in the HarvestTerrain jdoc
// eslint-disable-next-line no-unused-vars
import { MyceliumObject, MyceliumObjectSchema } from '@/libs/types';

/**
 * Schema for the parameters required to harvest a terrain.
 */
const harvestTerrainSchema = z.object({
  terrainId: z.number(),
  income: MyceliumObjectSchema,
  waitTime: z.number(),
});

/**
 * Type representing the parameters for harvesting a terrain.
 */
type harvestTerrainParams = z.infer<typeof harvestTerrainSchema>;

/**
 * Redux action thunk to harvest a terrain.
 * Harvesting means adding the terrain's income to the user's mycelium.
 *
 * @export
 * @param {number} terrainId - The ID of the terrain to be harvested.
 * @param {MyceliumObject} income - The income object containing mycelium details.
 * @param {number} waitTime - The wait time before unlocking the terrain harvest.
 */
const HarvestTerrain =
  ({ terrainId, income, waitTime }: harvestTerrainParams) =>
  async (dispatch: AppThunkDispatch) => {
    // Lock terrain harvest
    dispatch(startTimer({ timerId: terrainId, duration: waitTime }));

    // Dispatch increase mycelium by terrain income
    dispatch(
      IncreaseMycelium({
        mycelium: income.mycelium,
        myceliumNotation: income.myceliumNotation,
      })
    );

    // Unlock terrain harvest after the specified wait time
    setTimeout(() => {
      dispatch(stopTimer({ timerId: terrainId }));
    }, waitTime + 200); // Adds 200ms to wait time to account for timer inaccuracies
  };

export default HarvestTerrain;
