import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const bg = useColorModeValue('white', 'gray.800');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box bg={bg} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link as={RouterLink} to="/" fontWeight="bold" fontSize="xl">
          PoliTech
        </Link>

        <Flex alignItems="center">
          <Stack direction="row" spacing={4}>
            <Link as={RouterLink} to="/kokkai-search">
              国会議事録検索
            </Link>
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="ghost">
                ログアウト
              </Button>
            ) : (
              <Button as={RouterLink} to="/login" variant="ghost">
                ログイン
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};