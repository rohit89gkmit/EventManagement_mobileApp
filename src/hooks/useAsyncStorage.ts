import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
  const saveSignupData = async (data: signUpFormDataType) => {
    const storageKey = `${data.email}+${data.password}`;
    try {
      data = {...data, eventList: []};
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(storageKey, jsonData);
      await AsyncStorage.setItem('currentStorageKey', storageKey);
      console.log('the current storage key is ', storageKey);
    } catch (error) {
      console.error('Error saving signup data to AsyncStorage:', error);
    }
  };

  const getLoginData = async (email: string, password: string) => {
    const storageKey = `${email}+${password}`;
    console.log('current useer after login is', storageKey);
    try {
      await AsyncStorage.setItem('currentStorageKey', storageKey);
      const jsonData = await AsyncStorage.getItem(storageKey);
      const parsedData: signUpFormDataType = JSON.parse(jsonData as string);
      console.log(parsedData);
      return parsedData;
    } catch (error) {
      console.warn('Emailpassword are worong');
      return false;
    }
  };

  const getAllData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allItems = await AsyncStorage.multiGet(allKeys);
      const userList = allItems.map(([key, value]) =>
        JSON.parse(value as string),
      );
      return userList;
    } catch (error) {
      console.error('Error getting all data from AsyncStorage:', error);
      return [];
    }
  };

  const addEventList = async (newEventList: eventFormDataType[]) => {
    try {
      const currentStorageKey = await AsyncStorage.getItem('currentStorageKey');
      if (!currentStorageKey) {
        console.error('No user is currently logged in');
        return;
      }

      const jsonData = await AsyncStorage.getItem(currentStorageKey);
      const userData = JSON.parse(jsonData as string);
      console.warn(userData.email, userData.eventList.length);
      const updatedEventList = [...newEventList];
      console.log('eventlist to add in storage', updatedEventList.length);
      console.log(updatedEventList.length);
      const updatedUserData = {
        ...userData,
        eventList: updatedEventList,
      };
      await AsyncStorage.setItem(
        currentStorageKey,
        JSON.stringify(updatedUserData),
      );
      const jsonData2 = await AsyncStorage.getItem(currentStorageKey);
      const userData2 = JSON.parse(jsonData2 as string);
      console.warn('updated', userData2.eventList.length);
    } catch (error) {
      console.error('Error adding eventList to current user:', error);
    }
  };

  const clearCurrentStorageKey = async () => {
    try {
      await AsyncStorage.removeItem('currentStorageKey');
    } catch (error) {
      console.error('Error clearing currentStorageKey:', error);
    }
  };

  return {
    saveSignupData,
    getLoginData,
    getAllData,
    addEventList,
    clearCurrentStorageKey,
  };
};

export default useAsyncStorage;
