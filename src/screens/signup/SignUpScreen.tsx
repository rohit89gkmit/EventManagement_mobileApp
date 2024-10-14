import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {ROUTES} from '@src/constants/routes';
import {
  email_regex,
  nameRegex,
  ageRegex,
  usernameRegex,
  passwordRegex,
} from '@src/constants/constants';
import CustomBackButton from '@src/components/customBackButton';
import CustomTextInput from '@src/components/CustomTextInput';
import useAsyncStorage from '@src/hooks/useAsyncStorage';

const SignUpScreen = ({navigation}: SignUpScreenProps) => {
  const intialSignUpData = {
    name: '',
    email: '',
    age: 0,
    username: '',
    password: '',
  };
  const initialErrorObj = {
    name: '',
    email: '',
    age: '',
    username: '',
    password: '',
  };
  const [signUpData, setSignUpData] =
    useState<signUpFormDataType>(intialSignUpData);
  const [error, setError] = useState(initialErrorObj);

  const validateSignUpForm = () => {
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
    if (data.email && !RegExp(email_regex).test(data.email)) {
      errorObj.email = 'Invalid Email format';
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
    }
    if (!data.password) {
      errorObj.password = 'Password is required';
      allTrue = false;
    } else if (!passwordRegex.test(data.password)) {
      errorObj.password =
        'Password must be at least 6 characters and contain both letters and numbers';
      allTrue = false;
    }
    setError(prevError => {
      return {...errorObj};
    });
    return allTrue;
  };

  const handleSignUpClicked = () => {
    const isValidate = validateSignUpForm();
    if (isValidate) {
      // const {saveSignupData, getLoginData} = useAsyncStorage();
      // saveSignupData(signUpData);
      // console.warn(getLoginData(signUpData.email, signUpData.password));
      navigation.navigate(ROUTES.MAIN);
    }
  };
  return (
    <View style={styles.container}>
      <CustomBackButton route={ROUTES.LOGIN} />

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>

      <View style={styles.formContainer}>
        <CustomTextInput
          placeholder="Enter your name"
          secured={false}
          iconName="envelope"
          setData={setSignUpData}
        />
        {error.name !== '' && (
          <Text style={styles.errorTextMessage}>{error.name}</Text>
        )}

        <CustomTextInput
          placeholder="Enter your email"
          secured={false}
          iconName="envelope"
          setData={setSignUpData}
        />
        {error.email !== '' && (
          <Text style={styles.errorTextMessage}>{error.email}</Text>
        )}

        <CustomTextInput
          placeholder="Enter your age"
          secured={false}
          iconName="envelope"
          setData={setSignUpData}
        />
        {error.age !== '' && (
          <Text style={styles.errorTextMessage}>{error.age}</Text>
        )}

        <CustomTextInput
          placeholder="Enter your username"
          secured={false}
          iconName="envelope"
          setData={setSignUpData}
        />
        {error.username !== '' && (
          <Text style={styles.errorTextMessage}>{error.username}</Text>
        )}

        {/* <View
          style={{
            backgroundColor: 'red',
            paddingVertical: 14,
            borderRadius: 100,
          }}>
          <Text>hi</Text>
        </View> */}

        <CustomTextInput
          placeholder="Enter your password"
          secured={true}
          iconName="envelope"
          setData={setSignUpData}
        />
        {error.password !== '' && (
          <Text style={styles.errorTextMessage}>{error.password}</Text>
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
    </View>
  );
};

export default SignUpScreen;
