import { Calculator } from "../../../domain/entities/calculator";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import CalculatorInMemoryRepository from "../../../infra/db/in-memory/calculator-in-memory-repository";
import GetCalculator from "../get-calculator.use-case";

describe("Deve testar o caso de uso de pegar dados da operação matemática realizada", () => {
    let useCase: GetCalculator.UseCase;
    let repository: CalculatorInMemoryRepository;

    beforeEach(() => {
        repository = new CalculatorInMemoryRepository();
        useCase = new GetCalculator.UseCase(repository);
    });

    it("deve levantar uma exceção quando não encontrar o registro", async () => {
        expect(() => useCase.execute({ id: "123" }))
            .rejects.toThrow(new NotFoundError('Entity Not Found using ID 123'));
    });

    it("deve retornar uma operação matemática realizada", async () => {
        const item = new Calculator({ expression: "1 + 1" });
        repository.items = [item];
        const result = await useCase.execute({ id: item.id });
        expect(result).toStrictEqual({
            id: item.id,
            expression: "1 + 1",
            result: 2
        });
    });
});