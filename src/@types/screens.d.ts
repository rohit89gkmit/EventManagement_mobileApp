declare global {
  type loginFormDataType = {
    email: string;
    password: string;
  };
  type settingtype = {
    filterPreference: string;
    sortPreference: string;
    hoursFormat: boolean;
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
    settings?: settingType;
  };
}

export {};
