import { Router } from "express";
import { UrlController } from "../../../controllers/UrlController";

export const urlRouter = Router()

const urlController = new UrlController()

urlRouter.post("/url", urlController.handle)
urlRouter.delete("/url/:id", urlController.delete)
urlRouter.put("/url/update/:id",urlController.update)