import { inject, injectable } from "tsyringe";
import { Url } from "../../infra/typeorm/entities/Url";
import { IUrlRepository } from "../../infra/typeorm/repositories/IUrlRepository";

@injectable()
export class ListUrlsService {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(): Promise<Url[]> {
    const urls = await this.urlRepository.list();

    return urls;
  }
}
