import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isRecruiterLoggedIn, isLoaded } = useContext(AppContext);

  // console.log(isRecruiterLoggedIn);

  if (isLoaded) {
    return null;
  }

  if (isRecruiterLoggedIn !== true) {
    return <Navigate to='/' />;
  }
  return children;
};
export default PrivateRoute;
