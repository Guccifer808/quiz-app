import { Box, Heading, Flex } from '@chakra-ui/react';
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
    <>
      <Box bg='white' width='100%'>
        <Box mb={6} fontSize='md' fontWeight='bold' textTransform='uppercase'>
          Your progress: {questionNumber}/{totalQuestions}
        </Box>
        {/* category */}
        <Box>{category}</Box>
        <Heading>
          <Box>{questions}</Box>
        </Heading>
        <Flex>
          <Box>
            {/* Buttons */}
            <CustomButton
              value='False'
              colorScheme='orange'
              variant='outline'
              width='full'
              onClick={callback}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default QCard;
