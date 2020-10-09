import { Action } from "../../../../tv-common/src";
import { QueryParams } from "../common/QueryParams";

const STORAGE_PREFIX = "actions/";

export class ActionManager extends AbstractManager {
  constructor(private readonly storage) {
    this.storage[STORAGE_PREFIX];
  }

  public async find(params: QueryParams): Action[] {}
}
