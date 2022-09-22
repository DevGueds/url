import { injectable, inject } from "tsyringe";
import { IUrlRepository } from "../../infra/typeorm/repositories/IUrlRepository";
import { Url } from "../../infra/typeorm/entities/Url";
import { CustomError } from "../../../../shared/errors/CustomError";

@injectable()
export class UpdateUrlService {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(id: string, url: string, title: string): Promise<void> {
    const urlId = await this.urlRepository.findById(id);

    if (!urlId) {
      throw new CustomError("Url not found!", 400);
    }

    await this.urlRepository.update(id, url, title);
  }
}
