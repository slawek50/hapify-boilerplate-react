const sharedRules = {
  required: {
    required: true, message: 'Can\'t be empty !',
  },
};

const typesRules = {
  email: {
    type: 'email', message: 'Is not an email !',
  },
  number: {
    type: 'number', message: 'Is not a number !',
  },
  integer: {
    validator: (r, v) => {
      if (Number.isInteger(v)) return Promise.resolve();
      return Promise.reject(new Error('Is not an integer !'));
    },
  },
};

export default (type, isRequired) => {
  const rules = [];
  if (typesRules[type]) rules.push(typesRules[type]);
  if (isRequired) rules.push(sharedRules.required);

  return rules;
};
