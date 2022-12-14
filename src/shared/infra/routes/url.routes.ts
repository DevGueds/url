import { Router } from "express";
import { UrlController } from "../../../modules/url/infra/http/controllers/UrlController";

export const urlRouter = Router();

const urlController = new UrlController();

urlRouter.post("/url", urlController.create);
urlRouter.delete("/url/:id", urlController.delete);
urlRouter.put("/url/update/:id", urlController.update);
urlRouter.get("/url", urlController.list);
