/* eslint-disable @typescript-eslint/no-namespace */
import {
  OperationCalculator,
  GetCalculator,
  ListCalculator,
} from '@ms/calc-app/calculator/application';
import { CalculatorRepository } from '@ms/calc-app/calculator/domain';
import { CalculatorInMemoryRepository } from '@ms/calc-app/calculator/infra';

export namespace CALCULATOR_PROVIDERS {
  export namespace REPOSITORIES {
    export const CALCULATOR_IN_MEMORY = {
      provide: 'CalculatorInMemoryRepository',
      useClass: CalculatorInMemoryRepository,
    };
  }

  export namespace USE_CASES {
    export const OPERATION_CALCULATOR = {
      provide: OperationCalculator.UseCase,
      useFactory: (calculatorRepo: CalculatorRepository) => {
        return new OperationCalculator.UseCase(calculatorRepo);
      },
      inject: [REPOSITORIES.CALCULATOR_IN_MEMORY.provide],
    };

    export const LIST_CALCULATOR = {
      provide: ListCalculator.UseCase,
      useFactory: (calculatorRepo: CalculatorRepository) => {
        return new ListCalculator.UseCase(calculatorRepo);
      },
      inject: [REPOSITORIES.CALCULATOR_IN_MEMORY.provide],
    };

    export const GET_CALCULATOR = {
      provide: GetCalculator.UseCase,
      useFactory: (calculatorRepo: CalculatorRepository) => {
        return new GetCalculator.UseCase(calculatorRepo);
      },
      inject: [REPOSITORIES.CALCULATOR_IN_MEMORY.provide],
    };
  }
}
