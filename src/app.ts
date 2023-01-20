import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "../model";
import reportRouter from "./router/report";
// import materialRouter from "./routes/material";
// import productRouter from "./routes/product";

const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.use("/report", reportRouter);
// app.use("/material", materialRouter);
// app.use("/product", productRouter);

export default app;
