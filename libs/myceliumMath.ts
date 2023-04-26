import { Mycelium } from '@/libs/types';

/**
 * adjustMyceliumNotation takes a Mycelium and a number and returns a new Mycelium with
 * the exponent adjusted by the difference.
 *
 * @param {Mycelium} m
 * @param {number} difference
 * @returns {Mycelium}
 */
const adjustMyceliumNotation = (m: Mycelium, difference: number): Mycelium => ({
  mycelium: m.mycelium / 10 ** difference,
  myceliumNotation: m.myceliumNotation + difference,
});

/**
 * matchMyceliumNotation takes two mycelium and adjusts the exponent of the mycelium with the
 * lower exponent to match the exponent of the mycelium with the higher exponent.
 *
 * @param {Mycelium} m1
 * @param {Mycelium} m2
 * @returns {[Mycelium, Mycelium]}
 */
const matchMyceliumNotation = (
  m1: Mycelium,
  m2: Mycelium
): [Mycelium, Mycelium] => {
  if (m1.myceliumNotation > m2.myceliumNotation) {
    return [
      { ...m1 },
      adjustMyceliumNotation(
        { ...m2 },
        m1.myceliumNotation - m2.myceliumNotation
      ),
    ];
  }

  if (m1.myceliumNotation < m2.myceliumNotation) {
    return [
      adjustMyceliumNotation(
        { ...m1 },
        m2.myceliumNotation - m1.myceliumNotation
      ),
      { ...m2 },
    ];
  }

  return [{ ...m1 }, { ...m2 }];
};

/**
 * AddMycelium adds two Mycelium objects together.
 * The new Mycelium object has the same mycelium and exponent as the first Mycelium object,
 * unless the mycelium is greater than or equal to 10, in which case the mycelium is divided by 10
 * and the exponent is increased by 1.
 *
 * @export
 * @param {Mycelium} m1
 * @param {Mycelium} m2
 * @returns {Mycelium}
 */
export const AddMycelium = (m1: Mycelium, m2: Mycelium): Mycelium => {
  const [newM1, newM2] = matchMyceliumNotation(m1, m2);
  const mycelium = newM1.mycelium + newM2.mycelium;
  const myceliumNotation =
    mycelium >= 10 ? newM1.myceliumNotation + 1 : newM1.myceliumNotation;
  return {
    mycelium: mycelium >= 10 ? mycelium / 10 : mycelium,
    myceliumNotation,
  };
};

/**
 * SubtractMycelium subtracts two mycelium values, but always returns a positive result.
 *
 * If the mycelium of the result is negative, then the mycelium is increased by 10 and
 * the exponent is decreased by 1.
 *
 * The mycelium of the result is never greater than 9.
 *
 * @export
 * @param {Mycelium} m1
 * @param {Mycelium} m2
 * @returns {Mycelium}
 */
export const SubtractMycelium = (m1: Mycelium, m2: Mycelium): Mycelium => {
  const [newM1, newM2] = matchMyceliumNotation(m1, m2);
  const mycelium = newM1.mycelium - newM2.mycelium;

  if (mycelium < 0) {
    return {
      mycelium: 10 + mycelium,
      myceliumNotation: newM1.myceliumNotation - 1,
    };
  }

  return { mycelium, myceliumNotation: newM1.myceliumNotation };
};

/**
 * MultiplyMycelium multiplies two Mycelium values. The result is a Mycelium value
 * whose mycelium is the product of the two multiplicands' myceliums, and whose exponent
 * is the sum of the two multiplicands' exponents.
 *
 * @export
 * @param {Mycelium} m1
 * @param {Mycelium} m2
 * @returns {Mycelium}
 */
export const MultiplyMycelium = (m1: Mycelium, m2: Mycelium): Mycelium => {
  const mycelium = m1.mycelium * m2.mycelium;
  const myceliumNotation = m1.myceliumNotation + m2.myceliumNotation;
  return {
    mycelium: mycelium >= 10 ? mycelium / 10 : mycelium,
    myceliumNotation,
  };
};

/**
 * This function divides two mycelia. It takes the mycelium of the first mycelium,
 * divides it by the mycelium of the second mycelium, and subtracts the exponents.
 * If the mycelium is less than 10, it is not divided by 10.
 *
 * @export
 * @param {Mycelium} m1
 * @param {Mycelium} m2
 * @returns {Mycelium}
 */
export const DivideMycelium = (m1: Mycelium, m2: Mycelium): Mycelium => {
  const mycelium = m1.mycelium / m2.mycelium;
  const myceliumNotation = m1.myceliumNotation - m2.myceliumNotation;
  return {
    mycelium: mycelium >= 10 ? mycelium / 10 : mycelium,
    myceliumNotation,
  };
};
