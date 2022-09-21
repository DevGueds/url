import { injectable, inject } from "tsyringe";
import { IUrlRepository } from "../../infra/typeorm/repositories/IUrlRepository";
import { CrawlerLinks } from "../../../../crawlerLinks/CrawlerLinks";

@injectable()
export class CreateUrlService {
  constructor(
    @inject("UrlRepository")
    private urlrepository: IUrlRepository
  ) {}

  async execute(url: string): Promise<void> {
    const crawler = new CrawlerLinks(this.urlrepository);

    await crawler.execute(url);
  }
}
