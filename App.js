import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AuthScreen from "./screens/AuthScreen";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useSelector } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  <Stack.Navigator>
    <Stack.Screen name="Home" component={ProductsScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
  </Stack.Navigator>;
  return;
};

const GuestTabs = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#212529" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#212529" },
        tabBarActiveTintColor: "#c6affc",
      })}
    >
      <Tab.Screen
        name="Products"
        component={HomeStack}
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          title: "Login",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-in-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ShoppingCartScreen}
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LoggedInTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#212529" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#212529" },
        tabBarActiveTintColor: "#c6affc",
      })}
    >
      <Tab.Screen
        name="Products"
        component={HomeStack}
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ShoppingCartScreen}
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#282a36",
  },
};

const Root = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <NavigationContainer theme={MyTheme}>
      {token ? <LoggedInTabs /> : <GuestTabs />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Root />
    </Provider>
  );
}
