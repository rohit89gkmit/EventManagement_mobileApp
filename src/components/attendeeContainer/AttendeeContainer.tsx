import {Text, View, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import img1 from '@src/assets/review-1.png';
import img2 from '@src/assets/review-2.png';
import img3 from '@src/assets/review-3.png';

const images = [img1, img2, img3];
const AttendeeContainer = ({attendeeCount}: attendeeContainerProps) => {
  if (attendeeCount < 3) images.slice(attendeeCount);
  return (
    <View style={styles.imageView}>
      {images.map((imgSrc, index) => {
        return <Image key={index} style={styles.image} source={imgSrc} />;
      })}
      {attendeeCount - 3 > 0 && (
        <View style={styles.attendeeCount}>
          <Text>+{attendeeCount - 3}</Text>
        </View>
      )}
    </View>
  );
};

export default AttendeeContainer;
