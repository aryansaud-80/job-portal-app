import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AddJob from './components/AddJob';
import ManageJob from './components/ManageJob';
import ViewApplication from './components/ViewApplication';
import { Bounce, ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const path = useLocation().pathname.split('/')[1];

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='light'
        transition={Bounce}
      />
      {path.toLowerCase().trim('') === 'dashboard' ? '' : <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to='manage-job' />} />
          <Route
            path='add-job'
            element={
              <PrivateRoute>
                <AddJob />
              </PrivateRoute>
            }
          />
          <Route
            path='manage-job'
            element={
              <PrivateRoute>
                <ManageJob />
              </PrivateRoute>
            }
          />
          <Route
            path='view-application'
            element={
              <PrivateRoute>
                <ViewApplication />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      { <Footer />}
    </>
  );
};
export default App;
