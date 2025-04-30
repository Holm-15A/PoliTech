import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, handleLogout } = useAuth();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Heading as={RouterLink} to="/" size="md">
            PoliTech
          </Heading>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7} alignItems="center">
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              
              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'sm'}
                      name={user.name || undefined}
                      src={user.image || undefined}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={RouterLink} to="/profile">
                      プロフィール
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      ログアウト
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button as={RouterLink} to="/login">
                  ログイン
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};