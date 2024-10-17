import {createContext, ReactNode, useState, useEffect} from 'react';
import React from 'react';
import {emailRegex, nameRegex, limitRegex} from '@src/constants/constants';
import useAsyncStorage from '@src/hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {v4: uuidv4} = require('uuid');
export const EventContext = createContext<eventContextType>({
  eventData: {
    title: '',
    date: new Date(),
    description: '',
    limit: 0,
    location: '',
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
  setAttendeeData: () => {},
  validateFormData: () => {},
  addEvent: () => {},
  removeAttendeeFromList: () => {},
  editAttendeeFromList: () => {},
  addAttendee: () => {},
  setEventData: () => {},
  setVisible: () => {},
  setAddOrEditButton: () => {},
  resetEventContext: () => {},
  editEventFromList: () => {},
  setDate: () => {},
});

export const EventProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const intialEventData = {
    title: '',
    date: new Date(),
    description: '',
    limit: 0,
    location: '',
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
  const [date, setDate] = useState(new Date());

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

  useEffect(() => {
    if (eventData.limit > attendeesList.length) setdisabled(false);
    else setdisabled(true);
  }, [eventData]);

  const addEvent = (eventTitle: string) => {
    const isValidateFormData = validateFormData();
    if (isValidateFormData) {
      const clonedEventData = {
        ...eventData,
        attendees: attendeesList,
        date: date,
      };
      setEventList(prevEvents => {
        return [...prevEvents, clonedEventData];
      });
      const {addEventList} = useAsyncStorage();
      addEventList(eventList);
    }
  };

  const editEventFromList = (eventTitle: string) => {
    let arr = [...eventList];
    arr = arr.filter(({title}) => title === eventTitle);
    setAddOrEditButton('Edit');
    setEventData(arr[0]);
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
    if (attendeesList.length + 1 >= eventData.limit) setdisabled(true);
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

  const resetEventContext = () => {
    setVisible(false);
    setdisabled(true);
    setAttendeeData(initialAttendeeData);
    setattendeesList([]);
  };

  const getEventListFromAsyncStorage = async () => {
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
        setAttendeeData,
        validateFormData,
        addEvent,
        removeAttendeeFromList,
        editAttendeeFromList,
        addAttendee,
        setEventData,
        setVisible,
        setAddOrEditButton,
        resetEventContext,
        editEventFromList,
        setDate,
      }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
