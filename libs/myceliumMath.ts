import { MyceliumObject } from '@/libs/types';

/**
 * adjustMyceliumNotation takes a Mycelium and a number and returns a new Mycelium with
 * the exponent adjusted by the difference.
 *
 * @param {MyceliumObject} m
 * @param {number} difference
 * @returns {MyceliumObject}
 */
const adjustMyceliumNotation = (
  m: MyceliumObject,
  difference: number
): MyceliumObject => ({
  mycelium: m.mycelium / 10 ** difference,
  myceliumNotation: m.myceliumNotation + difference,
});

/**
 * MatchMyceliumNotation takes two mycelium and adjusts the exponent of the mycelium with the
 * lower exponent to match the exponent of the mycelium with the higher exponent.
 *
 * @export
 * @param {MyceliumObject} m1
 * @param {MyceliumObject} m2
 * @returns {[Mycelium, Mycelium]}
 */
export const MatchMyceliumNotation = (
  m1: MyceliumObject,
  m2: MyceliumObject
): [MyceliumObject, MyceliumObject] => {
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
 * @param {MyceliumObject} m1
 * @param {MyceliumObject} m2
 * @returns {MyceliumObject}
 */
export const AddMycelium = (
  m1: MyceliumObject,
  m2: MyceliumObject
): MyceliumObject => {
  const [newM1, newM2] = MatchMyceliumNotation(m1, m2);
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
 * @param {MyceliumObject} m1
 * @param {MyceliumObject} m2
 * @returns {MyceliumObject}
 */
export const SubtractMycelium = (
  m1: MyceliumObject,
  m2: MyceliumObject
): MyceliumObject => {
  const [newM1, newM2] = MatchMyceliumNotation(m1, m2);
  const mycelium = newM1.mycelium - newM2.mycelium;

  if (mycelium < 0) {
    return {
      mycelium: 10 + mycelium,
      myceliumNotation: newM1.myceliumNotation - 1,
    };
  }

  if (mycelium < 1 && newM1.myceliumNotation > 0) {
    return {
      mycelium: mycelium * 10,
      myceliumNotation: newM1.myceliumNotation - 1,
    };
  }

  return { mycelium, myceliumNotation: newM1.myceliumNotation };
};

function adjustExponential(num: MyceliumObject): MyceliumObject {
  while (num.mycelium >= 10) {
    num.mycelium /= 10;
    num.myceliumNotation++;
  }

  return num;
}

/**
 * MultiplyMycelium multiplies two Mycelium values. The result is a Mycelium value
 * whose mycelium is the product of the two multiplicands' myceliums, and whose exponent
 * is the sum of the two multiplicands' exponents.
 *
 * @export
 * @param {MyceliumObject} m1
 * @param {MyceliumObject} m2
 * @returns {MyceliumObject}
 */
export const MultiplyMycelium = (
  m1: MyceliumObject,
  m2: MyceliumObject
): MyceliumObject => {
  const mycelium = m1.mycelium * m2.mycelium;
  const myceliumNotation = m1.myceliumNotation + m2.myceliumNotation;

  return adjustExponential({ mycelium, myceliumNotation });
};

/**
 * This function divides two mycelia. It takes the mycelium of the first mycelium,
 * divides it by the mycelium of the second mycelium, and subtracts the exponents.
 * If the mycelium is less than 10, it is not divided by 10.
 *
 * @export
 * @param {MyceliumObject} m1
 * @param {MyceliumObject} m2
 * @returns {MyceliumObject}
 */
export const DivideMycelium = (
  m1: MyceliumObject,
  m2: MyceliumObject
): MyceliumObject => {
  const mycelium = m1.mycelium / m2.mycelium;
  const myceliumNotation = m1.myceliumNotation - m2.myceliumNotation;
  return {
    mycelium: mycelium >= 10 ? mycelium / 10 : mycelium,
    myceliumNotation,
  };
};

/**
 * This function takes the current mycelium and exponent and compares it to the cost
 * mycelium and exponent. It returns a boolean indicating whether the current mycelium
 * and exponent are less than or equal to the target mycelium and exponent.
 *
 * @export
 * @param {MyceliumObject} current
 * @param {MyceliumObject} target
 * @returns {boolean}
 * @memberof Mycelium
 */
export const GreaterThanOrEqualTo = (
  current: MyceliumObject,
  cost: MyceliumObject
): boolean => {
  const [newCurrent, newCost] = MatchMyceliumNotation(current, cost);

  if (newCurrent.mycelium > newCost.mycelium) return true;

  return false;
};

/**
 * Calculates the Exponential Notation of a number
 * https://stackoverflow.com/questions/11124451/how-can-i-convert-numbers-into-scientific-notation
 *
 * @export
 * @param {number} value
 * @param {number} [precision=4]
 * @returns
 */
export const ConvertToExponentialNotation = (
  value: number,
  precision: number = 4 // default to 4 decimal places
) => {
  if (value > 9) {
    return value
      .toExponential(precision)
      .split('e')
      .map((item) => Number(item));
  }

  return [parseFloat(value.toFixed(precision)), 0];
};
