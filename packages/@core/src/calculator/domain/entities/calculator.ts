import { EntityValidationError } from "../../../@seedwork/domain/errors/validator-error";
import Entity from "../../../@seedwork/domain/entities/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import CalculatorValidatorFactory from "../validators/calculator-validator";
const Calc = require('expression-calculator');

export type CalculatorProps = {
  expression: string;
}

export class Calculator extends Entity<CalculatorProps> {
  private _result: number | undefined;
  constructor(
    public readonly props: CalculatorProps,
    id?: UniqueEntityId
  ) {
    super(props, id);
    Calculator.validate(props);
    this.calculation();
  }

  static validate(props: CalculatorProps): void {
    const validator = CalculatorValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  private calculation(): void {
    const calc = new Calc();
    const result = calc.compile(this.props.expression).calc();
    this._result = result;
  }

  public get expression(): string {
    return this.props.expression;
  }

  public get result(): number | undefined {
    return this._result;
  }
}
