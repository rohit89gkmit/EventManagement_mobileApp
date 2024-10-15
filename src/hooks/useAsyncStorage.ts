import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
  const saveSignupData = async (data: signUpFormDataType) => {
    const storageKey = `${data.email}+${data.password}`;
    try {
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
      const updatedUserData = {
        ...userData,
        eventList: newEventList,
      };
      await AsyncStorage.setItem(
        currentStorageKey,
        JSON.stringify(updatedUserData),
      );
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
