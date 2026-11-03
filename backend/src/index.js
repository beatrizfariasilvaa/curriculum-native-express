import "dotenv/config";
import { sequelize } from "./models/index.js";
import express from "express";
import {
  corsMiddleware,
  logMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares/index.js";
import * as routes from "./routes/index.js";

const app=express();

app.set("trust proxy", true);

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

app.get("/", (req, res) => {
    return res.send("API de currículos no ar!");
});
app.use("/pessoas", routes.pessoa);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";
const syncDatabase =
  process.env.SYNC_DATABASE === "true" || eraseDatabaseOnSync;

const startServer = () => {
  app.listen(port, () => console.log(`API de currículos na porta ${port}!`));
};

if (syncDatabase) {
  sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    startServer();
  });
} else {
  startServer();
}

export default app;