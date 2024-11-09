import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../app/customerScreen/HomeScreen";
import ProfileScreen from "../app/customerScreen/ProfileScreen";
import OrdersScreen from "../app/customerScreen/OrderScreen";
import ProductsScreen from "../app/customerScreen/ProductScreen";
import CartScreen from "../app/customerScreen/CartScreen";
import AdminDashboard from "../app/AdminScreen/AdminDashboard";
import ManageUsersScreen from "../app/AdminScreen/ManageUsersScreen";
import AdminOrdersScreen from "../app/AdminScreen/AdminOrdersScreen";
import { useAuth } from "../contexts/AuthContext";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { user } = useAuth();

  return (
    <Tab.Navigator>
      {user?.role === "admin" ? (
        <>
          <Tab.Screen name="Dashboard" component={AdminDashboard} />
          <Tab.Screen name="Manage Users" component={ManageUsersScreen} />
          <Tab.Screen name="Orders" component={AdminOrdersScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Products" component={ProductsScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Orders" component={OrdersScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}
