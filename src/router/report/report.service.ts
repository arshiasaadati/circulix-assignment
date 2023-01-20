import { Product, BillOfMaterial, Material } from "../../../model";
import { analyzeProductDensity } from "../../helpers/product.helper";

const service: any = {};

service.productDetails = async (req, res) => {
  try {
    if (req.params.productId === undefined)
      throw new Error("product id is required");

    const billOfMaterial = await BillOfMaterial.findAll({
      include: [
        {
          model: Product,
          as: "Product",
          required: true,
        },
        {
          model: Material,
          as: "Material",
          required: true,
        },
      ],
      where: {
        ProductId: req.params.productId,
      },
    });
    return { billOfMaterial, ...(await analyzeProductDensity(billOfMaterial)) };
  } catch (err) {
    throw err;
  }
};

export default service;
