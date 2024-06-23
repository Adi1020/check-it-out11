import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './app/contexts/themeContext';
import LoginScreen from './app/screens/loginScreen';
import HomeScreen from './app/screens/homeScreen';
import ProfileScreen from './app/screens/profileScreen';
import ListDetails from './app/screens/listDetails';
import SignUpScreen from './app/screens/signUpScreen';
import StatisticsScreen from './app/screens/statisticsScreen';
import RecipesScreen from './app/screens/recipesScreen';
import PeacefulZoneScreen from './app/screens/peacefulZoneScreen';
import { auth, logout } from './app/utils/auth';
import { getSession, clearSession } from './app/utils/session';
import ForgotPasswordScreen from './app/screens/forgotPasswordScreen'; 

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const user = getSession();
    if (user) {
      auth.onAuthStateChanged((firebaseUser) => {
        if (!firebaseUser) {
          auth.signInWithCustomToken(user.token).catch(clearSession);
        }
      });
    } else {
      clearSession();
    }

    const sessionExpiryCheck = setInterval(() => {
      const session = getSession();
      if (!session) {
        logout();
        clearSession();
      }
    }, 1000);

    return () => clearInterval(sessionExpiryCheck);
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListDetails"
            component={ListDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Recipes"
            component={RecipesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PeacefulZone"
            component={PeacefulZoneScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

