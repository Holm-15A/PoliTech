import { Box, Container, Stack, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box
      bg={'gray.50'}
      color={'gray.700'}
      mt={8}
    >
      <Container
        as={Stack}
        maxW={'container.xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2025 PoliTech. All rights reserved</Text>
      </Container>
    </Box>
  );
};