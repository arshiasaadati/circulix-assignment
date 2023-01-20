import { Threshold, MixAndDurability } from "../../model";

export const analyzeProductDensity = async (materials) => {
  let totalQuantity = 0;
  let densities = [];
  materials.forEach((material) => {
    densities.push({
      density: material.Material.density,
      quantity: material.quantity,
    });
    totalQuantity += material.quantity;
  });

  densities = await Promise.all(
    densities.map(async (density) => ({
      ...density,
      isGood: await checkDensity(density),
    }))
  );
  const percentage = calculateDensityPercentage(totalQuantity, densities);
  const productStatus = await checkProductStatus(percentage);
  console.log(productStatus);
  return { percentage, productStatus };
};

const checkDensity = async (material) => {
  const threshold: any = await Threshold.findOne({
    where: { characteristic: "density" },
  });
  return threshold.type === "min"
    ? material.density > threshold.value
    : material.density < threshold.value;
};

const calculateDensityPercentage = (totalQuantity, densities) => {
  let goodPercentage = 0;
  let badPercentage = 0;
  densities.forEach((density) => {
    console.log(density);
    density.isGood
      ? (goodPercentage += (density.quantity * 100) / totalQuantity)
      : (badPercentage += (density.quantity * 100) / totalQuantity);
  });
  return {
    goodPercentage,
    badPercentage,
  };
};

const checkProductStatus = async (percentage) => {
  const mixAndDurability: any = await MixAndDurability.findOne();
  return mixAndDurability.type === "min"
    ? percentage.goodPercentage > mixAndDurability.percentage &&
        mixAndDurability.goodStatus
    : percentage.goodPercentage < mixAndDurability.percentage &&
        mixAndDurability.goodStatus;
};
