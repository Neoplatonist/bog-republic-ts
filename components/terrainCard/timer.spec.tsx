import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/libs/redux';
import HarvestTerrain from '@/libs/redux/userTerrains/harvestTerrain';
import TerrainTimer from './timer';

describe('TerrainTimer', () => {
  const terrainId = 0;
  const waitTime = 2000;

  beforeEach(() => {
    // Mock the selectTimer selector
    jest.mock('@/libs/redux/timers', () => ({
      selectTimer: (id: string) => ({
        id,
        isLocked: true,
      }),
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('displays the remaining time', () => {
    render(
      <Provider store={store}>
        <TerrainTimer terrainId={terrainId} waitTime={waitTime} />
      </Provider>
    );
    const remainingTime = screen.getByText(/00:00:02/i);
    expect(remainingTime).toBeInTheDocument();
  });

  it('resets the timer when it reaches 0', async () => {
    render(
      <Provider store={store}>
        <TerrainTimer terrainId={terrainId} waitTime={waitTime} />
      </Provider>
    );
    const remainingTime = screen.getByText(/00:00:02/i);
    expect(remainingTime).toBeInTheDocument();

    // Start Harvesting Terrain
    await act(() =>
      store.dispatch(HarvestTerrain({
        terrainId,
        income: {
          mycelium: 3.67,
          myceliumNotation: 12,
        },
        waitTime,
      }))
    );

    // The timer should now display the wait time again
    const newRemainingTime = screen.getByText(/00:00:02/i);
    expect(newRemainingTime).toBe(remainingTime);
  });
});
