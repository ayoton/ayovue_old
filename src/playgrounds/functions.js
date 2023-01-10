export const generateBooleanCode = (name, value) => {
  return value
    ? `  ${name}
`
    : ``;
};
export const generateStringCode = (name, value) => {
  return value
    ? `  ${name}="${value}"
`
    : ``;
};
