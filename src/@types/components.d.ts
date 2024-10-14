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
}
export {};
