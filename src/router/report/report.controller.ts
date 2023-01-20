import Controller from "../../helpers/controller.helper";
import service from "./report.service";

const controller = new Controller(service);

export const getProductDetails = async (req, res) => {
  controller.defaultRouterController("productDetails", req, res);
};
