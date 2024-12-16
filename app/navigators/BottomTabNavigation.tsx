import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CommonActions,
  CompositeScreenProps,
  NavigationRoute,
  ParamListBase,
} from '@react-navigation/native';
import React from 'react';
import {Platform, Text, TextStyle, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {HEIGHT} from '../config/functions';
import {BottomNavigation} from 'react-native-paper';
import Home from '../screens/Home';
import WheelOfFun from '../screens/WheelOfFun';
import Fontisto from 'react-native-vector-icons/Fontisto';
export type DemoTabParamList = {
  Home: undefined;
  WheelOfFun: undefined;
  TabNavigator: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<DemoTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Tab = createBottomTabNavigator<DemoTabParamList>();

export function TabNavigator() {
  const {bottom} = useSafeAreaInsets();
  // navigate("Login")
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, {height: bottom}],
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarShowLabel: false,
      }}
      initialRouteName="Home"
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          style={{backgroundColor: '#808080', height: bottom + HEIGHT(70)}}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name={'home'}
                color={focused ? '#000' : '#BBBBBB'}
                size={24}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="WheelOfFun"
        component={WheelOfFun}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: 'red', fontSize: 13}}>Wheel</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Fontisto
              name={'spinner-fidget'}
              color={focused ? '#000' : '#BBBBBB'}
              size={16}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const $tabBar: ViewStyle = {};

const $tabBarItem: ViewStyle = {};

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 16,
  flex: 1,
};

// @demo remove-file
