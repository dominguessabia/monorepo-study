import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import CalculatorRepository from "../../domain/repositories/calculator-repository-interface";

export namespace GetCalculator {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private calculatorRepository: CalculatorRepository) { }

        async execute(input: Input): Promise<Output> {
            const entity = await this.calculatorRepository.findById(input.id);
            return {
                id: entity.id,
                expression: entity.expression,
                result: entity.result
            }
        }
    }

    export type Input = {
        id: string
    }

    export type Output = {
        id: string,
        expression: string,
        result: number | undefined
    }
}

export default GetCalculator;