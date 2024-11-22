import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// This is the type that defines all the routes (screens) in your app and what parameters they expect
export type RootStackParamList = {
    Home: undefined; // undefined because I'm not passing any params to the List screen
    Details: {city: string};
  };

export type DetailScreenRouteProp = RouteProp<RootStackParamList>;

export type ListScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'Home'
//refers to a specific route name defined in your RootStackParamList type.
//It's telling TypeScript that the navigation prop (DetailScreenNavigationProp)
//is typed specifically for the 'Home' screen in your navigation stack.
>;