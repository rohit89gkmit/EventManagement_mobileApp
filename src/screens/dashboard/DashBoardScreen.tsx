import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomBackButton from '@src/components/customBackButton'
import { ROUTES } from '@src/constants/routes'

const DashBoardScreen = () => {
  return (
    <View>
      <CustomBackButton route={ROUTES.SIGNUP}/>
    </View>
  )
}

export default DashBoardScreen

const styles = StyleSheet.create({})