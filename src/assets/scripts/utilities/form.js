export const formToJson = formData => {
  let json = {};

  formData.forEach((value, key) => {
    json[key] = value;
  });

  return json;
};