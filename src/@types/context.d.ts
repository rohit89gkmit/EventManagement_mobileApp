declare global {
  type eventContextType = {
    eventData: eventFormDataType;
    error: errorDataType;
    attendeeData: attendeeFormType;
    eventList: eventFormDataType[];
    attendeesList: attendeeFormType[];
    disabled: boolean;
    visible: boolean;
    date: Date;
    addOrEditButton: string;
    validateFormData: () => void;
    addEvent: (title: string) => void;
    removeAttendeeFromList: (email: string) => void;
    editAttendeeFromList: (email: string) => void;
    addAttendee: (attendeeEmail: string) => void;
    setEventData: React.Dispatch<React.SetStateAction<eventFormDataType>>;
    setAttendeeData: React.Dispatch<React.SetStateAction<attendeeFormType>>;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddOrEditButton: React.Dispatch<React.SetStateAction<string>>;
    resetEventContext: () => void;
    editEventFromList: (eventTitle: string) => void;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
  };
}
export {};
