declare global {
  type loginFormDataType = {
    email: string;
    password: string;
  };
  type signUpFormDataType = {
    name: string;
    email: string;
    age: number;
    username: string;
    password: string;
    confirmpassword: string;
    gender: string;
    eventList?: eventFormDataType[];
  };
}

export {};
