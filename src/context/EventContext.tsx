import {createContext, ReactNode, useState, useEffect} from 'react';
import React from 'react';
import {emailRegex, nameRegex, limitRegex} from '@src/constants/constants';
import useAsyncStorage from '@src/hooks/useAsyncStorage';
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

  let limit: number = eventData.limit;
  useEffect(() => {
    limit = eventData.limit;
    if (limit <= attendeesList.length) setdisabled(true);
    else setdisabled(false);
  }, [eventData]);

  const addEvent = () => {
    const isValidateFormData = validateFormData();
    if (isValidateFormData) {
      const clonedEventData = {...eventData, attendees: attendeesList};
      setEventList(prevEvents => {
        return [...prevEvents, clonedEventData];
      });
      const {addEventList} = useAsyncStorage();
      addEventList(eventList);
    }
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
    setattendeesList(arr);
    setdisabled(false);
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
      }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
