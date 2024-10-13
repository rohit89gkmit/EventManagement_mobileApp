import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {

  const saveSignupData = async (data:signUpFormDataType) => {
    const storageKey = `${data.email}+${data.password}`
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(storageKey, jsonData);
    } catch (error) {
      console.error('Error saving signup data to AsyncStorage:', error);
    }
  };
  
  const getLoginData = async (email:string, password: string) => {
    const storageKey = `${email}+${password}`
    try {
      const jsonData = await AsyncStorage.getItem(storageKey);
      const parsedData:signUpFormDataType = JSON.parse(jsonData as string)
      return parsedData ? true : false
    } catch (error) {
      console.error('Error retrieving signup data from AsyncStorage:', error);
    }
  };

  return { saveSignupData, getLoginData };
};

export default useAsyncStorage;
