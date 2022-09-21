import {DataSource} from "typeorm"
import { Url } from "../../../modules/url/infra/typeorm/entities/Url"
import * as dotenv from 'dotenv' 
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: 5432||process.env.PORT_DB,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    synchronize: true,
    logging: true,
    entities: [Url],
    subscribers: [],
    migrations: [],
})