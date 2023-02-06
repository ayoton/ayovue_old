export const generateComponentCode = (
  componentData: any,
  withRaw = false,
  slotData = ``
) => {
  let code = `<${componentData.name}
  v-model="vModel"
`;

  if (withRaw) {
    code += `  v-model:raw="vModelRaw"
`;
  }

  for (const key in componentData.variableProps) {
    if (componentData.variableProps[key]) {
      code += `  :${key}="${key}"
`;
    }
  }

  for (const key in componentData.numberProps) {
    if (componentData.numberProps[key]) {
      code += `  :${key}="${componentData.numberProps[key]}"
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

  for (const key in componentData.dropdownProps) {
    if (componentData.dropdownProps[key].vModel) {
      code += `  ${key}="${componentData.dropdownProps[key].vModel}"
`;
    }
  }

  code += `>`;
  if (slotData) {
    code +=
      `
  ` + slotData;
  }

  code += `
</${componentData.name}>`;
  return code;
};
