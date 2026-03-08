import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { LibraryProvider } from './context/LibraryContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <LibraryProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </LibraryProvider>
  );
}