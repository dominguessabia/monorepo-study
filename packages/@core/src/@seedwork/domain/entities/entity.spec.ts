import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";
import { validate as uuidv4Validate } from 'uuid';

type StubEntityProps = {
    prop1: string;
    prop2: number;
}

class StubEntity extends Entity<StubEntityProps> { }

describe("Teste de unidade da classe Entity", () => {
    const props = {
        prop1: "value1",
        prop2: 1
    };

    it("deve atribuir um valor as propriedades e ao id", () => {
        const entity = new StubEntity(props);

        expect(entity.props).toStrictEqual(props);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).not.toBeNull();
        expect(uuidv4Validate(entity.id)).toBeTruthy();
    });

    it("Deve aceitar um uuid válido como parâmetro", () => {
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(props, uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.value);
    });

    it("Deve converter uma entidade para um JSON", () => {
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(props, uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...props
        });
    });
});