import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import { Calculator } from "../../domain/entities/calculator";
import CalculatorRepository from "../../domain/repositories/calculator-repository-interface";

export namespace OperationCalculator {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private calculatorRepository: CalculatorRepository) { }

        async execute(input: Input): Promise<Output> {
            const entity = new Calculator(input);
            await this.calculatorRepository.insert(entity);
            return {
                result: entity.result
            }
        }
    }

    export type Input = {
        expression: string
    }

    export type Output = {
        result: number | undefined
    }
}

export default OperationCalculator;
