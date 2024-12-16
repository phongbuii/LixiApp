import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <AntDesign name="home" size={24} color={'#000'} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
