import { Url } from "../../infra/typeorm/entities/Url";
import { injectable, inject } from "tsyringe";
import { IUrlRepository } from "../../infra/typeorm/repositories/IUrlRepository";
import { CustomError } from "../../../../shared/errors/CustomError";

@injectable()
export class DeleteUrlService {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(id: string): Promise<void> {
    const urlId = await this.urlRepository.findById(id);

    if (!urlId) {
      throw new CustomError("Url not found!", 400);
    }

    const data = await this.urlRepository.delete(id);
  }
}
