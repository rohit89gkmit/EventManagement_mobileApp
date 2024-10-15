import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '@src/components/CustomTextInput';
import CustomBackButton from '@src/components/customBackButton';
import {styles} from './styles';
import {emailRegex} from '@src/constants/constants';
import useAsyncStorage from '@src/hooks/useAsyncStorage';
import {ROUTES} from '@src/constants/routes';
const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [loginData, setLoginData] = useState<loginFormDataType>({
    email: '',
    password: '',
  });

  const [error, setError] = useState({type: '', message: ''});

  const validateLoginForm = () => {
    const data = {...loginData};
    if (data.email === '') {
      setError({type: 'email', message: 'Email is required'});
      return false;
    } else if (!emailRegex.test(data.email)) {
      setError({type: 'email', message: 'Invalid Email format'});
      return false;
    } else if (data.password === '') {
      setError({type: 'password', message: 'Invalid password format'});
      return false;
    } else setError({type: '', message: ''});
    return true;
  };

  const handleLoginClicked = () => {
    const isValidateLoginForm = validateLoginForm();
    if (isValidateLoginForm) {
      const {getLoginData} = useAsyncStorage();
      getLoginData(loginData.email, loginData.password).then(value => {
        if (value) {
          navigation.navigate(ROUTES.MAIN);
        } else {
          setError({
            type: 'password',
            message: 'Email or password are incorrect',
          });
        }
      });
    }
  };
  const handleSignUpPress = () => {
    navigation.navigate(ROUTES.SIGNUP);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey, Welcome Back</Text>
      </View>

      <View style={styles.formContainer}>
        <CustomTextInput
          placeholder="Enter your email"
          secured={false}
          iconName="envelope"
          setData={setLoginData}
        />
        {error.type === 'email' && (
          <Text style={styles.errorTextMessage}>{error.message}</Text>
        )}

        <CustomTextInput
          placeholder="Enter your password"
          secured={true}
          iconName="lock"
          setData={setLoginData}
        />
        {error.type === 'password' && (
          <Text style={styles.errorTextMessage}>{error.message}</Text>
        )}

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginClicked}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
