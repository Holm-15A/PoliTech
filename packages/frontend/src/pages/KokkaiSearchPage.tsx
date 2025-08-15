import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  Badge,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useKokkaiSearch } from '../hooks/useKokkaiSearch';
import { SearchParams } from '../utils/kokkaiApi';

export const KokkaiSearchPage = () => {
  const { register, handleSubmit } = useForm<SearchParams>();
  const { loading, error, data, currentPage, search, nextPage, previousPage } = useKokkaiSearch();

  const onSubmit = (formData: SearchParams) => {
    console.log('検索条件:', formData);
    search(formData);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={6}>国会議事録検索</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>キーワード</FormLabel>
                <Input {...register('any')} placeholder="検索キーワードを入力" />
              </FormControl>
              <FormControl>
                <FormLabel>発言者</FormLabel>
                <Input {...register('speaker')} placeholder="発言者名を入力" />
              </FormControl>
              <FormControl>
                <FormLabel>会議名</FormLabel>
                <Input {...register('nameOfMeeting')} placeholder="会議名を入力" />
              </FormControl>
              <HStack>
                <FormControl>
                  <FormLabel>開始日</FormLabel>
                  <Input {...register('from')} type="date" />
                </FormControl>
                <FormControl>
                  <FormLabel>終了日</FormLabel>
                  <Input {...register('until')} type="date" />
                </FormControl>
              </HStack>
              <Button type="submit" colorScheme="blue" isLoading={loading}>
                検索
              </Button>
            </VStack>
          </form>
        </Box>

        {loading && (
          <Box textAlign="center" py={8}>
            <Spinner size="xl" />
          </Box>
        )}

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {data && (
          <Box>
            {data.numberOfRecords > 0 ? (
              <>
                <Text mb={4}>
                  全{data.numberOfRecords}件中 {data.startRecord}〜
                  {data.startRecord + data.numberOfReturn - 1}件を表示
                </Text>
                
                <VStack spacing={4} align="stretch">
                  {data.speechRecord?.map((record: any) => (
                    <Card key={record.speechID}>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <HStack>
                            <Badge colorScheme="blue">{record.nameOfHouse}</Badge>
                            <Text fontWeight="bold">{record.speaker}</Text>
                            {record.speakerPosition && (
                              <Text color="gray.500">{record.speakerPosition}</Text>
                            )}
                            {record.speakerGroup && (
                              <Badge colorScheme="green">{record.speakerGroup}</Badge>
                            )}
                          </HStack>
                          <Text whiteSpace="pre-wrap">{record.speech}</Text>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.500">
                              {record.nameOfMeeting} ({record.date}) {record.issue}
                            </Text>
                            <HStack>
                              {record.meetingURL && (
                                <Button
                                  as="a"
                                  href={record.meetingURL}
                                  target="_blank"
                                  size="sm"
                                  variant="outline"
                                >
                                  会議録を見る
                                </Button>
                              )}
                              {record.speechURL && (
                                <Button
                                  as="a"
                                  href={record.speechURL}
                                  target="_blank"
                                  size="sm"
                                  variant="outline"
                                >
                                  発言を見る
                                </Button>
                              )}
                            </HStack>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>

                {data.nextRecordPosition > 0 && (
                  <HStack justifyContent="center" mt={6} spacing={4}>
                    <Button onClick={previousPage} isDisabled={currentPage <= 1}>
                      前のページ
                    </Button>
                    <Text>ページ {currentPage}</Text>
                    <Button onClick={nextPage}>
                      次のページ
                    </Button>
                  </HStack>
                )}
              </>
            ) : (
              <Alert status="info">
                <AlertIcon />
                検索結果が見つかりませんでした。
              </Alert>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
};