// UsersScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Indicador de carregamento

  const fetchUsers = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      navigation.navigate('Login');
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/users?page=1', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data.data);
      } else {
        console.log('Erro ao carregar usuários');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Parar o indicador de carregamento
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <Button title="Logout" onPress={handleLogout} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text style={styles.userName}>{item.first_name} {item.last_name}</Text>
              <Text>{item.email}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  loader: {
    marginTop: 20
  },
  userContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
