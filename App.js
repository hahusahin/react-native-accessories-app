import { RootSiblingParent } from "react-native-root-siblings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AuthScreen from "./screens/AuthScreen";
import OrderFormScreen from "./screens/OrderFormScreen";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useSelector } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ProductsScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      <Stack.Screen name="OrderForm" component={OrderFormScreen} />
    </Stack.Navigator>
  );
};

const GuestTabs = () => {
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
            <Ionicons name="laptop-outline" size={size} color={color} />
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
        component={CartStack}
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
            <Ionicons name="laptop-outline" size={size} color={color} />
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
    <RootSiblingParent>
      <Provider store={store}>
        <StatusBar style="light" />
        <Root />
      </Provider>
    </RootSiblingParent>
  );
}
