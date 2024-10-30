import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/**
 * by Gleiser Wesley
 * Tela de Login que permite ao usuário autenticar-se com email e senha.
 * Armazena o token de autenticação no AsyncStorage em caso de sucesso.
 *
 * @param {object} navigation - Objeto de navegação para redirecionamento de tela.
 */
export default function LoginScreen({ navigation }) {
  // Estados para armazenar as credenciais de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Função de login.
   * Envia uma requisição POST com as credenciais do usuário e armazena o token de autenticação
   * no AsyncStorage em caso de sucesso.
   */
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token); // Armazena o token localmente
      Alert.alert("Login bem-sucedido!");
      navigation.navigate('Users'); // Redireciona para a tela de usuários
    } catch (error) {
      Alert.alert("Erro de autenticação", "Verifique as credenciais e tente novamente.");
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/vetores-gratis/padrao-forrado-de-neon-verde-em-um-vetor-de-fundo-de-historia-social-escuro_53876-173385.jpg?t=st=1730327946~exp=1730331546~hmac=bea4c5f2d622b5ef3313e1d7148d4c3e405b7c50c9068bef3646e96f41a0dfad&w=740' }} // URL da imagem de fundo
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Título de boas-vindas */}
        <Text style={styles.title}>Bem-vindo de Volta</Text>

        {/* Subtítulo com instrução de login */}
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        {/* Campo de entrada para o email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        {/* Campo de entrada para a senha */}
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {/* Botão de login */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Define o modo de redimensionamento da imagem de fundo
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo preto translúcido para contraste com o texto
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#5D5FEF',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
