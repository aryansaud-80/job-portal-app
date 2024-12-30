import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isRecruiterLoggedIn } = useContext(AppContext);

  if (!isRecruiterLoggedIn) {
    return <Navigate to={'/'} />;
  }
  return children;
};
export default PrivateRoute;
