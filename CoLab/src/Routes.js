import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/auth/LoginScreen';
import { firebaseApp } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InitialScreen from './screens/core/InitialScreen';
import CompanyCreateScreen from './screens/auth/CompanyCreateScreen';
import { Header } from './screens/core/components/Header';
import NewMemberScreen from './screens/auth/NewMemberScreen';
import MembersScreen from './screens/members/MembersScreen';
import ProfileScreen from './screens/members/ProfileScreen';
import ViewAllProjects from './screens/projects/ViewAllProjects';
import NewProject from './screens/projects/AddProjectScreen';
import ProjectScreen from './screens/projects/projectScreen';
import UpdateProjectScreen from './screens/projects/UpdateProject';
const Stack = createNativeStackNavigator();

const Routes = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const auth = getAuth(firebaseApp);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  if (loading && user === null) {
    return <InitialScreen />;
  }
  if (!user) {
    return <LoginScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Initial"
          component={ViewAllProjects}
          options={Header}
          //   options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompanyCreateScreen"
          component={CompanyCreateScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="WithHeader"
          component={InitialScreen}
          options={Header}
        />
        <Stack.Screen
          name="NewMemberScreen"
          component={NewMemberScreen}
          options={Header}
        />
        <Stack.Screen
          name="MembersScreen"
          component={MembersScreen}
          options={Header}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={Header}
        />
         <Stack.Screen
          name="ProjectScreen"
          component={ProjectScreen}
          options={Header}
        />
        <Stack.Screen
          name="NewProject"
          component={NewProject}
          options={Header}
        />
        <Stack.Screen
          name="UpdateProjectScreen"
          component={UpdateProjectScreen}
          options={Header}
        />
         <Stack.Screen
          name="ViewAllProjects"
          component={ViewAllProjects}
          options={Header}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
