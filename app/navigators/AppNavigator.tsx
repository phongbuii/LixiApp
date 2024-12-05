import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import Home from "../screens/Home"
import { NavigationContainer } from "@react-navigation/native"
export type AppStackParamList = {
 Home:undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}
export interface NavigationProps
extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
const AppStack = observer(function AppStack() {
  // @demo remove-block-start
const Stack = createNativeStackNavigator<AppStackParamList>()
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false,  }}
      // initialRouteName={isAuthenticated ? "TabNavigator" : "Login"} // @demo remove-current-line

      initialRouteName={ "Home"} // @demo remove-current-line
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
})

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) { 
return (
    <NavigationContainer
      // ref={navigationRef}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})