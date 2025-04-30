import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Header />
      <Container as="main" maxW="container.xl" flex="1" py={8} display="flex" alignItems="center">
        {children}
      </Container>
      <Footer />
    </Box>
  );
};