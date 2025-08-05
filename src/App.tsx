// src/App.tsx
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import type { SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog } from '@headlessui/react';
import { questions } from './data/questions';
import { QuestionCard } from './components/QuestionCard';

// --- Tipe dan Skema untuk Form Registrasi ---
type RegistrationFormValues = {
  name: string;
  email: string;
};

const registrationSchema = yup.object().shape({
  name: yup.string().required('Nama tidak boleh kosong'),
  email: yup.string().email('Format email tidak valid').required('Email tidak boleh kosong'),
});

// --- Tipe dan Skema untuk Form Ujian ---
export type QuizFormValues = {
  questions: string[];
};

const quizSchema = yup.object().shape({
  questions: yup.array().of(yup.string().required('Pertanyaan ini harus dijawab')).default([]).length(questions.length),
});

const quizResolver: Resolver<QuizFormValues> = yupResolver(quizSchema);
const UJIAN_DURATION = 600; 

// Komponen untuk Form Registrasi
const RegistrationForm = ({ onRegister }: { onRegister: (data: RegistrationFormValues) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
  });

  return (
    <div className="bg-slate-900 min-h-screen w-full flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onRegister)} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-center text-slate-800">Registrasi Ujian</h1>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            <p className="mt-1 text-sm text-red-600">{errors.name?.message}</p>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Alamat Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Lanjut
          </button>
        </form>
      </div>
    </div>
  );
};


// Komponen Utama Aplikasi
export default function App() {
  type AppStage = 'register' | 'start' | 'quiz' | 'result';
  const [stage, setStage] = useState<AppStage>('register');
  const [userName, setUserName] = useState('');

  const [isResultModalOpen, setResultModalOpen] = useState(false);
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(UJIAN_DURATION);

  const quizMethods = useForm<QuizFormValues>({
    resolver: quizResolver,
    defaultValues: { questions: [] },
  });

  const watchedQuestions = quizMethods.watch('questions');
  const answeredCount = Array.isArray(watchedQuestions) ? watchedQuestions.filter(Boolean).length : 0;
  const progressPercentage = (answeredCount / questions.length) * 100;

  const calculateAndSubmit = (data: Partial<QuizFormValues>) => {
    if (stage === 'result') return;

    let score = 0;
    setStage('result');

    if (Array.isArray(data.questions)) {
      data.questions.forEach((selectedAnswer, index) => {
        if (questions[index]?.answers.find(a => a.correct)?.text === selectedAnswer) {
          score++;
        }
      });
    }
    setFinalScore(score);
    setResultModalOpen(true);
  };

  useEffect(() => {
    if (stage !== 'quiz') return;
    if (timeLeft <= 0) {
      calculateAndSubmit(quizMethods.getValues());
      return;
    }
    const intervalId = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, stage, quizMethods]);

  const onQuizSubmit: SubmitHandler<QuizFormValues> = (data) => {
    calculateAndSubmit(data);
  };

  const handleAttemptSubmit = () => {
    const currentAnswers = quizMethods.getValues('questions');
    const unanswered = questions.length - currentAnswers.filter(Boolean).length;
    setUnansweredCount(unanswered);
    if (unanswered > 0) {
      setWarningModalOpen(true);
    } else {
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmSubmit = () => {
    setConfirmModalOpen(false);
    quizMethods.handleSubmit(onQuizSubmit)();
  };

  const handleRegister = (data: RegistrationFormValues) => {
    setUserName(data.name);
    setStage('start');
  };

  const handleStartQuiz = () => {
    setStage('quiz');
  };

  const handleRestart = () => {
    quizMethods.reset();
    setFinalScore(0);
    setResultModalOpen(false);
    setTimeLeft(UJIAN_DURATION);
    setStage('register'); 
    setUserName('');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (stage === 'register') {
    return <RegistrationForm onRegister={handleRegister} />;
  }

  return (
    <FormProvider {...quizMethods}>
      <div className="bg-slate-900 min-h-screen w-full flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-3xl space-y-4">
          <div className="bg-white/10 p-4 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-extrabold text-white">Ujian Interaktif</h1>
              {stage === 'quiz' && (
                <div className="text-xl font-bold text-white bg-purple-600 px-3 py-1 rounded-lg">
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-right text-sm text-slate-300 mt-1">{answeredCount} / {questions.length} terjawab</p>
          </div>
          <form>
            <fieldset disabled={stage !== 'quiz'} className="space-y-6">
              {questions.map((q, index) => (
                <QuestionCard key={index} question={q} index={index} />
              ))}
              <button type="button" onClick={handleAttemptSubmit} className="w-full bg-purple-600 text-white font-bold text-xl py-4 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed">
                Selesai!
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      {/* Pop-out Awal Ujian */}
      <Dialog open={stage === 'start'} onClose={() => {}} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl text-center">
            <Dialog.Title className="text-2xl font-bold text-slate-800">Selamat Datang, {userName}!</Dialog.Title>
            <p className="mt-4 text-slate-600">Anda memiliki waktu <strong>{formatTime(UJIAN_DURATION)}</strong> untuk menyelesaikan ujian. Waktu akan dimulai saat Anda menekan tombol di bawah.</p>
            <button onClick={handleStartQuiz} className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600">Mulai Ujian</button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Pop-out Peringatan & Konfirmasi */}
      <Dialog open={isWarningModalOpen} onClose={() => setWarningModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl text-center">
            <Dialog.Title className="text-2xl font-bold text-yellow-500">Perhatian!</Dialog.Title>
            <p className="mt-4 text-slate-600">Masih ada <strong>{unansweredCount} soal</strong> yang belum terisi. Harap lengkapi jawaban Anda atau tunggu waktu habis.</p>
            <button onClick={() => setWarningModalOpen(false)} className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-600">Kembali Mengerjakan</button>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog open={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl text-center">
            <Dialog.Title className="text-2xl font-bold text-blue-600">Konfirmasi</Dialog.Title>
            <p className="mt-4 text-slate-600">Semua soal sudah terisi. Yakin ingin mengumpulkan ujian?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button onClick={() => setConfirmModalOpen(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-bold hover:bg-gray-300">Batal</button>
              <button onClick={handleConfirmSubmit} className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700">Ya, Kumpulkan</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Pop-out Hasil Ujian */}
      <Dialog open={isResultModalOpen} onClose={handleRestart} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
            <Dialog.Title className="text-3xl font-bold text-slate-800">{timeLeft <= 0 ? "Waktu Habis!" : "Hasil Ujian"}</Dialog.Title>
            <p className="mt-4 text-xl text-slate-600">Skor Anda:</p>
            <p className="text-7xl font-extrabold my-4 text-purple-600">{finalScore} / {questions.length}</p>
            <button onClick={handleRestart} className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700">Coba Lagi</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </FormProvider>
  );
}
