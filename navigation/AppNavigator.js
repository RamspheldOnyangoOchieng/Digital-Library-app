import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/GlobalStyles';
import LibraryScreen  from '../screens/LibraryScreen';
import AddBookScreen  from '../screens/AddBookScreen';
import AdminScreen    from '../screens/AdminScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'android' ? 8 : 10,
          paddingTop: 8,
          height: Platform.OS === 'android' ? 60 : 68,
        },
        tabBarActiveTintColor:   colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
      }}
    >
      <Tab.Screen name="Library" component={LibraryScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="library"           size={size} color={color} /> }} />
      <Tab.Screen name="AddBook" component={AddBookScreen}
        options={{ tabBarLabel: 'Add Book', tabBarIcon: ({ color, size }) => <Ionicons name="add-circle"        size={size} color={color} /> }} />
      <Tab.Screen name="Admin"   component={AdminScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="shield-checkmark"  size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}