import {
  GetCalculator,
  ListCalculator,
} from '@ms/calc-app/calculator/application';
import { CalculatorController } from './calculator.controller';

describe('Teste de unidade de CalculatorController', () => {
  let controller: CalculatorController;

  beforeEach(async () => {
    controller = new CalculatorController();
  });

  it('deve executar uma operação matemática', async () => {
    const mockOperationUseCase = {
      execute: jest.fn().mockReturnValue({ result: 2 }),
    };
    //@ts-expect-error
    controller['operationUseCase'] = mockOperationUseCase;
    const input = {
      expression: '1 + 1',
    };
    const result = await controller.operation(input);
    expect(mockOperationUseCase.execute).toBeCalled();
    expect(mockOperationUseCase.execute).toBeCalledWith(input);
    expect(result).toStrictEqual({ result: 2 });
  });

  it('deve buscar uma operação matemática por id', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: GetCalculator.Output = {
      id,
      expression: '1 + 1',
      result: 2,
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error
    controller['getUseCase'] = mockGetUseCase;
    const output = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('deve listar todas as operação matemática por id', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: ListCalculator.Output = {
      id,
      expression: '1 + 1',
      result: 2,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error
    controller['listUseCase'] = mockListUseCase;
    const output = await controller.findAll();
    expect([expectedOutput]).toStrictEqual([output]);
  });
});
