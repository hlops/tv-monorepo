import { Controller, GET } from "fastify-decorators";
import { ActionManager } from "../logic/action/ActionManager";

@Controller("/action")
export default class ActionsController {
  @GET("/")
  async handle() {
    return new ActionManager();
  }
}
