import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import StudentList from './pages/StudentList';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import CourseList from './pages/CourseList';
import Settings from './pages/Settings';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import Register from './pages/Register';
import Logout from './pages/Logout';
import CourseForm from './components/course/CourseForm';
import Course from './components/course/Course';
import LessonForm from './components/lesson/LessonForm';
import Lesson from './components/lesson/Lesson';

// Handles rerouting to designated component based on URL path.
const routes = (isLoggedIn) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Login />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'students', element: <StudentList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'courses', element: <CourseList /> },
      { path: 'create-course', element: <CourseForm /> },
      { path: 'course/:id', element: <Course /> },
      { path: 'lesson', element: <Lesson /> },
      { path: 'create-lesson/:id', element: <LessonForm /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'logout', element: <Logout /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
