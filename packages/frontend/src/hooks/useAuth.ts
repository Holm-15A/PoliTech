import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../store';
import { setUser, setError, logout, setLoading } from '../store/authSlice';

// axiosのデフォルト設定を追加
axios.defaults.withCredentials = true;

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`);
      dispatch(setUser(response.data));
    } catch (error) {
      dispatch(setError('認証に失敗しました'));
      navigate('/login');
    }
  };

  return {
    user,
    isLoading,
    error,
    handleLogout,
    checkAuthStatus,
  };
};