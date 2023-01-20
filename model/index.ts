import { Sequelize, Model, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

export class Material extends Model {}
Material.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    density: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    abrasionValue: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "Material",
  }
);

export class Threshold extends Model {}
Threshold.init(
  {
    characteristic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("min", "max"),
    },
  },
  {
    sequelize,
    modelName: "Threshold",
  }
);

export class MixAndDurability extends Model {}
MixAndDurability.init(
  {
    percentage: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("min", "max"),
    },
    goodStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    badStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MixAndDurability",
  }
);

export class Product extends Model {}
Product.init(
  {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

export class BillOfMaterial extends Model {}
BillOfMaterial.init(
  {
    material: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING,
    },
    composition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    colorAssignment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BillOfMaterial",
  }
);

Product.hasMany(BillOfMaterial, {
  as: "Product",
  foreignKey: "ProductId",
});
BillOfMaterial.belongsTo(Product, { foreignKey: "ProductId" });
Material.hasMany(BillOfMaterial, {
  as: "Material",
  foreignKey: "MaterialId",
});
BillOfMaterial.belongsTo(Material, { foreignKey: "MaterialId" });
Product.belongsTo(BillOfMaterial, { as: "ProductId" });

export default {
  sequelize,
  Material,
  Threshold,
  MixAndDurability,
  Product,
  BillOfMaterial,
};
