import {
  ConvertToExponentialNotation,
  MultiplyMycelium,
} from '@/libs/myceliumMath';
import { MyceliumObject } from '@/libs/types';

interface CalculateNextCostParams {
  cost: MyceliumObject;
  coefficient: number;
  numberOwned: number;
}

/**
 *
 * Calculates the next cost of a terrain
 * https://blog.kongregate.com/the-math-of-idle-games-part-i/
 *
 * @export
 * @param {MyceliumObject} cost
 * @param {number} coefficient
 * @param {number} numberOwned
 * @returns {MyceliumObject}
 */
export const CalculateNextCost = ({
  cost,
  coefficient,
  numberOwned,
}: CalculateNextCostParams): MyceliumObject => {
  // Calculate the number owned times the coefficient
  const multiplier = Math.pow(coefficient, numberOwned);

  // Multiply the cost by the multiplier
  let baseIncome = MultiplyMycelium(
    {
      mycelium: cost.mycelium,
      myceliumNotation: cost.myceliumNotation,
    },
    {
      mycelium: multiplier,
      myceliumNotation: 0,
    }
  );

  // If the new base is greater than 10, adjust the exponent
  // let [base, exponent] = ConvertToExponentialNotation(baseIncome);
  // exponent += cost.myceliumNotation;

  // return {
  //   mycelium: base,
  //   myceliumNotation: exponent,
  // };
  return baseIncome;
};
