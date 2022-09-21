import { Url } from "../../entities/Url";
import { IUrlRepository } from "../IUrlRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../../shared/infra/database";

export class UrlRepository implements IUrlRepository {
  private repository: Repository<Url>;

  constructor() {
    this.repository = AppDataSource.getRepository(Url);
  }
  async list(): Promise<Url[]> {
    const urls = await this.repository.find();

    return urls;
  }

  async findById(id: string): Promise<Url | undefined> {
    const urlId = await this.repository.findOneBy({ id });

    return urlId || undefined;
  }

  async update(id: string, url: string, title: string): Promise<void> {
    const data = await this.repository
      .createQueryBuilder()
      .update(Url)
      .set({
        url,
        title,
      })
      .where("id = :id", { id: id })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async create(url: string, title: string, postUrl: string): Promise<Url> {
    const data = this.repository.create({ url, title, postUrl });

    await this.repository.save(data);

    return data;
  }
}
