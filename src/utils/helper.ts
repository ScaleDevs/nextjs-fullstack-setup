import genString from 'randomstring';

export const RegexValidations = {
  NumberOnly: /(^[0-9]+$|^$)/,
  NoNumber: /(^[a-zA-Z\s-'.]*$)/,
  Address: /(^[a-zA-Z0-9\s-'#.]*$)/,
  MobileNumber: /^[0-9-]*$/,
  hasNumber: /[0-9]/,
  acceptedNumberWithNine: /\b9+/,
  acceptedNumberWithZero: /\b09+/,
  hasLowerCase: /[a-z]/,
  hasUpperCase: /[A-Z]/,
  hasSpecialChar: /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
};

export const createTempPassword = () => {
  return (
    genString.generate({
      length: 2,
      charset: 'alphanumeric',
    }) +
    genString.generate({
      length: 2,
      charset: 'numeric',
    }) +
    genString.generate({
      length: 1,
      charset: '!@#$%^&*()_+~`|}{[]:;?><,./-=\\',
    }) +
    genString.generate({
      length: 2,
      charset: 'numeric',
    }) +
    genString.generate({
      length: 2,
      charset: 'alphabetic',
      capitalization: 'uppercase',
    }) +
    genString.generate({
      length: 1,
      charset: '!@#$%^&*()_+~`|}{[]:;?><,./-=\\',
    }) +
    genString.generate({
      length: 2,
      charset: 'alphabetic',
      capitalization: 'lowercase',
    })
  );
};
