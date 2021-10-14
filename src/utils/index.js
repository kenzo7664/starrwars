export const convertDate = () => {
  const sections = '1977-05-25'.split('-');
  return new Date(sections[0], sections[1] - 1, sections[2]);
};

export const formatHeight = (height) => {
  if (height === 'unknown') {
    return height;
  }

  const centimeter = `${height}cm`;
  let inches = (parseInt(height, 10) * 0.393701).toFixed(0);
  const feet = Math.floor(inches / 12);
  inches %= 12;

  return `${centimeter} (${feet}ft /${inches}inches)`;
};
