import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: '',
  });
  const [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loginRecruiterData, setLoginRecruiterData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${BACKEND_URL}/api/v1/job/get-jobs`);

      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message || 'An error occurred'); ;
    }
  };

  const getRecruiterData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(
        `${BACKEND_URL}/api/v1/company/get-company-data`
      );

      if (data.success) {
        setLoginRecruiterData(data.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getLoginStatusFromLocalStorage = () => {
    const isLogin = localStorage.getItem('isLogin');
    // console.log(isLogin);
    if (isLogin) {
      setIsRecruiterLoggedIn(true);
    }
  };

  useEffect(() => {
    getLoginStatusFromLocalStorage();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (isRecruiterLoggedIn) {
      getRecruiterData();
    }
  }, [isRecruiterLoggedIn]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    BACKEND_URL,
    loginRecruiterData,
    setLoginRecruiterData,
    isRecruiterLoggedIn,
    setIsRecruiterLoggedIn,
    isLoading,
    setIsLoading,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
