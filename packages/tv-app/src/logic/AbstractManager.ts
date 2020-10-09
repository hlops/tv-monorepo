import { QueryParams } from "./common/QueryParams";

export abstract class ActionManager<T> {
  constructor(protected readonly storagePrefix, protected readonly storage) {
    this.storage[storagePrefix];
  }

  public abstract async get(id: string): Promise<T>;
  public abstract async find(params?: QueryParams): Promise<T[]>;
  public abstract async insert(value: T): Promise<T>;
  public abstract async update(value: T): Promise<void>;
  public abstract async remove(id: string): Promise<void>;
}
