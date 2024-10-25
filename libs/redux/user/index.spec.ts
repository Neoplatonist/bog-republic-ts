import { MyceliumObject } from '@/libs/types';
import userSlice, {
  IncreaseMycelium,
  DecreaseMycelium,
  UserState,
} from '@/libs/redux/user';

const userReducer = userSlice.reducer;

// Test case: should add Mycelium
it('should add Mycelium', () => {
  // Set up initial state
  const initialState = {
    data: {
      mycelium: 0.0,
      myceliumNotation: 0,
    },
    errors: null,
  } as UserState;

  // Define the payload for the IncreaseMycelium action
  const payload: MyceliumObject = {
    mycelium: 1.1,
    myceliumNotation: 0,
  };

  // Define the expected result after applying the IncreaseMycelium action
  const expected: MyceliumObject = {
    mycelium: 1.1,
    myceliumNotation: 0,
  };

  // Dispatch the IncreaseMycelium action
  const action = IncreaseMycelium(payload);
  const newState = userReducer(initialState, action);

  // Assert that the mycelium and myceliumNotation in the state have been updated correctly
  expect(newState.data.mycelium).toEqual(expected.mycelium);
  expect(newState.data.myceliumNotation).toEqual(expected.myceliumNotation);
});

// Test case: should subtract Mycelium
it('should subtract Mycelium', () => {
  // Set up initial state
  const initialState = {
    data: {
      mycelium: 4,
      myceliumNotation: 1,
    },
    errors: null,
  } as UserState;

  // Define the payload for the DecreaseMycelium action
  const payload: MyceliumObject = {
    mycelium: 1.1,
    myceliumNotation: 1,
  };

  // Define the expected result after applying the DecreaseMycelium action
  const expected: MyceliumObject = {
    mycelium: 2.9,
    myceliumNotation: 1,
  };

  // Dispatch the DecreaseMycelium action
  const action = DecreaseMycelium(payload);
  const newState = userReducer(initialState, action);

  // Assert that the mycelium and myceliumNotation in the state have been updated correctly
  expect(newState.data.mycelium).toEqual(expected.mycelium);
  expect(newState.data.myceliumNotation).toEqual(expected.myceliumNotation);
});

// Test case: should not allow subtracting Mycelium to be less than or equal to zero
it('should not allow subtracting Mycelium to be less than or equal to zero', () => {
  // Set up initial state
  const initialState = {
    data: {
      mycelium: 4,
      myceliumNotation: 1,
    },
    errors: null,
  } as UserState;

  // Define the payload for the DecreaseMycelium action
  const payload: MyceliumObject = {
    mycelium: 5,
    myceliumNotation: 1,
  };

  // Define the expected result after applying the DecreaseMycelium action
  const expected1: MyceliumObject = {
    mycelium: 4,
    myceliumNotation: 1,
  };

  const expected2 = ['Cannot subtract more mycelium than you have'];

  // Dispatch the DecreaseMycelium action
  const action = DecreaseMycelium(payload);
  const newState = userReducer(initialState, action);

  // Assert that the mycelium and myceliumNotation in the state remain unchanged
  expect(newState.data.mycelium).toEqual(expected1.mycelium);
  expect(newState.data.myceliumNotation).toEqual(expected1.myceliumNotation);

  // Assert that the error is set correctly
  expect(newState.errors).toEqual(expected2);
});
