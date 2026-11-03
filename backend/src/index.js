import "dotenv/config";
import { sequelize } from "./models/index.js";
import express from "express";

const app=express();
app.get("/", (req, res) => {
    return res.send("API de currículos no ar!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API de currículos na porta ${port}!`));

sequelize.sync({ force: true }).then(() => console.log("Tabelas criadas!"));