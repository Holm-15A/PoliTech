import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaTwitter, FaApple } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';
import { useSearchParams } from 'react-router-dom';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const handleSocialLogin = (provider: string) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  };

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'auth_error':
        return '認証中にエラーが発生しました。もう一度お試しください。';
      case 'auth_failed':
        return '認証に失敗しました。もう一度お試しください。';
      default:
        return '';
    }
  };

  return (
    <Container maxW="md" py={{ base: 12, md: 24 }}>
      <Stack spacing={8}>
        <Stack spacing={6} textAlign="center">
          <Heading fontSize={{ base: '2xl', md: '3xl' }}>
            アカウント作成
          </Heading>
          <Text color={'gray.600'}>
            PoliTechへようこそ
          </Text>
        </Stack>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {getErrorMessage(error)}
          </Alert>
        )}

        <Box
          py={8}
          px={10}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'lg'}
          rounded={'xl'}
        >
          <Stack spacing={4}>
            <Button
              w={'full'}
              colorScheme="blue"
              leftIcon={<FaGoogle />}
              onClick={() => handleSocialLogin('google')}
            >
              Googleでログイン
            </Button>
            <Button
              w={'full'}
              bg="#3b5998"
              color="white"
              _hover={{ bg: '#4c70ba' }}
              leftIcon={<FaFacebook />}
              onClick={() => handleSocialLogin('facebook')}
            >
              Facebookでログイン
            </Button>
            <Button
              w={'full'}
              bg="#1DA1F2"
              color="white"
              _hover={{ bg: '#1a91da' }}
              leftIcon={<FaTwitter />}
              onClick={() => handleSocialLogin('twitter')}
            >
              X（Twitter）でログイン
            </Button>
            <Button
              w={'full'}
              bg="#00B900"
              color="white"
              _hover={{ bg: '#00A000' }}
              leftIcon={<SiLine />}
              onClick={() => handleSocialLogin('line')}
            >
              LINEでログイン
            </Button>
            <Button
              w={'full'}
              bg="black"
              color="white"
              _hover={{ bg: 'gray.800' }}
              leftIcon={<FaApple />}
              onClick={() => handleSocialLogin('apple')}
            >
              Appleでログイン
            </Button>

            <Stack spacing={4} pt={4}>
              <Divider />
              <Text fontSize="sm" textAlign="center" color="gray.500">
                アカウントを作成すると、利用規約とプライバシーポリシーに同意したことになります
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};