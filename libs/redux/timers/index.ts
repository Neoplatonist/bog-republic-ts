/* eslint-disable no-param-reassign */
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { diff } from 'jsondiffpatch';
import { HYDRATE } from 'next-redux-wrapper';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/libs/redux';

type Timer = {
  duration: number;
  startTime: number;
  isLocked: boolean;
};

interface TimerState {
  [timerId: number]: Timer;
}

/**
 * Initial state for the timerSlice.
 */
const initialState = {
  1: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
  2: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
  3: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
  4: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
  5: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
  6: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
  7: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
  8: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
  9: {
    duration: 1000,
    startTime: 0,
    isLocked: false,
  },
} as TimerState;

/**
 * Redux slice for managing terrain timer-related state.
 */
const timerSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    /**
     * Action to start a timer.
     *
     * @param state - The current state.
     * @param payload - The payload containing the timerId and duration.
     */
    startTimer: (state, { payload }) => {
      const { timerId, duration } = payload;
      state[timerId] = {
        duration,
        startTime: performance.now(),
        isLocked: true,
      };
    },
    /**
     * Action to stop a timer.
     *
     * @param state - The current state.
     * @param payload - The payload containing the timerId.
     */
    stopTimer: (state, { payload }) => {
      const { timerId } = payload;
      state[timerId].isLocked = false;
    },
  },
  extraReducers: (builder) => {
    const HydrateState = createAction(HYDRATE);

    builder
      // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
      // This allows for rehydration of the store from the server while on the client side.
      // This is needed for SSR and SSG.
      .addCase(HydrateState, (state: RootState, action: PayloadAction<any>) => {
        const stateDiff = diff(state, action.payload);
        const wasBumpedOnClient = stateDiff?.timers?.data;

        // Keep existing state or use hydrated state
        const data = wasBumpedOnClient ? state.timers : action.payload.timers;

        // Update state with new data
        return {
          ...state.timers,
          ...action.payload.timers,
          // keep existing state or use hydrated
          ...data,
        };
      });
  },
});

/**
 * Action creators generated for each case reducer function.
 */
export const { startTimer, stopTimer } = timerSlice.actions;

/**
 * Selector to get the timers from the state.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {TimerState['timers']} - All timers.
 */
export const selectAllTimers = (state: RootState) => state.timers;

/**
 * Selector to get a specific timer from the state.
 * @param timerId - The id of the timer to get.
 * @returns {TimerState['timers'][timerId]} - the timer.
 */
export const selectTimer =
  (timerId: number) =>
  (state: RootState): Timer =>
    state.timers[timerId];

export default timerSlice;
