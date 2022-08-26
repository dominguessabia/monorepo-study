import { EntityValidationError } from "../../../@seedwork/domain";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Calculator } from "./calculator";

describe("Teste de unidade da entidade calculadora", () => {
  it("Deve cria uma entidade calculadora", () => {
    const props = {
      expression: "1 + 1"
    }
    const calculator = new Calculator(props);
    expect(calculator).toBeInstanceOf(Calculator);
    expect(calculator.result).toBe(2);
    expect(calculator.props).toMatchObject(props);
  });

  it("deve criar uma entidade calculadora com id", () => {
    const props = {
      expression: "1 + 1"
    }
    const calculator = new Calculator(props, new UniqueEntityId());
    expect(calculator).toBeInstanceOf(Calculator);
    expect(calculator.props).toMatchObject(props);
  });

  it("deve gerar uma entidade calculadora com um uuid valido", () => {
    const props = {
      expression: "1 + 1"
    }

    const arrange = [
      { props },
      { props, id: null },
      { props, id: undefined },

    ]
    arrange.forEach((value) => {
      const id = value.id || new UniqueEntityId();
      const calculator = new Calculator(value.props, id);
      expect(calculator.id).not.toBeNull();
    });
  });

  it("deve realizar cálculos matemáticos simples", () => {
    const arrange = [
      { props: { expression: "1 + 1" }, result: 2 },
      { props: { expression: "2 - 1" }, result: 1 },
      { props: { expression: "2 * 2" }, result: 4 },
      { props: { expression: "4 / 2" }, result: 2 },
    ];

    arrange.forEach(({ props, result }) => {
      const calculator = new Calculator(props);
      expect(calculator.result).toBe(result);
    });
  });

  it("deve criar uma entidade recebendo um uuid válido", () => {
    const id = new UniqueEntityId();
    const calculator = new Calculator({ expression: "1 + 1" }, id);
    expect(calculator.id).toBe(id.value);
  });

  it("deve gerar um error ao tentar criar uma entidade recebendo um parâmetro inválido", () => {
    const arrange = [
      { expression: null },
      { expression: "" },
      { expression: 5 }
    ];

    arrange.forEach((value) => {
      expect(() => new Calculator(value as any)).toThrow(new EntityValidationError({
        expression: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      }));
    });
  });

  it("deve garantir que possa ser realizado acesso externo aos atributos existentes", () => {
    const props = {
      expression: "1 + 1"
    }
    const calculator = new Calculator(props);
    expect(calculator.expression).toBe(props.expression);
    expect(calculator.result).toBe(2);
  });
});
