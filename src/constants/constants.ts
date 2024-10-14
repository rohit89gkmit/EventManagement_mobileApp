const email_regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';
const nameRegex = /^[A-Za-z ]{2,}$/;
const ageRegex = /^(1[89]|[2-9]\d|100)$/;
const usernameRegex = /^[A-Za-z0-9_]{3,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
export {email_regex, nameRegex, ageRegex, usernameRegex, passwordRegex};
