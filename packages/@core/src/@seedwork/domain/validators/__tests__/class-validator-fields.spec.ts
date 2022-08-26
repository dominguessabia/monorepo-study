import { ClassValidatorFields } from "../class-validator-fields";
import * as libClassValidator from "class-validator";

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }>{ }

describe("Teste de unidade da classe ClassValidatorFields", () => {
    it("Deve iniciar as variáveis errors e validateData com null", () => {
        const validator = new StubClassValidatorFields();
        expect(validator.errors).toBe(null);
        expect(validator.validateData).toBe(null);
    })

    it("deve validar com errors", () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
        spyValidateSync.mockReturnValue([
            { property: "field", constraints: { isRequired: "some error" } }
        ]);
        const validator = new StubClassValidatorFields();
        expect(validator.validate({ field: null })).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validateData).toBeNull();
        expect(validator.errors).toStrictEqual(
            { field: ["some error"] }
        );
    });

    it("deve validar sem errors", () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
        spyValidateSync.mockReturnValue([]);
        const validator = new StubClassValidatorFields();
        expect(validator.validate({ field: 'value' })).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validateData).toStrictEqual({ field: 'value' });
        expect(validator.errors).toBeNull();
    });
});