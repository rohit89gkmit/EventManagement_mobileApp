declare global {
  type loginFormDataType = {
    email: string;
    password: string;
  };
  type customTextInputProps = {
    placeholder: string;
    secured: boolean;
    iconName: string;
    setData:
      | Dispatch<SetStateAction<loginFormDataType>>
      | Dispatch<SetStateAction<signUpFormDataType>>
      | Dispatch<SetStateAction<eventFormDataType>>;
  };
  type signUpFormDataType = {
    name: string;
    email: string;
    age: number;
    username: string;
    password: string;
    confirmpassword: string;
    gender: string;
  };
  type customTabBarIconProps = {
    focused: boolean;
    iconName: string;
    index: number;
  };
}

export {};
