import express from "express";
import { getProductDetails } from "./report.controller";

const jobRouter = express.Router();

jobRouter.get("/:productId", getProductDetails);

export default jobRouter;
