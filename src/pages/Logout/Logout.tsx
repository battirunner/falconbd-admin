import axios from 'axios';
import { useAppDispatch } from './../../Redux/hooks';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import Loader from '../../common/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCredentials } from '../../Redux/slices/authSlice';

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [error, setError] = useState(location.state?.error || '');
  const logoutFunction = async () => {
    try {
      // await logoutApiCall().unwrap();
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/logout`,
        {},
        { withCredentials: true },
      );
      setLoading(false);
      dispatch(clearCredentials(''));
      if (error !== '') {
        message.info(error);
      } else {
        message.success('Logged out!');
      }
      navigate('/auth/signin');
    } catch (error) {
      dispatch(clearCredentials(''));
      setLoading(false);
      //@ts-ignore
      if (error?.response?.data?.errors) {
        //@ts-ignore
        message.error(error?.response?.data?.errors);
      } else {
        //@ts-ignore
        message.error(error.message);
      }
    }
  };
  useEffect(() => {
    logoutFunction();
  });

  return loading && <Loader />;
};

export default Logout;
