import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import AdminOrderCard from '../AdminScreen/AdminComponents/AdminOrderCard';
import { fetchAdminOrders } from '../../services/adminService';
import { useAuth } from '../../contexts/AuthContext';

const AdminOrderScreen = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchOrders();
    } else {
      Alert.alert('Access Denied', 'Only admins can access this screen.');
    }
  }, [user?.role]);

  const fetchOrders = () => {
    setLoading(true);
    fetchAdminOrders()
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        Alert.alert('Error', 'Failed to load orders.');
        setLoading(false);
      });
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#007BFF" />;
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.order_id.toString()}
      renderItem={({ item }) => <AdminOrderCard order={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default AdminOrderScreen;

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});