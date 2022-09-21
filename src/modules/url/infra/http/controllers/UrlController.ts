import { Request, Response } from "express";
import { CreateUrlService } from "../../../services/createUrlService/CreateUrlService";
import { container } from "tsyringe";
import { DeleteUrlService } from "../../../services/deleteUrlService/DeleteUrlService";
import { UpdateUrlService } from "../../../services/updateUrlService/UpdateUrlService";

export class UrlController {
  //#TODO alterar o nome do metodo para create
  async handle(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    const createUrlService = container.resolve(CreateUrlService);

    const data = await createUrlService.execute(url);

    return response.status(201).json(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUrlService = container.resolve(DeleteUrlService);

    await deleteUrlService.execute(id);

    return response.status(204).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { url, title } = request.body;

    const updateUrlService = container.resolve(UpdateUrlService);

    await updateUrlService.execute(id, url, title);

    return response.json().status(200);
  }
}
