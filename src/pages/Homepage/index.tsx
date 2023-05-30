import { useState, useEffect, FormEvent } from 'react';
import { getQuestions } from 'src/services/fetchQuestions';
import { QCard } from 'src/components/index';
import { Answer, QuestionsProps } from 'src/interface/index';
import { Difficulty, totalQuestions } from 'src/constants/index';
import { Loader } from 'src/components/index';
import { CustomButton } from 'src/components/index';
import { Box, Heading, Divider } from '@chakra-ui/react';

import './index.css';

const Homepage = () => {
  const [questions, setQuestions] = useState<QuestionsProps[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [endQuiz, setEndQuiz] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<Answer[]>([]);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsList = await getQuestions(
        totalQuestions,
        Difficulty.MEDIUM
      );
      setQuestions(questionsList);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const validateAnswer = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (endQuiz) return;
    const selectedAnswer = e.currentTarget.innerText;
    const correct = questions[questionNumber].correct_answer === selectedAnswer;
    if (correct) setResult((prev) => prev + 1);
    // in case user clicked on different answers more than 1 time
    if (userAnswer.length != questionNumber) {
      if (!correct) setResult((prev) => prev - 1);
      const lastIndex = userAnswer.length - 1;
      if (lastIndex >= 0) {
        userAnswer.splice(lastIndex, 1);
        const Answer = {
          question: questions[questionNumber]?.question,
          answer: selectedAnswer,
          correct,
          correctAnswer: questions[questionNumber]?.correct_answer,
        };
        setUserAnswer((prev) => [...prev, Answer]);
      }
      return;
    }
    const Answer = {
      question: questions[questionNumber]?.question,
      answer: selectedAnswer,
      correct,
      correctAnswer: questions[questionNumber]?.correct_answer,
    };
    setUserAnswer((prev) => [...prev, Answer]);
  };
  const startQuizHandler = (): void => {
    setStartQuiz(true);
  };
  const nextQuestion = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const nextQuestion = questionNumber + 1;
    if (totalQuestions === nextQuestion) {
      setEndQuiz(true);
      // return;
    }
    setQuestionNumber(nextQuestion);
  };
  const restartQuiz = (): void => {
    setStartQuiz(false);
    setEndQuiz(false);
    setQuestionNumber(0);
    setResult(0);
    setUserAnswer([]);
  };
  return (
    <>
      <div className='App'>
        {/* Start Quiz */}
        {userAnswer.length === questionNumber &&
        !endQuiz &&
        !loading &&
        !startQuiz ? (
          <>
            <div className='startQuiz'>
              <Box boxShadow='base' p='6' bg='white' maxW='550px' rounded='md'>
                <Heading as='h1' size='lg' mb={4}>
                  Quiz App
                </Heading>
                <p>
                  There are {totalQuestions} questions. Please answer true or
                  false. Good Luck!
                </p>
                <CustomButton
                  variant='solid'
                  colorScheme='orange'
                  value='Start Quiz'
                  onClick={startQuizHandler}
                />
              </Box>
            </div>
          </>
        ) : null}
        {/* Loader */}
        {loading && (
          <div className='loader'>
            <Loader
              thickness='4px'
              speed='0.5s'
              emptyColor='gray.300'
              color='orange'
              size='lg'
            />
          </div>
        )}
        {/* Main Card */}
        {!loading && !endQuiz && startQuiz && (
          <Box p='4' bg='white' maxW='560px' boxShadow='base' rounded='md'>
            <QCard
              questions={questions[questionNumber].question}
              category={questions[questionNumber].category}
              totalQuestions={totalQuestions}
              questionNumber={questionNumber}
              callback={validateAnswer}
            />
            <CustomButton
              disabled={
                userAnswer.length === questionNumber + 1 &&
                questionNumber !== totalQuestions
                  ? ''
                  : 'disabled'
              }
              variant='solid'
              colorScheme='orange'
              value='Next Question'
              width='full'
              className='next-btn'
              onClick={nextQuestion}
            />
          </Box>
        )}
        {endQuiz && (
          <>
            <Box boxShadow='base' p='6' bg='white' maxW='560px' rounded='md'>
              <Box mb={4}>
                <Box as='h3' fontSize='3xl' fontWeight='bold'>
                  End Quiz
                </Box>
                <Box as='h3' fontSize='xl'>
                  Good job! {result}/{totalQuestions}correct answers.
                </Box>
              </Box>
              <Divider />
              {userAnswer.map((answer, index) => (
                <Box key={index}>
                  <div className='answers'>
                    <Box fontSize='md' fontWeight='bold'>
                      Q: {answer.question}
                    </Box>
                    <ul>
                      <li>Your answer: {answer.answer}</li>
                      <li>Corect answer: {answer.correctAnswer}</li>
                    </ul>
                  </div>
                </Box>
              ))}
              <CustomButton
                variant='solid'
                colorScheme='orange'
                value='Restart Quiz'
                width='full'
                onClick={restartQuiz}
              />
            </Box>
          </>
        )}
      </div>
    </>
  );
};

export default Homepage;
