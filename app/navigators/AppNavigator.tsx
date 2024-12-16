import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import Home from '../screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import WheelOfFun from '../screens/WheelOfFun';
import {TabNavigator} from './BottomTabNavigation';
export type AppStackParamList = {
  Home: undefined;
  WheelOfFun: undefined;
  TabNavigator: undefined;
};
export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
const AppStack = observer(function AppStack() {
  // @demo remove-block-start
  const Stack = createNativeStackNavigator<AppStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      // initialRouteName={isAuthenticated ? "TabNavigator" : "Login"} // @demo remove-current-line

      initialRouteName={'TabNavigator'} // @demo remove-current-line
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
});

export const AppNavigator = observer(function AppNavigator(
  props: NavigationProps,
) {
  return (
    <NavigationContainer
      // ref={navigationRef}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}>
      <AppStack />
    </NavigationContainer>
  );
});
