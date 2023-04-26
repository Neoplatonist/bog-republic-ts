import { Mycelium } from '@/libs/types';
import {
  AddToMycelium,
  SubtractFromMycelium,
  UserState,
  userReducer,
} from '@/libs/redux/user';

it('should add Mycelium', () => {
  const initialState = {
    data: {
      mycelium: 0.0,
      myceliumNotation: 0,
    },
    errors: null,
  } as UserState;

  const payload: Mycelium = {
    mycelium: 1.1,
    myceliumNotation: 0,
  };

  const expected: Mycelium = {
    mycelium: 1.1,
    myceliumNotation: 0,
  };

  const action = AddToMycelium(payload);
  const newState = userReducer(initialState, action);

  expect(newState.data.mycelium).toEqual(expected.mycelium);
  expect(newState.data.myceliumNotation).toEqual(expected.myceliumNotation);
});

it('should subtract Mycelium', () => {
  const initialState = {
    data: {
      mycelium: 4,
      myceliumNotation: 1,
    },
    errors: null,
  } as UserState;

  const payload: Mycelium = {
    mycelium: 1.1,
    myceliumNotation: 1,
  };

  const expected: Mycelium = {
    mycelium: 2.9,
    myceliumNotation: 1,
  };

  const action = SubtractFromMycelium(payload);
  const newState = userReducer(initialState, action);

  expect(newState.data.mycelium).toEqual(expected.mycelium);
  expect(newState.data.myceliumNotation).toEqual(expected.myceliumNotation);
});

it('should not allow subtracting Mycelium to be less than or equal to zero', () => {
  const initialState = {
    data: {
      mycelium: 4,
      myceliumNotation: 1,
    },
    errors: null,
  } as UserState;

  const payload: Mycelium = {
    mycelium: 5,
    myceliumNotation: 1,
  };

  const expected1: Mycelium = {
    mycelium: 4,
    myceliumNotation: 1,
  };

  const expected2 = ['Cannot subtract more mycelium than you have'];

  const action = SubtractFromMycelium(payload);
  const newState = userReducer(initialState, action);

  // Ensure that the mycelium is not subtracted
  expect(newState.data.mycelium).toEqual(expected1.mycelium);
  expect(newState.data.myceliumNotation).toEqual(expected1.myceliumNotation);

  // Check that the error is set
  expect(newState.errors).toEqual(expected2);
});
