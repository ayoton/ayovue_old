export const generateComponentCode = (componentData: any) => {
  let code = `<${componentData.name}
  v-model='vModel'
`;

  for (const key in componentData.variableProps) {
    if (componentData.variableProps[key]) {
      code += `  :${key}="${key}"
`;
    }
  }

  for (const key in componentData.stringProps) {
    if (componentData.stringProps[key]) {
      code += `  ${key}="${componentData.stringProps[key]}"
`;
    }
  }

  for (const key in componentData.booleanProps) {
    if (componentData.booleanProps[key]) {
      code += `  ${key}
`;
    }
  }

  code += `>
</${componentData.name}>`;
  return code;
};
