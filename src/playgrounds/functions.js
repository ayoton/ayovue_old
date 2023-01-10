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

export const generatePropsCode = (props) => {
  let code = ``;

  for (const key in props) {
    if (props[key]) {
      if (typeof props[key] === "boolean") {
        code += `  ${key}
`;
      } else {
        code += `  ${key}="${props[key]}"
`;
      }
    }
  }
  return code;
};
