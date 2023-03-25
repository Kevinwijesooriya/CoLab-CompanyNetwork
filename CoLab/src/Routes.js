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
import QuestionsScreen from './screens/QnA/QuestionsScreen';
import QuestionScreen from './screens/QnA/QuestionScreen';
import AddQuestionScreen from './screens/QnA/AddQuestionScreen';
import UpdateQuestionScreen from './screens/QnA/UpdateQuestionScreen';
import AddAnswersScreen from './screens/QnA/Answer/AddAnswersScreen';
// import AddAnswersScreen from './screens/QnA/Answer/AddAnswersScreen';
import AddPostScreen from './screens/post/AddPost';
import ViewPostScreen from './screens/post/ViewPost';
import PostScreen from './screens/post/PostScreen';
import UpdatePostScreen from './screens/post/UpdatePost';
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
          component={QuestionsScreen}
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
          name="QuestionsScreen"
          component={QuestionsScreen}
          options={Header}
        />
        <Stack.Screen
          name="UpdateQuestionScreen"
          component={UpdateQuestionScreen}
          options={Header}
        />
      <Stack.Screen
          name="AddQuestionScreen"
          component={AddQuestionScreen}
          options={Header}
        />
      <Stack.Screen
          name="QuestionScreen"
          component={QuestionScreen}
          options={Header}
        />
      <Stack.Screen
          name="AddAnswersScreen"
          component={AddAnswersScreen}
          options={Header}
        />
        {/* <Stack.Screen
          name="AddAnswersScreen"
          component={AddAnswersScreen}
          options={Header}
        /> */}
        <Stack.Screen
          name="AddPostScreen"
          component={AddPostScreen}
          options={Header}
        />
        <Stack.Screen
          name="ViewPostScreen"
          component={ViewPostScreen}
          options={Header}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={Header}
        />
        <Stack.Screen
          name="UpdatePostScreen"
          component={UpdatePostScreen}
          options={Header}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
