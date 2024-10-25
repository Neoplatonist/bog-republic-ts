import { MyceliumObject } from '@/libs/types';
import {
  AddMycelium,
  SubtractMycelium,
  MultiplyMycelium,
  DivideMycelium,
  MatchMyceliumNotation,
} from './myceliumMath';

describe('MatchMyceliumNotation', () => {
  it('matches the notation of two Mycelium values', () => {
    const m1 = { mycelium: 1.2345, myceliumNotation: 0 };
    const m2 = { mycelium: 0.9876, myceliumNotation: 1 };
    const [m1Adjusted, m2Adjusted] = MatchMyceliumNotation(m1, m2);
    expect({
      mycelium: parseFloat(m1Adjusted.mycelium.toFixed(4)),
      myceliumNotation: m1Adjusted.myceliumNotation,
    }).toEqual({ mycelium: 0.1234, myceliumNotation: 1 });
    expect(m2Adjusted).toEqual({ mycelium: 0.9876, myceliumNotation: 1 });
  });

  it('handles Mycelium values with different notations', () => {
    const m1 = { mycelium: 1.2345, myceliumNotation: 1 };
    const m2 = { mycelium: 0.9876, myceliumNotation: 0 };
    const [m1Adjusted, m2Adjusted] = MatchMyceliumNotation(m1, m2);
    expect(m1Adjusted).toEqual({ mycelium: 1.2345, myceliumNotation: 1 });
    expect(m2Adjusted).toEqual({ mycelium: 0.09876, myceliumNotation: 1 });
  });

  it('handles Mycelium values with the same notation', () => {
    const m1 = { mycelium: 1.2345, myceliumNotation: 0 };
    const m2 = { mycelium: 0.9876, myceliumNotation: 0 };
    const [m1Adjusted, m2Adjusted] = MatchMyceliumNotation(m1, m2);
    expect(m1Adjusted).toEqual({ mycelium: 1.2345, myceliumNotation: 0 });
    expect(m2Adjusted).toEqual({ mycelium: 0.9876, myceliumNotation: 0 });
  });
});

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

  it('should subtract two numbers with the base of 4 decimal places', () => {
    const m1 = { mycelium: 1.2345, myceliumNotation: 1 };
    const m2 = { mycelium: 0.9876, myceliumNotation: 0 };
    const result = SubtractMycelium(m1, m2);
    expect(result).toEqual({ mycelium: 1.13574, myceliumNotation: 1 });
  });

  it('v1 should subtract two numbers with different exponents and roll the base/exponent down', () => {
    const m1 = { mycelium: 1.17, myceliumNotation: 1 };
    const m2 = { mycelium: 3.78, myceliumNotation: 0 };
    const result = SubtractMycelium(m1, m2);
    const resultPrecise = {
      mycelium: parseFloat(result.mycelium.toPrecision(3)),
      myceliumNotation: 0,
    };
    expect(resultPrecise).toEqual({ mycelium: 7.92, myceliumNotation: 0 });
  });

  it('v2 should subtract two numbers with different exponents and roll the base/exponent down', () => {
    const m1 = { mycelium: 1.0, myceliumNotation: 1 };
    const m2 = { mycelium: 3.78, myceliumNotation: 0 };
    const result = SubtractMycelium(m1, m2);
    const resultPrecise = {
      mycelium: parseFloat(result.mycelium.toPrecision(4)),
      myceliumNotation: 0,
    };
    expect(resultPrecise).toEqual({ mycelium: 6.22, myceliumNotation: 0 });
  });
});

describe('MultiplyMycelium', () => {
  it('should correctly multiply two mycelium numbers', () => {
    const m1: MyceliumObject = { mycelium: 3, myceliumNotation: 4 };
    const m2: MyceliumObject = { mycelium: 2, myceliumNotation: 5 };
    const result = MultiplyMycelium(m1, m2);
    expect(result).toEqual({ mycelium: 6, myceliumNotation: 9 });
  });

  it('should correctly multiply two mycelium numbers with different bases', () => {
    const m1: MyceliumObject = { mycelium: 3, myceliumNotation: 4 };
    const m2: MyceliumObject = { mycelium: 2, myceliumNotation: 3 };
    const result = MultiplyMycelium(m1, m2);
    expect(result).toEqual({ mycelium: 6, myceliumNotation: 7 });
  });

  it('should correctly multiply two mycelium numbers with different exponents', () => {
    const m1: MyceliumObject = { mycelium: 3, myceliumNotation: 4 };
    const m2: MyceliumObject = { mycelium: 2, myceliumNotation: 5 };
    const result = MultiplyMycelium(m1, m2);
    expect(result).toEqual({ mycelium: 6, myceliumNotation: 9 });
  });

  it(' should correctly multiply two mycelium numbers when one exponents is 0', () => {
    const m1: MyceliumObject = { mycelium: 3, myceliumNotation: 1 };
    const m2: MyceliumObject = { mycelium: 9, myceliumNotation: 0 };
    const result = MultiplyMycelium(m1, m2);
    expect(result).toEqual({ mycelium: 2.7, myceliumNotation: 2 });
  });
});

describe('DivideMycelium', () => {
  it('should correctly divide two mycelium numbers', () => {
    const m1: MyceliumObject = { mycelium: 5, myceliumNotation: 6 };
    const m2: MyceliumObject = { mycelium: 2, myceliumNotation: 3 };
    const result = DivideMycelium(m1, m2);
    expect(result).toEqual({ mycelium: 2.5, myceliumNotation: 3 });
  });
});
