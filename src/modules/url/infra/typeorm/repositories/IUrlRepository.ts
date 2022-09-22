import { Url } from "../entities/Url";

export interface IUrlRepository {
  create(url: string, title: string, postUrl: string): Promise<Url>;
  delete(id: string): Promise<void>;
  update(id: string, url: string, title: string): Promise<void>;
  findById(id: string): Promise<Url | undefined>;
  list(): Promise<Url[]>;
}
