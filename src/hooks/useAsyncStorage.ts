import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
  const saveSignupData = async (data: signUpFormDataType) => {
    const storageKey = `${data.email}+${data.password}`;
    try {
      data = {...data, eventList: []};
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(storageKey, jsonData);
      await AsyncStorage.setItem('currentStorageKey', storageKey);
    } catch (error) {
      console.error('Error saving signup data to AsyncStorage:', error);
    }
  };

  const getLoginData = async (email: string, password: string) => {
    const storageKey = `${email}+${password}`;
    try {
      const jsonData = await AsyncStorage.getItem(storageKey);
      const parsedData: signUpFormDataType = JSON.parse(jsonData as string);
      let value = true;
      if (!parsedData.email) value = false;
      if (value) {
        await AsyncStorage.setItem('currentStorageKey', storageKey);
      }
      return value;
    } catch (error) {
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
      const currentEventList = userData.eventList;
      const updatedEventList = [...currentEventList, ...newEventList];
      const updatedUserData = {
        ...userData,
        eventList: updatedEventList,
      };
      await AsyncStorage.setItem(
        currentStorageKey,
        JSON.stringify(updatedUserData),
      );
      console.warn('updated');
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
