import InMemoryRepository from "../../../../@seedwork/domain/repositories/in-memory.repository";
import { Calculator } from "../../../domain/entities/calculator";
import CalculatorRepository from "../../../domain/repositories/calculator-repository-interface";

export class CalculatorInMemoryRepository extends InMemoryRepository<Calculator> implements CalculatorRepository { }

export default CalculatorInMemoryRepository;