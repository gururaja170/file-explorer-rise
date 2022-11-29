export const loginFormData = {
  state: {
    username: '',
    password: '',
  },
  inputFields: [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      required: true,
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
    },
  ],
};

export const singupFormData = {
  state: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  },
  inputFields: [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      required: true,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      required: true,
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      required: true,
    },
  ],
  dropdownFields: [
    {
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Researcher',
          value: 'researcher',
        },
        {
          label: 'Collaborator',
          value: 'collaborator',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
      id: 'role',
      label: 'Select Role',
      width: '100%',
      required: true,
    },
  ],
};
