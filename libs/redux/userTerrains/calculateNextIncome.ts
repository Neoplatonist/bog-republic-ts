import {
  ConvertToExponentialNotation,
  MultiplyMycelium,
} from '@/libs/myceliumMath';
import { MyceliumObject } from '@/libs/types';

interface CalculateNextIncomeParams {
  income: MyceliumObject;
  coefficient: number;
  numberOwned: number;
}

/**
 * Calculates the mycelium production rate
 * https://blog.kongregate.com/the-math-of-idle-games-part-i/
 *
 * @export
 * @param {MyceliumObject} income
 * @param {number} coefficient
 * @param {number} numberOwned
 * @returns {MyceliumObject}
 */
export const CalculateNextIncome = ({
  income,
  coefficient,
  numberOwned,
}: CalculateNextIncomeParams): MyceliumObject => {
  // Calculate the production
  // const production = income.mycelium * numberOwned;
  let production = MultiplyMycelium(
    {
      mycelium: income.mycelium,
      myceliumNotation: income.myceliumNotation,
    },
    {
      mycelium: numberOwned,
      myceliumNotation: 0,
    }
  );

  // Multiply the income by the multiplier
  // const baseIncome = production * coefficient;
  // Multiply the cost by the multiplier
  let baseIncome = MultiplyMycelium(production, {
    mycelium: coefficient,
    myceliumNotation: 0,
  });

  // // If the new base is greater than 10, adjust the exponent
  // let [base, exponent] = ConvertToExponentialNotation(baseIncome);
  // exponent += income.myceliumNotation;

  // return {
  //   mycelium: base,
  //   myceliumNotation: exponent,
  // };

  return baseIncome;
};
