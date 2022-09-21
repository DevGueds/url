import { app } from "./app";

app.listen(process.env.PORT_APP || 3000, () => console.log("server is ok"));
