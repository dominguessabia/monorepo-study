import { Module } from '@nestjs/common';
import { CalculatorController } from './calculator.controller';
import { CALCULATOR_PROVIDERS } from './calculator.providers';

@Module({
  controllers: [CalculatorController],
  providers: [
    ...Object.values(CALCULATOR_PROVIDERS.REPOSITORIES),
    ...Object.values(CALCULATOR_PROVIDERS.USE_CASES),
  ],
})
export class CalculatorModule {}
