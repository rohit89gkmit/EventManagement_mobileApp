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
    addOrEditEvent: string;
    modalVisible: boolean;
    confirmationText: string;
    confirm: string;
    validateFormData: () => void;
    addEvent: (eventId: number) => boolean;
    removeAttendeeFromList: (email: string) => void;
    editAttendeeFromList: (email: string) => void;
    addAttendee: (attendeeEmail: string) => void;
    setEventData: React.Dispatch<React.SetStateAction<eventFormDataType>>;
    setAttendeeData: React.Dispatch<React.SetStateAction<attendeeFormType>>;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddOrEditButton: React.Dispatch<React.SetStateAction<string>>;
    editEventFromList: (eventId: number) => void;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    setAddOrEditEvent: React.Dispatch<React.SetStateAction<string>>;
    setEventList: React.Dispatch<React.SetStateAction<eventFormDataType[]>>;
    setattendeesList: React.Dispatch<React.SetStateAction<attendeeFormType[]>>;
    setdisabled: React.Dispatch<React.SetStateAction<boolean>>;
    removeEventFromList: (eventId: number) => void;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmationText: React.Dispatch<React.SetStateAction<string>>;
    setConfirm: React.Dispatch<React.SetStateAction<string>>;
  };
}
export {};
