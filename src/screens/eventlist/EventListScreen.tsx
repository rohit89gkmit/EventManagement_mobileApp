import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {styles} from './styles';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import EventContext from '@src/context/EventContext';
import EventCard from '@src/components/eventCard';
import {ROUTES} from '@src/constants/routes';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchBar from '@src/components/searchbar';
import useDebounce from '@src/hooks/useDebounce';
import ConfirmationModal from '@src/components/confirmationmodal/ConfirmationModal';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventListscreen = ({navigation}: EventListScreenProps) => {
  const {
    eventList,
    setEventData,
    setAddOrEditEvent,
    setDate,
    setattendeesList,
  } = useContext(EventContext);

  const [query, setQuery] = useState<string>('');
  const debounceValue = useDebounce(query, 2000);
  const [loading, setLoading] = useState<boolean>(false);
  const [duplicateEventlist, setDuplicateEventList] =
    useState<eventFormDataType[]>(eventList);

  const [confirmStatus, setConfirmStatus] = useState<string>('');
  const [filter, setFilter] = useState<string>('Today');
  const [sort, setSort] = useState<string>('Date & Time');

  useEffect(() => {
    setLoading(true);
    const searchFilteredList = eventList.filter(event =>
      event.title.toLowerCase().includes(debounceValue.toLowerCase()),
    );
    console.log('searchedList is', searchFilteredList.length);
    const filteredList = applyFilter(searchFilteredList, filter);
    const sortedList = sortEvents(filteredList, sort);

    setTimeout(() => {
      setDuplicateEventList(sortedList);
      setLoading(false);
    }, 1000);
  }, [debounceValue, filter, sort, eventList]);

  const applyFilter = (events: eventFormDataType[], filter: string) => {
    const today = moment().startOf('day');
    const weekStart = moment().startOf('isoWeek');
    const monthStart = moment().startOf('month');

    console.log('Applying filter:', filter);
    console.log(
      'Events before filtering:',
      events.map(event => event.date),
    );

    switch (filter) {
      case 'Today':
        return events.filter(event =>
          moment(event.date).local().isSame(today, 'day'),
        );
      case 'Weekly':
        return events.filter(event =>
          moment(event.date)
            .local()
            .isBetween(weekStart, moment(), 'day', '[]'),
        );
      case 'Monthly':
        return events.filter(event =>
          moment(event.date).isBetween(
            monthStart,
            moment().endOf('month'),
            'day',
            '[]',
          ),
        );
      case 'All':
        return events;
      default:
        return events;
    }
  };

  const sortEvents = (events: eventFormDataType[], preference: string) => {
    const sortedList = [...events];
    switch (preference) {
      case 'Date & Time':
        sortedList.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case 'Attendee Count':
        sortedList.sort((a, b) => a.attendees.length - b.attendees.length);
        break;
      case 'Alphabetically':
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
    {label: 'All', value: 'All'},
  ];
  const sortData = [
    {label: 'Date & Time', value: 'Date & Time'},
    {label: 'Attendee Count', value: 'Attendee Count'},
    {label: 'Alphabetically', value: 'Alphabetically'},
  ];

  const handleAddEventClicked = () => {
    setAddOrEditEvent('Add');
    setDate(new Date());
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
    navigation.navigate(ROUTES.ADDEVENT);
  };

  useFocusEffect(
    useCallback(() => {
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
          if (userData.settings) {
            const {filterPreference, sortPreference, hoursFormat} =
              userData.settings;
            setFilter(filterPreference);
            setSort(sortPreference);
          }
        } catch (error) {
          console.error('error in settingsss');
        }
      };

      getData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <SearchBar onChange={setQuery} />

      <View style={styles.filterSortView}>
        <View>
          <Text style={styles.sortFilterText}>Filter by</Text>
          <View style={styles.filterView}>
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
          <Text style={styles.sortFilterText}>Sort by</Text>
          <View style={styles.sortView}>
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
      ) : duplicateEventlist.length > 0 ? (
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
              setConfirmStatus={setConfirmStatus}
            />
          )}
        />
      ) : (
        <Text style={{fontSize: 18, marginTop: 20, fontWeight: '500'}}>
          No Events
        </Text>
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
