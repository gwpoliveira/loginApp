import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function UserDetailScreen({ route }) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os detalhes do usuário
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`);
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do usuário", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#5D5FEF" style={styles.loader} />;
  }

  if (!user) {
    return <Text style={styles.errorText}>Usuário não encontrado.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
        <Text style={styles.email}>Email: {user.email}</Text>
        <Text style={styles.id}>ID: {user.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  id: {
    fontSize: 16,
    color: '#aaa',
  },
});
