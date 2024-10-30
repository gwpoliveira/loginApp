import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function DeleteUserScreen({ route, navigation }) {
  const { userId } = route.params;

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Usuário excluído!");
        navigation.navigate("Users"); // Retorna à lista de usuários
      } else {
        Alert.alert("Erro", "Não foi possível excluir o usuário.");
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>Tem certeza de que deseja excluir este usuário?</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  warningText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
