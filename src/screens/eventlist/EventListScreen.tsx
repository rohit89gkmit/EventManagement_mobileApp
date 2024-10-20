import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {styles} from './styles';
import React, {useContext, useEffect, useState} from 'react';
import EventContext from '@src/context/EventContext';
import EventCard from '@src/components/eventCard';
import {ROUTES} from '@src/constants/routes';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchBar from '@src/components/searchbar';
import useDebounce from '@src/hooks/useDebounce';
import ConfirmationModal from '@src/components/confirmationmodal/ConfirmationModal';
import {colors} from '@src/resources/colors';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EventListscreen = ({navigation}: EventListScreenProps) => {
  const {
    eventList,
    setEventList,
    setEventData,
    setAddOrEditEvent,
    setattendeesList,
  } = useContext(EventContext);

  const [query, setQuery] = useState<string>('');
  const debounceValue = useDebounce(query, 2000);
  const [loading, setLoading] = useState<boolean>(false);
  const [duplicateEventlist, setDuplicateEventList] =
    useState<eventFormDataType[]>(eventList);
  const [originalEventList, setOriginalEventList] =
    useState<eventFormDataType[]>(eventList);

  const [confirmStatus, setConfirmStatus] = useState<string>('');
  const [filter, setFilter] = useState<string>('Today');
  const [sort, setSort] = useState<string>('Date & Time');
  const [preference, setPreference] = useState<string>('alphabetically');

  useEffect(() => {
    setOriginalEventList(eventList);
    setDuplicateEventList(eventList);
  }, [eventList]);

  useEffect(() => {
    setLoading(true);
    const filteredList = originalEventList.filter(event =>
      event.title.toLowerCase().includes(debounceValue.toLowerCase()),
    );
    const sortedList = sortEvents(filteredList, preference);
    console.log('sorted list is', sortedList);
    setTimeout(() => {
      setDuplicateEventList(sortedList);
      setLoading(false);
    }, 1000);
  }, [debounceValue, preference]);

  const sortEvents = (
    events: eventFormDataType[],
    {preference}: sortingPreference,
  ) => {
    const sortedList = [...events];
    switch (preference) {
      case 'date':
        sortedList.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case 'attendees':
        sortedList.sort((a, b) => a.attendees.length - b.attendees.length);
        break;
      case 'alphabetically':
        sortedList.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return sortedList;
  };

  const filterData = [
    {label: 'Today', value: 'Today'},
    {label: 'Weekly', value: 'Weekly'},
    {label: 'Monthly', value: 'Monthly'},
  ];
  const sortData = [
    {label: 'Date & Time', value: 'Date & Time'},
    {label: 'Attendee Count', value: 'Attendee Count'},
    {label: 'Alphabetically', value: 'Alphabetically'},
  ];

  const handleAddEventClicked = () => {
    setAddOrEditEvent('Add');
    navigation.navigate(ROUTES.ADDEVENT);
    setEventData({
      id: Date.now(),
      title: '',
      date: new Date(),
      limit: 0,
      description: '',
      location: '',
      attendees: [],
    });
    setattendeesList([]);
  };

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
          console.log('hiiiiiii');
        }
      } catch (error) {
        console.error('error in settingsss');
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: '500', marginTop: 10}}>
        Events
      </Text>
      <SearchBar onChange={setQuery} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 70,
          marginTop: 15,
        }}>
        <View>
          <Text style={{fontSize: 16, fontWeight: '400', marginLeft: 13}}>
            Filter by
          </Text>
          <View
            style={{
              width: 130,
              borderRadius: 30,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: colors.secondary,
              padding: 10,
            }}>
            <Dropdown
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={filterData}
              maxHeight={150}
              labelField="label"
              valueField="value"
              value={filter}
              onChange={item => {
                setFilter(item.value);
              }}
            />
          </View>
        </View>

        <View>
          <Text style={{fontSize: 16, fontWeight: '400', marginLeft: 13}}>
            Sort by
          </Text>
          <View
            style={{
              width: 160,
              borderRadius: 30,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: colors.secondary,
              padding: 10,
            }}>
            <Dropdown
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={sortData}
              maxHeight={150}
              labelField="label"
              valueField="value"
              value={sort}
              onChange={item => {
                setSort(item.value);
              }}
            />
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderConatiner}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      ) : (
        <FlatList
          style={{marginBottom: 150}}
          showsVerticalScrollIndicator={false}
          data={duplicateEventlist}
          renderItem={({item}) => (
            <EventCard
              title={item.title}
              limit={item.limit}
              location={item.location}
              date={item.date}
              id={item.id}
              attendees={item.attendees}
              confirmStatus={confirmStatus}
            />
          )}
        />
      )}
      <TouchableOpacity
        onPress={handleAddEventClicked}
        style={styles.addButton}>
        <Entypo name="plus" size={24} color={'white'} />
      </TouchableOpacity>
      <ConfirmationModal
        setConfirmStatus={setConfirmStatus}
        message="remove this event"
      />
    </View>
  );
};

export default EventListscreen;
