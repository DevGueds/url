import { Url } from "../../modules/url/infra/typeorm/entities/Url";
import {injectable, inject} from "tsyringe"
import { IUrlRepository } from "../../modules/url/infra/typeorm/repositories/IUrlRepository";
import rp from "request-promise-native"
import cheerio from "cheerio";

@injectable()
export class CreateUrlService {

    constructor(
        @inject("UrlRepository")
        private urlrepository: IUrlRepository){}

    async execute(url: string): Promise<Url> {

        const options: any = {
            uri: url,
            transform: function(body: any) {
               return cheerio.load(body) 
            },
        }

        rp(options).then(async($) => {
            await $(".et_pb_row .entry-title").each(async (i:any, item:any) => {
                const title = await $(item).find("a").text()
                const postUrl = await $(item).find("a").attr("href");

                const responseUrl:any = {
                    title,
                    postUrl
                }
                const dataUrl = await this.urlrepository.create(url, responseUrl.title, responseUrl.postUrl)

                return dataUrl
            })
        }).catch((err) => {
            console.log(err)
        })
 }
}