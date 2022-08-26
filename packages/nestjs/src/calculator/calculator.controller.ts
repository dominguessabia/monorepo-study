import {
  OperationCalculator,
  GetCalculator,
  ListCalculator,
} from '@ms/calc-app/calculator/application';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OperationCalculatorDto } from './dto/operation-calculator.dto';

@Controller('calculator')
export class CalculatorController {
  @Inject(OperationCalculator.UseCase)
  private operationUseCase: OperationCalculator.UseCase;

  @Inject(GetCalculator.UseCase)
  private getUseCase: GetCalculator.UseCase;

  @Inject(ListCalculator.UseCase)
  private listUseCase: ListCalculator.UseCase;

  @Post()
  async operation(@Body() operationCalculatorDto: OperationCalculatorDto) {
    try {
      return await this.operationUseCase.execute(operationCalculatorDto);
    } catch (EntityValidationError) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: EntityValidationError.error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.listUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.getUseCase.execute({ id });
    } catch (NotFoundError) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: NotFoundError.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
