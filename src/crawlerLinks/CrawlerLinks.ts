import request from "request-promise-native";
import cheerio from "cheerio";
import { IUrlRepository } from "../modules/url/infra/typeorm/repositories/IUrlRepository";
import { inject } from "tsyringe";

export class CrawlerLinks {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(url: string): Promise<void> {
    const options: any = {
      uri: url,
      transform: function (body: any) {
        return cheerio.load(body);
      },
    };

    request(options)
      .then(async ($) => {
        await $(".et_pb_row .entry-title").each(async (i: any, prop: any) => {
          const title = await $(prop).find("a").text();
          const postUrl = await $(prop).find("a").attr("href");

          const responseUrl: any = {
            title,
            postUrl,
          };

          await this.urlRepository.create(
            url,
            responseUrl.title,
            responseUrl.postUrl
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
