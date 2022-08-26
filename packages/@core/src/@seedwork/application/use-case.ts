export interface UseCase<Input, Output> {
    execute(input: Input | null): Output | Promise<Output>;
}

export default UseCase;