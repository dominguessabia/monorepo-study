import ValueObject from "../value-object";

class StubValueObject extends ValueObject { }

describe("Teste de unidade da classe value-object", () => {
    it("deve setar um valor", () => {
        let vo = new StubValueObject("string value");
        expect(vo.value).toBe("string value");

        vo = new StubValueObject({ prop1: "value1" });
        expect(vo.value).toStrictEqual({ prop1: "value1" });
    });

    it("should convert to a string", () => {
        const date = new Date();
        const arrange = [
            { received: "", expected: "" },
            { received: "string value", expected: "string value" },
            {
                received: { prop1: "value1" },
                expected: JSON.stringify({ prop1: "value1" })
            },
            {
                received: { prop1: "value1", prop2: date },
                expected: JSON.stringify({ prop1: "value1", prop2: date })
            },
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
        ]

        arrange.forEach((value) => {
            const vo = new StubValueObject(value.received);
            expect(vo.toString()).toBe(value.expected);
        });
    });

    it("deve ser um objeto imutável", () => {
        const obj = {
            prop1: 'value1',
            deep: { prop2: 'value2', prop3: new Date() }
        };

        const vo = new StubValueObject(obj);

        expect(() => { (vo as any).value.prop1 = 'test' })
            .toThrow(
                "Cannot assign to read only property 'prop1' of object '#<Object>'"
            );

        expect(() => { (vo as any).value.deep.prop2 = 'test' })
            .toThrow(
                "Cannot assign to read only property 'prop2' of object '#<Object>'"
            );

        expect(vo.value.deep.prop3).toBeInstanceOf(Date);
    });
});