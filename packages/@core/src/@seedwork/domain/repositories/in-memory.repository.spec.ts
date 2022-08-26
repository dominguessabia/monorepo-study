import NotFoundError from "../errors/not-found.error";
import Entity from "../entities/entity";
import InMemoryRepository from "./in-memory.repository";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";


type StubEntityProps = {
    name: string;
}

class StubEntity extends Entity<StubEntityProps> { }

class StubInMemoryRepository extends InMemoryRepository<StubEntity> { }

describe("Teste de unidade do repositório em memória ", () => {
    let repository: StubInMemoryRepository;

    beforeEach(() => repository = new StubInMemoryRepository());

    it("Deve inserir uma nova entidade", async () => {
        const entity = new StubEntity({ name: "teste" });
        await repository.insert(entity);
        expect(repository.items.length).toBe(1);
        expect(entity.toJSON()).toMatchObject(repository.items[0].toJSON());
    });

    it("Deve retornar todas as entidades", async () => {
        const entity = new StubEntity({ name: "teste" });
        await repository.insert(entity);
        const entities = await repository.findAll();
        expect(entities.length).toBe(1);
        expect(entities[0].toJSON()).toMatchObject(entity.toJSON());
    });

    it("Deve retornar uma entidade pelo id", async () => {
        const entity = new StubEntity({ name: "teste" });
        await repository.insert(entity);
        const id = entity.id;
        const foundEntity = await repository.findById(id);
        expect(foundEntity.toJSON()).toMatchObject(entity.toJSON());
    });

    it("deve retornar um erro se não encontrar a entidade pelo id", async () => {
        const id = "123";
        await expect(repository.findById(id)).rejects.toThrow(
            new NotFoundError(`Entity Not Found using ID ${id}`)
        );

        await expect(repository.findById(new UniqueEntityId('6c526363-dfd3-43ba-8f30-a5439f1bca8c'))).rejects.toThrow(
            new NotFoundError('Entity Not Found using ID 6c526363-dfd3-43ba-8f30-a5439f1bca8c')
        );
    });
});