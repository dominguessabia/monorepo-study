import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "../class-validator-fields";

class StubRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string | undefined;

    constructor(data: any) {
        Object.assign(this, data);
    }
}

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }>{
    validate(data: any): boolean {
        return super.validate(new StubRules(data));
    }
}

describe("Teste de integração da classe ClassValidatorFields", () => {
    it("Deve validar com errors", () => {
        const validator = new StubClassValidatorFields();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.errors).toStrictEqual({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ]
        });
    });

    it("Deve validar sem errors", () => {
        const validator = new StubClassValidatorFields();
        expect(validator.validate({ name: 'test' })).toBeTruthy();
        expect(validator.validateData).toStrictEqual(new StubRules({ name: 'test' }));
        expect(validator.errors).toBeNull();
    });
});