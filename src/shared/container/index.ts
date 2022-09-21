import { container } from "tsyringe";
import { UrlRepository } from "../../modules/url/infra/typeorm/repositories/implementations/UrlRepository";
import { IUrlRepository } from "../../modules/url/infra/typeorm/repositories/IUrlRepository";

container.registerSingleton<IUrlRepository>(
    "UrlRepository",
    UrlRepository
)
