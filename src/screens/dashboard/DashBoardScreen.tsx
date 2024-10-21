import {Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import EventContext from '@src/context/EventContext';
import {months} from 'moment';
import {styles} from './styles';
import {countEvents} from '@src/constants/CountEvents';

const DashBoardScreen = () => {
  const {eventList} = useContext(EventContext);
  const [eventSummary, setEventSummary] = useState({
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  });

  useEffect(() => {
    const {todayCount, weekCount, monthCount, totalCount} =
      countEvents(eventList);
    setEventSummary({
      today: todayCount,
      week: weekCount,
      month: monthCount,
      total: totalCount,
    });
  }, [eventList]);
  return (
    <View style={{padding: 20, paddingHorizontal: 60}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 22, fontWeight: '500'}}>Total Events</Text>
        <Text style={{fontSize: 22, fontWeight: '500'}}>
          {eventSummary.total}
        </Text>
      </View>

      <View style={styles.eventSummaryContainer}>
        <View style={styles.summaryView}>
          <Text style={styles.labelHeading}>Events for today</Text>
          <Text style={styles.labelHeading}>{eventSummary.today}</Text>
        </View>
        <View style={styles.summaryView}>
          <Text style={styles.labelHeading}>Events this week</Text>
          <Text style={styles.labelHeading}>{eventSummary.week}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            Events this month
          </Text>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            {eventSummary.month}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DashBoardScreen;
