export default interface QCardProps {
    questions: string;
    category: string;
    totalQuestions?: number;
    questionNumber?: number;
    callback: Function;
}