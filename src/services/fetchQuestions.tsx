import axios from 'axios';

const url =
  // 'https://opentdb.com/api.php?amount=10&category=28&difficulty=medium&type=boolean';
  'https://opentdb.com/api.php?amount=';

export const getQuestions = async (
  amount: number,
  difficulty: string
): Promise<any> => {
  try {
    const res = await axios.get(
      `${url}+${amount}&difficulty=${difficulty}&type=boolean`
    );
    return res.data.results;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
