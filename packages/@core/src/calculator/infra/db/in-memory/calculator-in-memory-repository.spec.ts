import { Calculator } from "../../../domain/entities/calculator";
import CalculatorInMemoryRepository from "./calculator-in-memory-repository";

describe("Teste das funcionalidades de repositório em memória da entidade calculadora", () => {
    let repository: CalculatorInMemoryRepository;

    beforeEach(() => repository = new CalculatorInMemoryRepository());

    it("Deve inserir uma nova entidade", async () => {
        const entity = new Calculator({ expression: "1 + 1" });
        await repository.insert(entity);
        expect(repository.items.length).toBe(1);
        expect(entity.toJSON()).toMatchObject(repository.items[0].toJSON());
    });

    it("Deve retornar todas as entidades", async () => {
        const entity = new Calculator({ expression: "1 + 1" });
        await repository.insert(entity);
        const entities = await repository.findAll();
        expect(entities.length).toBe(1);
        expect(entities[0].toJSON()).toMatchObject(entity.toJSON());
    });

    it("Deve retornar uma entidade pelo id", async () => {
        const entity = new Calculator({ expression: "1 + 1" });
        await repository.insert(entity);
        const id = entity.id;
        const foundEntity = await repository.findById(id);
        expect(foundEntity.toJSON()).toMatchObject(entity.toJSON());
    });
});