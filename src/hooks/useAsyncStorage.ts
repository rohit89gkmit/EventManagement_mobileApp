import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
  const saveSignupData = async (data: signUpFormDataType) => {
    const storageKey = `${data.email}+${data.password}`;
    try {
      data = {...data, eventList: []};
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(storageKey, jsonData);
    } catch (error) {
      console.error('Error saving signup data to AsyncStorage:', error);
    }
  };

  const getLoginData = async (email: string, password: string) => {
    const storageKey = `${email}+${password}`;
    console.log('current useer after login is', storageKey);
    try {
      const jsonData = await AsyncStorage.getItem(storageKey);
      const parsedData: signUpFormDataType = JSON.parse(jsonData as string);
      await AsyncStorage.setItem('currentStorageKey', storageKey);
      return parsedData;
    } catch (error) {
      console.warn('Email or password are wrong');
      return false;
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
      const updatedEventList = [...newEventList];
      const updatedUserData = {
        ...userData,
        eventList: updatedEventList,
      };
      await AsyncStorage.setItem(
        currentStorageKey,
        JSON.stringify(updatedUserData),
      );
    } catch (error) {
      console.error('Error adding eventList to current user:', error);
    }
  };

  return {
    saveSignupData,
    getLoginData,
    addEventList,
  };
};

export default useAsyncStorage;
