import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {ROUTES} from '@src/constants/routes';
import {
  emailRegex,
  nameRegex,
  ageRegex,
  usernameRegex,
  passwordRegex,
} from '@src/constants/constants';
import CustomTextInput from '@src/components/CustomTextInput';
import CustomBackButton from '@src/components/customBackButton';
import useAsyncStorage from '@src/hooks/useAsyncStorage';
import CustomGenderIcon from '@src/components/customgendericon';

const SignUpScreen = ({navigation}: SignUpScreenProps) => {
  const intialSignUpData = {
    name: '',
    email: '',
    age: 0,
    username: '',
    password: '',
    confirmpassword: '',
    gender: 'Male',
  };
  const initialErrorObj = {
    name: '',
    email: '',
    age: '',
    username: '',
    password: '',
    confirmpassword: '',
  };
  const [signUpData, setSignUpData] =
    useState<signUpFormDataType>(intialSignUpData);
  const [error, setError] = useState(initialErrorObj);
  const [gender, setGender] = useState<string>('Male');

  const isUserNameExists = async (currUserName: string) => {
    const {getAllUserNames} = useAsyncStorage();

    try {
      const data = await getAllUserNames();
      const isExists = data.some(username => username === currUserName);
      console.log('username with', currUserName, 'exists:', isExists);
      return isExists;
    } catch (error) {
      console.error('Error fetching usernames:', error);
      return false;
    }
  };

  const isExistsEmail = async (currEmail: string) => {
    const {getAllEmails} = useAsyncStorage();
    try {
      const data = await getAllEmails();
      const isExists = data.some(email => email === currEmail);
      return isExists;
    } catch (error) {
      console.error('Error fetching usernames:', error);
      return false;
    }
  };

  const validateSignUpForm = async () => {
    const data = {...signUpData};
    const errorObj = initialErrorObj;
    let allTrue = true;
    if (!data.name) {
      errorObj.name = 'Name is required';
      allTrue = false;
    } else if (!nameRegex.test(data.name)) {
      errorObj.name = 'Name must contain only letters and spaces';
      allTrue = false;
    }
    if (!data.email) {
      errorObj.email = 'Email is required';
      allTrue = false;
    }
    if (data.email && !emailRegex.test(data.email)) {
      errorObj.email = 'Invalid Email format';
      allTrue = false;
    }
    if (await isExistsEmail(data.email)) {
      errorObj.email = 'Email already exists';
      allTrue = false;
    }
    if (!data.age || data.age <= 0) {
      errorObj.age = 'Age is required';
      allTrue = false;
    } else if (!ageRegex.test(String(data.age))) {
      errorObj.age = 'Age must be between 18 and 100';
      allTrue = false;
    }
    if (!data.username) {
      errorObj.username = 'Username is required';
      allTrue = false;
    } else if (!usernameRegex.test(data.username)) {
      errorObj.username =
        'Username can only contain letters, numbers, or underscores';
      allTrue = false;
    } else if (await isUserNameExists(data.username)) {
      console.log('sss');
      errorObj.username = 'Username already exists';
      allTrue = false;
    }
    if (!data.password) {
      errorObj.password = 'Password is required';
      allTrue = false;
    } else if (!passwordRegex.test(data.password)) {
      errorObj.password =
        'Password must be at least 6 characters and contain both letters and numbers';
      allTrue = false;
    }
    if (data.confirmpassword !== data.password) {
      errorObj.confirmpassword = 'Password do not matches';
      allTrue = false;
    }
    setError(prevError => {
      return {...errorObj};
    });
    return allTrue;
  };

  const handleSignUpClicked = async () => {
    const isValidate = validateSignUpForm();
    setError(initialErrorObj);
    const {saveSignupData} = useAsyncStorage();
    if (await isValidate) {
      saveSignupData(signUpData);
      navigation.navigate(ROUTES.LOGIN);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <CustomBackButton route={ROUTES.LOGIN} />

        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Let's get started</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomTextInput
            placeholder="Enter your name"
            secured={false}
            iconName="account"
            setData={setSignUpData}
          />
          {error.name !== '' && (
            <Text style={styles.errorTextMessage}>{error.name}</Text>
          )}

          <CustomTextInput
            placeholder="Enter your email"
            secured={false}
            iconName="email-outline"
            setData={setSignUpData}
          />
          {error.email !== '' && (
            <Text style={styles.errorTextMessage}>{error.email}</Text>
          )}

          <CustomTextInput
            placeholder="Enter your age"
            secured={false}
            iconName="account"
            setData={setSignUpData}
          />
          {error.age !== '' && (
            <Text style={styles.errorTextMessage}>{error.age}</Text>
          )}

          <CustomTextInput
            placeholder="Enter your username"
            secured={false}
            iconName="account"
            setData={setSignUpData}
          />
          {error.username !== '' && (
            <Text style={styles.errorTextMessage}>{error.username}</Text>
          )}

          <Text style={styles.genderText}>Gender</Text>
          <View style={styles.genderContainer}>
            <CustomGenderIcon
              name="male"
              gender={gender}
              setGender={setGender}
            />
            <CustomGenderIcon
              name="female"
              gender={gender}
              setGender={setGender}
            />
            <CustomGenderIcon
              name="male-female"
              gender={gender}
              setGender={setGender}
            />
          </View>

          <CustomTextInput
            placeholder="Enter your password"
            secured={true}
            iconName="lock"
            setData={setSignUpData}
          />
          {error.password !== '' && (
            <Text style={styles.errorTextMessage}>{error.password}</Text>
          )}
          <CustomTextInput
            placeholder="Confirm password"
            secured={true}
            iconName="lock"
            setData={setSignUpData}
          />
          {error.confirmpassword !== '' && (
            <Text style={styles.errorTextMessage}>{error.confirmpassword}</Text>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSignUpClicked}>
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Already have an account!</Text>
            <TouchableOpacity>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
