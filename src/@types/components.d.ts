declare global {
  type attendeeContainerProps = {
    attendeeCount: number;
  };
  type eventFormDataType = {
    title: string;
    date: Date;
    description: string;
    attendeeLimit: number;
    location: string;
  };
  type customGenderIconProps = {
    name: string;
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
  };
}
export {};
