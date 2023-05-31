import { Box, Heading, Flex, Spacer } from '@chakra-ui/react';
import { QCardProps } from 'src/interface/index';
import CustomButton from '../CustomButton';

const QCard: React.FC<QCardProps> = ({
  questions,
  category,
  totalQuestions,
  questionNumber,
  callback,
}) => {
  return (
    <div className='quiz'>
      <Box bg='white' width='100%' minH='400px' w={[300, 400]}>
        <Box
          mb={6}
          fontSize='md'
          fontWeight='bold'
          textTransform='uppercase'
          textAlign='center'
        >
          Your progress: {questionNumber}/{totalQuestions}
        </Box>
        {/* category */}
        <Box fontSize='md' mb={4} textAlign='center'>
          Category: {category}
        </Box>
        <Heading>
          <Box textAlign='center' my={10} fontSize='xl' h='100px'>
            <div dangerouslySetInnerHTML={{ __html: questions }}></div>
          </Box>
        </Heading>
        <Flex direction='column'>
          <Box w='100%' mb={4} mt={4}>
            {/* Button 1 */}
            <CustomButton
              value='False'
              colorScheme='orange'
              variant='outline'
              width='full'
              onClick={callback}
            />
          </Box>
          <Spacer />
          <Box w='100%' mb={4}>
            {/* Button 2 */}
            <CustomButton
              value='True'
              colorScheme='orange'
              variant='outline'
              width='full'
              onClick={callback}
            />
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default QCard;
