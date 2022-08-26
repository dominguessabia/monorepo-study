import { RepositoryInterface } from "../../../@seedwork/domain/repositories/repository-contracts";
import { Calculator } from "../entities/calculator";

/**
 * Visa garantir a especialização da classe, pesando pelos princípios do solid, deve ser implementado caso haja 
 * necessidade de especializar alguma funcionalidade de repositório da entidade calculadora.
 * Ex.: Buscar registros por parâmetros específicos ou exclusão lógica.
 */
export interface CalculatorRepository extends RepositoryInterface<Calculator> { }

export default CalculatorRepository;