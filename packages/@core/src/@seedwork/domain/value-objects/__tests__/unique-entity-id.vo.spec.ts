import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";

function spyValidate() {
    return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("Teste de unidade", () => {
    it("Deve levantar uma exceção quando o uuid for inválido", () => {
        const validateSpy = spyValidate();
        expect(() => new UniqueEntityId("invalid-uuid")).toThrow(new InvalidUuidError);
        expect(validateSpy).toHaveBeenCalled();
    });

    it("deve aceitar um uuid passado no construtor", () => {
        const validateSpy = spyValidate();
        const uuid = new UniqueEntityId("f0232073-2a95-4b3d-a062-41f762ed9854");
        expect(uuid.value).toBe("f0232073-2a95-4b3d-a062-41f762ed9854");
        expect(validateSpy).toHaveBeenCalled();
    });

    it("deve um uuid quando nada for passado no construtor", () => {
        const validateSpy = spyValidate();
        const uuid = new UniqueEntityId();
        expect(uuid.value).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });

    it("deve retornar um error ao tentar criar um uuid inválido passando um uuid inválido", () => {
        const validateSpy = spyValidate();
        expect(() => new UniqueEntityId("invalid-uuid")).toThrow(new InvalidUuidError("ID must be a valid UUID"));
        expect(validateSpy).toHaveBeenCalled();
    });
});