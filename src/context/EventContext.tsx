import {createContext, ReactNode, useState, useEffect} from 'react';
import React from 'react';
import {nameRegex, limitRegex} from '@src/constants/constants';
import useAsyncStorage from '@src/hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const EventContext = createContext<eventContextType>({
  eventData: {
    id: Date.now(),
    title: '',
    date: new Date(),
    description: '',
    limit: 0,
    location: '',
    attendees: [],
  },
  error: {
    title: '',
    limit: '',
    location: '',
  },
  attendeeData: {
    name: '',
    email: '',
  },
  date: new Date(),
  eventList: [],
  attendeesList: [],
  disabled: true,
  visible: false,
  addOrEditButton: 'Add',
  addOrEditEvent: 'Add',
  modalVisible: false,
  confirmationText: '',
  confirm: 'No',
  setAttendeeData: () => {},
  validateFormData: () => {},
  addEvent: () => {},
  removeAttendeeFromList: () => {},
  editAttendeeFromList: () => {},
  addAttendee: () => {},
  setEventData: () => {},
  setVisible: () => {},
  setAddOrEditButton: () => {},
  editEventFromList: () => {},
  setDate: () => {},
  setAddOrEditEvent: () => {},
  setEventList: () => {},
  setattendeesList: () => {},
  setdisabled: () => {},
  removeEventFromList: () => {},
  setModalVisible: () => {},
  setConfirmationText: () => {},
  setConfirm: () => {},
});

export const EventProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const intialEventData = {
    id: Date.now(),
    title: '',
    date: new Date(),
    description: '',
    limit: 0,
    location: '',
    attendees: [],
  };
  const initialAttendeeData = {
    name: '',
    email: '',
  };
  const initialErrorObj = {
    title: '',
    limit: '',
    location: '',
  };
  const [eventData, setEventData] =
    useState<eventFormDataType>(intialEventData);
  const [attendeeData, setAttendeeData] =
    useState<attendeeFormType>(initialAttendeeData);

  const [error, setError] = useState<errorDataType>(initialErrorObj);
  const [eventList, setEventList] = useState<eventFormDataType[]>([]);
  const [attendeesList, setattendeesList] = useState<attendeeFormType[]>([]);
  const [disabled, setdisabled] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [addOrEditButton, setAddOrEditButton] = useState<string>('Add');
  const [addOrEditEvent, setAddOrEditEvent] = useState<string>('Add');
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [confirmationText, setConfirmationText] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('No');

  // console.log('eventdata in context', eventData);
  const validateFormData = () => {
    const data = {...eventData};
    const errorObj = initialErrorObj;
    let allTrue = true;
    if (!data.title) {
      errorObj.title = 'Title is required';
      allTrue = false;
    } else if (!nameRegex.test(data.title)) {
      errorObj.title = 'Title must contain only letters and spaces';
      allTrue = false;
    }
    if (!data.limit) {
      errorObj.limit = 'Limit is required';
      allTrue = false;
    } else if (data.limit < 0) {
      errorObj.limit = 'Limit must be a positive integer';
      allTrue = false;
    } else if (!limitRegex.test(String(data.limit))) {
      errorObj.limit = 'Limit must be between 2 and 100';
      allTrue = false;
    } else if (attendeesList.length > eventData.limit) {
      errorObj.limit = 'Number of attendees are greater than limit';
      allTrue = false;
    } else if (attendeesList.length === 0) {
      errorObj.limit = 'Please add atleast one attendee';
      allTrue = false;
    }
    if (!data.location) {
      errorObj.location = 'Location is required';
      allTrue = false;
    } else if (!nameRegex.test(data.location)) {
      errorObj.location = 'Location must contain only letters and spaces';
      allTrue = false;
    }
    setError(prevError => {
      return {...errorObj};
    });
    return allTrue;
  };

  let limit: number = eventData?.limit || 0;

  useEffect(() => {
    limit = eventData.limit;
    if (limit > attendeesList.length) setdisabled(false);
    else setdisabled(true);
  }, [eventData]);

  const addEvent = (eventId: number) => {
    console.log('called evntData');
    const isValidateFormData = validateFormData();
    if (isValidateFormData) {
      const clonedEventData = {
        ...eventData,
        attendees: attendeesList,
        date: date,
      };
      let arr = [...eventList];
      const index = arr.findIndex(({id}) => id === eventId);
      console.log(index, 'index is prev');
      if (index !== -1) {
        arr[index] = clonedEventData;
        setEventList(() => [...arr]);
      } else {
        arr = [...eventList, clonedEventData];
        setEventList(prevEvents => {
          return [...prevEvents, clonedEventData];
        });
      }
      const {addEventList} = useAsyncStorage();
      console.log('setting in storage');
      addEventList(arr);
      console.log('success');
    }
  };

  const editEventFromList = (eventId: number) => {
    const selectedEvent = eventList.find(({id}) => id === eventId);
    if (selectedEvent) {
      setAddOrEditEvent('Edit');

      if (selectedEvent.attendees) {
        const updatedAttendees = [...selectedEvent.attendees];
        setattendeesList(updatedAttendees);
        const isDisabled =
          Number(selectedEvent.limit) <= updatedAttendees.length;
        setdisabled(isDisabled);
      }
      setEventData(selectedEvent);
    }
  };
  const removeEventFromList = (eventId: number) => {
    let arr = [...eventList];
    arr = arr.filter(({id}) => id !== eventId);
    setEventList(arr);
    const {addEventList} = useAsyncStorage();
    addEventList(arr);
  };

  const addAttendee = (attendeeEmail: string) => {
    if (addOrEditButton === 'Edit') {
      let arr = [...attendeesList];
      const attendeeIndex = arr.findIndex(({email}) => email === attendeeEmail);
      arr[attendeeIndex] = attendeeData;
      setattendeesList(arr);
    } else {
      setattendeesList(prevAttendee => {
        return [...prevAttendee, attendeeData];
      });
    }
    if (attendeesList.length + 1 >= Number(limit)) setdisabled(true);
  };

  const removeAttendeeFromList = (attendeeEmail: string) => {
    let arr = [...attendeesList];
    arr = arr.filter(({email}) => email !== attendeeEmail);
    if (eventData.limit > attendeesList.length) setdisabled(false);
    setattendeesList(arr);
  };
  const editAttendeeFromList = (attendeeEmail: string) => {
    let arr = [...attendeesList];
    arr = arr.filter(({email}) => email === attendeeEmail);
    setAddOrEditButton('Edit');
    setVisible(true);
    setAttendeeData(arr[0]);
  };

  const getEventListFromAsyncStorage = async () => {
    console.log('setting eventLisrt from storagee');
    try {
      const currentStorageKey = await AsyncStorage.getItem('currentStorageKey');
      const jsonData = await AsyncStorage.getItem(currentStorageKey as string);
      const userData = JSON.parse(jsonData as string);
      const currentEventList = userData.eventList;
      setEventList(currentEventList);
    } catch (error) {
      console.error('Error fetching event list from storage:', error);
    }
  };
  useEffect(() => {
    getEventListFromAsyncStorage();
  }, []);

  return (
    <EventContext.Provider
      value={{
        eventData,
        error,
        eventList,
        disabled,
        attendeesList,
        attendeeData,
        visible,
        addOrEditButton,
        date,
        addOrEditEvent,
        modalVisible,
        confirmationText,
        confirm,
        setAttendeeData,
        validateFormData,
        addEvent,
        removeAttendeeFromList,
        editAttendeeFromList,
        addAttendee,
        setEventData,
        setVisible,
        setAddOrEditButton,
        editEventFromList,
        setDate,
        setAddOrEditEvent,
        setEventList,
        setattendeesList,
        setdisabled,
        removeEventFromList,
        setModalVisible,
        setConfirmationText,
        setConfirm,
      }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
