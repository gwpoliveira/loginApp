import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import UsersScreen from './screens/UsersScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import EditUserScreen from './screens/EditUserScreen';
import DeleteUserScreen from './screens/DeleteUserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="UserDetail" component={UserDetailScreen} />
        <Stack.Screen name="EditUser" component={EditUserScreen} />
        <Stack.Screen name="DeleteUser" component={DeleteUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
