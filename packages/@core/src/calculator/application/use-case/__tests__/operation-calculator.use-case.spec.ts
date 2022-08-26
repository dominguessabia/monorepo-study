import CalculatorInMemoryRepository from "../../../infra/db/in-memory/calculator-in-memory-repository";
import { OperationCalculator } from "../operation-calculator.use-case";

describe("Deve testar o caso de uso de operação da calculadora", () => {
    let useCase: OperationCalculator.UseCase;
    let repository: CalculatorInMemoryRepository;

    beforeEach(() => {
        repository = new CalculatorInMemoryRepository();
        useCase = new OperationCalculator.UseCase(repository);
    });

    it("Deve retornar o resultado da operação de adição", async () => {
        const spyInsert = jest.spyOn(repository, "insert");
        const result = await useCase.execute({ expression: "1 + 1" });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(result.result).toBe(2);
    });

    it("Deve retornar o resultado da operação de subtração", async () => {
        const spyInsert = jest.spyOn(repository, "insert");
        const result = await useCase.execute({ expression: "1 - 1" });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(result.result).toBe(0);
    });

    it("Deve retornar o resultado da operação de multiplicação", async () => {
        const spyInsert = jest.spyOn(repository, "insert");
        const result = await useCase.execute({ expression: "1 * 1" });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(result.result).toBe(1);
    });

    it("Deve retornar o resultado da operação de divisão", async () => {
        const spyInsert = jest.spyOn(repository, "insert");
        const result = await useCase.execute({ expression: "1 / 1" });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(result.result).toBe(1);
    });
});