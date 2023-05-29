import { useState, useEffect } from 'react';
import { getQuestions } from 'src/services/fetchQuestions';
import QCard from 'src/components/QCard';
import { QuestionsProps } from 'src/interface/index';
import { Difficulty, totalQuestions } from 'src/constants/index';

const Homepage = () => {
  const [questions, setQuestions] = useState<QuestionsProps[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [startQuiz, setStartQuis] = useState<boolean>(false);
  const [endQuiz, setEndQuiz] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsList = await getQuestions(
        totalQuestions,
        Difficulty.MEDIUM
      );
      setQuestions(questionsList);
    };
    fetchQuestions();
  }, []);

  const validateAnswer = () => {
    setQuestionNumber(1);
  };
  return (
    <>
      {!loading && !endQuiz && startQuiz && (
        <QCard
          questions={questions[questionNumber].question}
          category={questions[questionNumber].category}
          totalQuestions={totalQuestions}
          questionNumber={questionNumber}
          callback={validateAnswer}
        />
      )}
      {!startQuiz && <>Start</>}
    </>
  );
};

export default Homepage;
