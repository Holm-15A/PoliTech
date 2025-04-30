import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          政治を
          <Text as={'span'} color={'blue.400'}>
            もっとオープンに
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          PoliTechは、政治をよりオープンで透明性の高いものにすることを目指すプラットフォームです。
          私たちは、テクノロジーの力を活用して、市民と政治をつなぎ、より良い社会の実現に貢献します。
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
        >
          <Button
            as={RouterLink}
            to="/login"
            colorScheme={'blue'}
            bg={'blue.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'blue.500',
            }}
          >
            はじめる
          </Button>
          <Button
            variant={'link'}
            colorScheme={'blue'}
            size={'sm'}
            onClick={() => {
              const element = document.getElementById('about');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            詳しく見る
          </Button>
        </Stack>
      </Stack>

      <Stack
        id="about"
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        pb={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
          lineHeight={'110%'}
        >
          近日公開予定
        </Heading>
        <Text color={'gray.500'}>
          より詳しい情報は、まもなく公開いたします。
          <br />
          いち早く情報を受け取りたい方は、ぜひアカウントを作成してください。
        </Text>
      </Stack>
    </Container>
  );
};