declare global {
  type eventContextType = {
    eventData: eventFormDataType;
    error: errorDataType;
    attendeeData: attendeeFormType;
    eventList: eventFormDataType[];
    attendeesList: attendeeFormType[];
    disabled: boolean;
    visible: boolean;
    addOrEditButton: string;
    validateFormData: () => void;
    addEvent: () => void;
    removeAttendeeFromList: (email: string) => void;
    editAttendeeFromList: (email: string) => void;
    addAttendee: (attendeeEmail: string) => void;
    setEventData: React.Dispatch<React.SetStateAction<eventFormDataType>>;
    setAttendeeData: React.Dispatch<React.SetStateAction<attendeeFormType>>;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddOrEditButton: React.Dispatch<React.SetStateAction<string>>;
    resetEventContext: () => void;
  };
}
export {};
