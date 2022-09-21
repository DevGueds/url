import "reflect-metadata"
import 'express-async-errors';
import * as dotenv from 'dotenv' 
import { AppDataSource } from "./shared/infra/database"
import express from "express"
import { urlRouter } from "./shared/infra/routes/url.routes"
import "../src/shared/container";
import { CustomError } from "./shared/errors/CustomError";

dotenv.config()

const app = express()

app.use(express.json())

AppDataSource
  .initialize()
  .then(() => {
    console.log(`Database is connected!`);
  })
  .catch((error) => console.log(error));

  app.get("/api", (req, res) => {
    return res.send("OK")
})

  app.get("/api", (req, res) => {
    return res.send("OK")
  })

app.use(urlRouter)
  
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
      });
  }

  console.log(error);
  return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
  });

});


app.listen(process.env.PORT_APP||3000, () => console.log("server is ok"))