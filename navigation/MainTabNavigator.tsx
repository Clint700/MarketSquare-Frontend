import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../app/HomeScreen";
import ProfileScreen from "../app/ProfileScreen";
import ProductScreen from "../app/ProductScreen";
import CartScreen from "../app/CartScreen";
import OrderScreen from "../app/OrderScreen";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
