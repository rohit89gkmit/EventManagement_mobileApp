import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  eventSummaryContainer: {
    width: 315,
    height: 120,
    padding: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  summaryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  labelHeading: {fontSize: 16, fontWeight: '500'},
});
