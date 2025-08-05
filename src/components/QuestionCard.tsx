// src/components/QuestionCard.tsx
import { useFormContext } from 'react-hook-form';
import type { Question } from '../data/questions';
import type { FormValues } from '../App';

// Mendefinisikan props yang diterima oleh komponen ini
interface QuestionCardProps {
  question: Question;
  index: number;
}

const optionStyles = [
  { bg: 'bg-red-500', hover: 'hover:bg-red-600' },
  { bg: 'bg-blue-500', hover: 'hover:bg-blue-600' },
  { bg: 'bg-yellow-400', hover: 'hover:bg-yellow-500' },
  { bg: 'bg-green-500', hover: 'hover:bg-green-600' },
];

const optionIcons = [
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z" /></svg>,
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 10-10 10L2 12 12 2z" /></svg>,
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>,
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><rect width="20" height="20" x="2" y="2" rx="2" ry="2" /></svg>
];

export const QuestionCard = ({ question, index }: QuestionCardProps) => {
  // Memberikan tipe eksplisit ke useFormContext
  const { register, formState: { errors } } = useFormContext<FormValues>();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <p className="font-bold text-xl text-slate-800 mb-6 text-center">{question.questionText}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.answers.map((answer, ansIndex) => {
          const style = optionStyles[ansIndex % 4];
          const icon = optionIcons[ansIndex % 4];
          return (
            <label
              key={answer.text}
              className={`group flex items-center justify-between w-full text-left p-4 rounded-lg text-white font-bold transition-all duration-200 cursor-pointer transform hover:-translate-y-1 has-[:checked]:ring-4 has-[:checked]:ring-white has-[:checked]:ring-offset-2 has-[:checked]:ring-offset-slate-300 has-[:checked]:scale-105 ${style.bg} ${style.hover}`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">{icon}</div>
                <span className="ml-4 text-lg">{answer.text}</span>
              </div>
              
              {/* Indikator centang yang hanya muncul saat dipilih */}
              <div className="opacity-0 group-has-[:checked]:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>

              <input
                type="radio"
                value={answer.text}
                {...register(`questions.${index}` as `questions.${number}`)}
                className="absolute opacity-0 w-0 h-0" 
              />
            </label>
          );
        })}
      </div>
      {errors.questions?.[index] && <p className="text-red-600 text-center text-sm mt-4 font-medium">{errors.questions[index]?.message}</p>}
    </div>
  );
};
