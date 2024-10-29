import {Text, View, Switch, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styles} from './styles';
import ConfirmationModal from '@src/components/confirmationmodal/ConfirmationModal';
import EventContext from '@src/context/EventContext';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingScreen = () => {
  const {setModalVisible, setEventList} = useContext(EventContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<string>('');
  const [filter, setFilter] = useState<string>('Today');
  const [sort, setSort] = useState<string>('Date & Time');
  const [disabled, setDisabled] = useState<boolean>(true);

  const toggleSwitch = () => {
    setDisabled(false);
    setIsEnabled(previousState => !previousState);
  };

  const handleResetDataClicked = () => {
    setModalVisible(true);
  };

  const handleSaveChangesClicked = async () => {
    const currentStorageKey = await AsyncStorage.getItem('currentStorageKey');
    const jsonData = await AsyncStorage.getItem(currentStorageKey as string);
    const userData = JSON.parse(jsonData as string);
    const newSettings: settingtype = {
      filterPreference: filter,
      sortPreference: sort,
      hoursFormat: isEnabled,
    };
    if (userData) {
      const updatedUserData = {...userData, settings: newSettings};
      await AsyncStorage.setItem(
        currentStorageKey as string,
        JSON.stringify(updatedUserData),
      );
      setDisabled(true);
    }
  };

  const filterData = [
    {label: 'Today', value: 'Today'},
    {label: 'Weekly', value: 'Weekly'},
    {label: 'Monthly', value: 'Monthly'},
    {label: 'All', value: 'All'},
  ];
  const sortData = [
    {label: 'Date & Time', value: 'Date & Time'},
    {label: 'Attendee Count', value: 'Attendee Count'},
    {label: 'Alphabetically', value: 'Alphabetically'},
  ];

  useEffect(() => {
    const resetData = async () => {
      const currentStorageKey = await AsyncStorage.getItem('currentStorageKey');
      const jsonData = await AsyncStorage.getItem(currentStorageKey as string);
      const userData = JSON.parse(jsonData as string);
      if (userData) {
        const updatedUserData = {...userData, eventList: []};
        setEventList([]);
        await AsyncStorage.setItem(
          currentStorageKey as string,
          JSON.stringify(updatedUserData),
        );
        console.log('success');
      }
    };
    if (confirmStatus === 'Yes') {
      resetData();
    }
  }, [confirmStatus]);

  useEffect(() => {
    const getData = async () => {
      try {
        const currentStorageKey = await AsyncStorage.getItem(
          'currentStorageKey',
        );
        console.log('current user is ', currentStorageKey);
        const jsonData = await AsyncStorage.getItem(
          currentStorageKey as string,
        );
        const userData = JSON.parse(jsonData as string);
        console.log('userdata in settings', userData);
        if (userData.settings) {
          const {filterPreference, sortPreference, hoursFormat} =
            userData.settings;
          setFilter(filterPreference);
          setSort(sortPreference);
          setIsEnabled(hoursFormat);
          setDisabled(true);
        }
      } catch (error) {
        console.error('error in settingsss');
      }
    };
    getData();
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 16}}>Select default filter of events</Text>

        <View style={styles.valueField}>
          <Dropdown
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={filterData}
            maxHeight={150}
            labelField="label"
            valueField="value"
            value={filter}
            onChange={item => {
              setDisabled(false);
              setFilter(item.value);
            }}
          />
        </View>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 16}}>Select default sorting of events</Text>

        <View style={styles.valueField}>
          <Dropdown
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={sortData}
            maxHeight={150}
            labelField="label"
            valueField="value"
            value={sort}
            onChange={item => {
              setDisabled(false);
              setSort(item.value);
            }}
          />
        </View>
      </View>
      {/* <View style={styles.switchView}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>12 Hour Format</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> */}

      <TouchableOpacity
        disabled={disabled}
        onPress={handleSaveChangesClicked}
        style={[
          {
            backgroundColor: 'green',
            marginTop: 25,
            opacity: disabled ? 0.6 : 1,
          },
          styles.buttonView,
        ]}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleResetDataClicked}
        style={[
          {
            backgroundColor: 'red',
            marginTop: 400,
          },
          styles.buttonView,
        ]}>
        <Text style={styles.buttonText}>Reset Data</Text>
      </TouchableOpacity>
      <ConfirmationModal
        setConfirmStatus={setConfirmStatus}
        message="reset all data"
      />
    </View>
  );
};

export default SettingScreen;
