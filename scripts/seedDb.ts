import {
  Product,
  BillOfMaterial,
  Threshold,
  MixAndDurability,
  Material,
} from "../model";

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Product.sync({ force: true });
  await BillOfMaterial.sync({ force: true });
  await Threshold.sync({ force: true });
  await MixAndDurability.sync({ force: true });
  await Material.sync({ force: true });
  //insert data
  await Promise.all([
    Material.create({
      code: "Lisca966",
      density: 100,
    }),
    Material.create({
      code: "TK-ZLB-M",
      density: 20,
    }),
    Threshold.create({
      characteristic: "density",
      value: 70,
      type: "min",
    }),
    MixAndDurability.create({
      percentage: 59,
      type: "min",
      goodStatus: "green",
      badStatus: "red",
    }),
    Product.create({
      id: 1,
      brand: "Mounty",
      category: "Sweatshirt",
      version: "V3_Summer_2022",
      name: "Summer Breeze",
    }),
    Product.create({
      id: 2,
      brand: "Zara",
      category: "jeans",
      version: "WIDE_LEG_JEANS",
      name: "TRF WIDE LEG JEANS",
    }),
    Product.create({
      id: 3,
      brand: "Zara",
      category: "top",
      version: "cropped-knit-top-p03519030",
      name: "CROPPED KNIT TOP",
    }),
    Product.create({
      id: 4,
      brand: "Zara",
      category: "jacket",
      version: "quilted-jacket-limited-edition-p03918401",
      name: "QUILTED JACKET",
    }),
    BillOfMaterial.create({
      id: 1,
      MaterialId: 1,
      ProductId: 1,
      material: "Wool Herringbone - Lisca 966 - Mimoska",
      supplier: "LTA AG",
      composition: "50% Acrylic, 25% Polyester, 20% Wool, 5% Other Fibers",
      quantity: 150,
      colorAssignment: "PANTONE 13-0647",
    }),
    BillOfMaterial.create({
      id: 2,
      MaterialId: 2,
      ProductId: 1,
      material: "Recycled Material Cuff",
      supplier: "LTA AG",
      composition: "100% Recycled Polyester",
      quantity: 50,
      colorAssignment: "PANTONE 13-0647",
    }),
    BillOfMaterial.create({
      id: 3,
      MaterialId: 1,
      ProductId: 2,
      material: "Wool Herringbone - Lisca 966 - Mimoska",
      supplier: "LTA AG",
      composition: "50% Acrylic, 25% Polyester, 20% Wool, 5% Other Fibers",
      quantity: 50,
      colorAssignment: "PANTONE 13-0647",
    }),
    BillOfMaterial.create({
      id: 4,
      MaterialId: 2,
      ProductId: 2,
      material: "Recycled Material Cuff",
      supplier: "LTA AG",
      composition: "100% Recycled Polyester",
      quantity: 150,
      colorAssignment: "PANTONE 13-0647",
    }),
  ]);
}
