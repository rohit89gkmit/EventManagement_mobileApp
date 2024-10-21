import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useContext, useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@src/resources/colors';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ROUTES} from '@src/constants/routes';
import EventContext from '@src/context/EventContext';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmationModal from '@src/components/confirmationmodal/ConfirmationModal';
const ProfileScreen = () => {
  const {setModalVisible} = useContext(EventContext);
  const [data, setData] = useState<signUpFormDataType | null>(null);
  const [confirmStatus, setConfirmStatus] = useState<string>('');

  const navigation = useNavigation();

  const handleLogOutClicked = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const func = async () => {
      await AsyncStorage.setItem('currentStorageKey', ''); //remove
    };
    if (confirmStatus === 'Yes') {
      func();
      navigation.navigate(ROUTES.LOGIN); //replace use
    }
  }, [confirmStatus]);

  useFocusEffect(
    useCallback(() => {
      const userData = async () => {
        try {
          const currentStorageKey = await AsyncStorage.getItem(
            'currentStorageKey',
          );
          console.log('storage key is', currentStorageKey);
          if (currentStorageKey) {
            const jsonData = await AsyncStorage.getItem(currentStorageKey);
            if (jsonData) {
              const parsedData = JSON.parse(jsonData);
              if (parsedData?.email) {
                setData(parsedData);
                console.log('success: ', parsedData.name, parsedData.email);
              }
            }
          }
        } catch (error) {
          console.error('Error retrieving user data:', error);
        }
      };

      userData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileSetting}>
        <View></View>
        <Text style={styles.profileText}>Profile</Text>
        <TouchableOpacity
          style={styles.settings}
          onPress={() => navigation.navigate(ROUTES.SETTING)}>
          <Ionicons name="settings-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileImage}>
        <Text style={{fontSize: 52, color: 'white'}}>
          {data?.name[0].toUpperCase()}
        </Text>
      </View>
      <Text style={styles.nameText}>{data?.name}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.iconName}>
          <MaterialCommunityIcons
            name="account"
            size={26}
            color={colors.secondary}
          />
          <Text style={styles.text}>{data?.name}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="edit" size={22} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.iconName}>
          <Feather name="mail" size={26} color={colors.secondary} />
          <Text style={styles.text}>{data?.email}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="edit" size={22} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.iconName}>
          <MaterialCommunityIcons
            name="lock"
            size={26}
            color={colors.secondary}
          />
          <Text style={styles.text}>***********</Text>
        </View>
        <TouchableOpacity>
          <Feather name="edit" size={22} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogOutClicked}
        style={styles.detailsContainer}>
        <View style={styles.iconName}>
          <MaterialCommunityIcons name="logout" size={26} color={'red'} />
          <Text style={{fontWeight: '500', color: 'red', fontSize: 16}}>
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
      <ConfirmationModal
        setConfirmStatus={setConfirmStatus}
        message="log out"
      />
    </View>
  );
};

export default ProfileScreen;
