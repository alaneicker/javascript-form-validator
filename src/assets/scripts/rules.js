export const addUserFormRules = {
  first_name: [
    {
      validator: 'required',
      message: 'First name is required',
    },
  ],
  last_name: [
    {
      validator: 'required',
      message: 'Last name is required',
    },
  ],
};

export const loginFormRules = {
  username: [
    {
      validator: 'required',
      message: 'Username is required',
    },
  ],
  password: [
    {
      validator: 'required',
      message: 'Password is required',
    },
  ],
};