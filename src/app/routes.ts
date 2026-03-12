import { createBrowserRouter } from 'react-router';
import Root from './Root';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import LessonsScreen from './screens/LessonsScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import DragDropScreen from './screens/DragDropScreen';
import CountingScreen from './screens/CountingScreen';
import ResultScreen from './screens/ResultScreen';
import ProgressScreen from './screens/ProgressScreen';
import RewardsScreen from './screens/RewardsScreen';
import ProfileScreen from './screens/ProfileScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: SplashScreen },
      { path: 'login', Component: LoginScreen },
      { path: 'home', Component: HomeScreen },
      { path: 'lessons', Component: LessonsScreen },
      { path: 'exercise/:lessonId', Component: ExerciseScreen },
      { path: 'dragdrop', Component: DragDropScreen },
      { path: 'counting', Component: CountingScreen },
      { path: 'result', Component: ResultScreen },
      { path: 'progress', Component: ProgressScreen },
      { path: 'rewards', Component: RewardsScreen },
      { path: 'profile', Component: ProfileScreen },
    ],
  },
]);
