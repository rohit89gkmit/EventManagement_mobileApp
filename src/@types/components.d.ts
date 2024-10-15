declare global {
  type customTextInputProps = {
    placeholder: string;
    secured: boolean;
    iconName: string;
    setData:
      | Dispatch<SetStateAction<loginFormDataType>>
      | Dispatch<SetStateAction<signUpFormDataType>>
      | Dispatch<SetStateAction<eventFormDataType>>
      | Dispatch<SetStateAction<attendeeFormType>>;
    value?: string | boolean | number | Date;
  };
  type customTabBarIconProps = {
    focused: boolean;
    iconName: string;
    index: number;
  };
  type attendeeContainerProps = {
    attendeeCount: number;
  };
  type attendeeFormType = {
    name: string;
    email: string;
  };
  type errorDataType = {
    title: string;
    limit: string;
    location: string;
  };
  type eventFormDataType = {
    title: string;
    date: Date;
    description: string;
    limit: number;
    location: string;
    attendeeList?: attendeeFormType[];
  };
  type customGenderIconProps = {
    name: string;
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
  };
  type modalProps = {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
  };
  type attendeeCardProps = {
    name: string;
    email: string;
  };
}
export {};
