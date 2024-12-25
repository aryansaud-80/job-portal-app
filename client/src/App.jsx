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

const App = () => {
  const path = useLocation().pathname.split('/')[1];

  return (
    <>
      {path.toLowerCase().trim('') === 'dashboard' ? '' : <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Navigate to = "manage-job"/>} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='manage-job' element={<ManageJob />} />
          <Route path='view-application' element={<ViewApplication />} />
        </Route>
      </Routes>
      {path.toLowerCase().trim('') === 'dashboard' ? '' : <Footer />}
    </>
  );
};
export default App;
