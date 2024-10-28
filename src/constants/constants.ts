const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
const nameRegex = /^[A-Za-z ]{2,}$/;
const ageRegex = /^(1[89]|[2-9]\d|100)$/;
const usernameRegex = /^[A-Za-z0-9_]{3,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const limitRegex = /^(?:[2-9]|[1][0-9]|100)$/;
export {
  emailRegex,
  nameRegex,
  ageRegex,
  usernameRegex,
  passwordRegex,
  limitRegex,
};
