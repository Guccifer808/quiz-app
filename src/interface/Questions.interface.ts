export default interface QuestionsProps {
    question: string;
    category: string;
    callback: Function;
    totalQuestions: number;
    questionNumber: number;
    correct_answer: string;

}