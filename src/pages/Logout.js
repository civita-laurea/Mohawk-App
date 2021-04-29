import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { auth } from '../firebase';

// Logs the user out from the system.
export default function Logout() {
  const navigate = useNavigate();

  auth
    .signOut()
    .then(() => {
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
    });

  return <Login />;
}
