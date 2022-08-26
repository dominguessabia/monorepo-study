import Entity from "../entities/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
    items: E[] = [];

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async findAll(): Promise<E[]> {
        return this.items;
    }

    async findById(id: string | UniqueEntityId): Promise<E> {
        const _id = `${id}`;
        return this._get(_id);
    }

    protected async _get(id: string): Promise<E> {
        const item = this.items.find((i) => i.id === id);
        if (!item) {
            throw new NotFoundError(`Entity Not Found using ID ${id}`);
        }
        return item;
    }
}

export default InMemoryRepository;