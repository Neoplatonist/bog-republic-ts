import { Mycelium } from '@/libs/types';
import {
  AddMycelium,
  SubtractMycelium,
  MultiplyMycelium,
  DivideMycelium,
} from './myceliumMath';

describe('AddMycelium', () => {
  it('should add two positive numbers with the same base and exponent', () => {
    expect(
      AddMycelium(
        { mycelium: 3, myceliumNotation: 4 },
        { mycelium: 3, myceliumNotation: 4 }
      )
    ).toEqual({ mycelium: 6, myceliumNotation: 4 });
  });

  it('should add two positive numbers with different bases and the same exponent', () => {
    expect(
      AddMycelium(
        { mycelium: 3, myceliumNotation: 5 },
        { mycelium: 2, myceliumNotation: 5 }
      )
    ).toEqual({ mycelium: 5, myceliumNotation: 5 });
  });

  it('should add two positive numbers with the same base and different exponents', () => {
    expect(
      AddMycelium(
        { mycelium: 3, myceliumNotation: 4 },
        { mycelium: 3, myceliumNotation: 3 }
      )
    ).toEqual({ mycelium: 3.3, myceliumNotation: 4 });
  });

  it('should add two positive numbers with different bases and different exponents', () => {
    expect(
      AddMycelium(
        { mycelium: 3, myceliumNotation: 5 },
        { mycelium: 2, myceliumNotation: 3 }
      )
    ).toEqual({ mycelium: 3.02, myceliumNotation: 5 });
  });

  it('should add two numbers together and roll the base/exponent up', () => {
    expect(
      AddMycelium(
        { mycelium: 9, myceliumNotation: 4 },
        { mycelium: 3, myceliumNotation: 4 }
      )
    ).toEqual({ mycelium: 1.2, myceliumNotation: 5 });
  });
});

describe('SubtractMycelium', () => {
  it('should subtract two positive numbers with the same base and exponent', () => {
    expect(
      SubtractMycelium(
        { mycelium: 3, myceliumNotation: 4 },
        { mycelium: 2, myceliumNotation: 4 }
      )
    ).toEqual({ mycelium: 1, myceliumNotation: 4 });
  });

  it('should subtract two positive numbers with different bases and the same exponent', () => {
    expect(
      SubtractMycelium(
        { mycelium: 3, myceliumNotation: 5 },
        { mycelium: 2, myceliumNotation: 5 }
      )
    ).toEqual({ mycelium: 1, myceliumNotation: 5 });
  });

  it('should subtract two positive numbers with the same base and different exponents', () => {
    expect(
      SubtractMycelium(
        { mycelium: 3, myceliumNotation: 4 },
        { mycelium: 3, myceliumNotation: 3 }
      )
    ).toEqual({ mycelium: 2.7, myceliumNotation: 4 });
  });

  it('should subtract two positive numbers with different bases and different exponents', () => {
    expect(
      SubtractMycelium(
        { mycelium: 3, myceliumNotation: 5 },
        { mycelium: 2, myceliumNotation: 3 }
      )
    ).toEqual({ mycelium: 2.98, myceliumNotation: 5 });
  });
});

describe('MultiplyMycelium', () => {
  it('should correctly multiply two mycelium numbers', () => {
    const m1: Mycelium = { mycelium: 3, myceliumNotation: 4 };
    const m2: Mycelium = { mycelium: 2, myceliumNotation: 5 };
    const result = MultiplyMycelium(m1, m2);
    expect(result).toEqual({ mycelium: 6, myceliumNotation: 9 });
  });
});

describe('DivideMycelium', () => {
  it('should correctly divide two mycelium numbers', () => {
    const m1: Mycelium = { mycelium: 5, myceliumNotation: 6 };
    const m2: Mycelium = { mycelium: 2, myceliumNotation: 3 };
    const result = DivideMycelium(m1, m2);
    expect(result).toEqual({ mycelium: 2.5, myceliumNotation: 3 });
  });
});
