import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import CalculatorRepository from "../../domain/repositories/calculator-repository-interface";

export namespace ListCalculator {
    export class UseCase implements DefaultUseCase<null, Output[]> {
        constructor(private calculatorRepository: CalculatorRepository) { }

        async execute(): Promise<Output[]> {
            const result = await this.calculatorRepository.findAll();
            return result.map(item => ({
                id: item.id,
                expression: item.expression,
                result: item.result
            }));
        }
    }

    export type Output = {
        id: string;
        expression: string,
        result: number | undefined
    }

}

export default ListCalculator;
