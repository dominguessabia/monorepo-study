import { Calculator } from "../../../domain/entities/calculator";
import CalculatorInMemoryRepository from "../../../infra/db/in-memory/calculator-in-memory-repository";
import ListCalculators from "../list-calculators.use-case";

describe("Deve testar o caso de uso de pegar dados da operação matemática realizada", () => {
    let useCase: ListCalculators.UseCase;
    let repository: CalculatorInMemoryRepository;

    beforeEach(() => {
        repository = new CalculatorInMemoryRepository();
        useCase = new ListCalculators.UseCase(repository);
    });

    it("deve retornar uma coleção de cálculos vazia", async () => {
        const result = await useCase.execute();
        expect(result).toStrictEqual([]);
    });

    it("deve retornar uma operação matemática realizada", async () => {
        const item = new Calculator({ expression: "1 + 1" });
        const item1 = new Calculator({ expression: "4 / 2" });
        repository.items = [
            item, item1
        ];
        const result = await useCase.execute();
        expect(result).toStrictEqual([
            { ...item.toJSON(), result: item.result },
            { ...item1.toJSON(), result: item1.result }
        ]);
    });
});