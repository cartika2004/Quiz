// src/data/questions.ts
export interface Answer {
  text: string;
  correct: boolean;
}

export interface Question {
  questionText: string;
  answers: Answer[];
}

export const questions: Question[] = [
  // React
  {
    questionText: 'Apa fungsi utama dari JSX di dalam React?',
    answers: [
      { text: 'Sebagai pengganti HTML', correct: false },
      { text: 'Ekstensi sintaks untuk menulis elemen UI di JavaScript', correct: true },
      { text: 'Untuk melakukan styling pada komponen', correct: false },
      { text: 'Bahasa template khusus untuk server-side rendering', correct: false },
    ],
  },
  {
    questionText: 'Hook manakah yang digunakan untuk menangani "side effects" seperti fetch data?',
    answers: [
      { text: 'useState', correct: false },
      { text: 'useContext', correct: false },
      { text: 'useEffect', correct: true },
      { text: 'useReducer', correct: false },
    ],
  },
  {
    questionText: 'Bagaimana cara mengirim data dari komponen Induk (Parent) ke komponen Anak (Child)?',
    answers: [
      { text: 'Melalui State', correct: false },
      { text: 'Melalui Props', correct: true },
      { text: 'Melalui Redux', correct: false },
      { text: 'Melalui Event Emitter', correct: false },
    ],
  },
  {
    questionText: 'Apa itu "Virtual DOM"?',
    answers: [
      { text: 'Representasi DOM di dalam memori untuk optimasi performa', correct: true },
      { text: 'Versi DOM yang lebih cepat dan ada di server', correct: false },
      { text: 'Sebuah library eksternal untuk React', correct: false },
      { text: 'DOM asli yang disembunyikan oleh browser', correct: false },
    ],
  },
  {
    questionText: 'Manakah dari berikut ini yang merupakan "controlled component" di React?',
    answers: [
      { text: 'Komponen yang nilainya diatur oleh DOM itu sendiri', correct: false },
      { text: 'Komponen yang tidak bisa diubah', correct: false },
      { text: 'Komponen yang menggunakan `useRef` untuk mendapatkan nilai', correct: false },
      { text: 'Komponen form yang nilainya dikontrol oleh state React', correct: true },
    ],
  },
  // TypeScript
  {
    questionText: 'Apa keuntungan utama menggunakan TypeScript dibandingkan JavaScript biasa?',
    answers: [
      { text: 'Membuat kode berjalan lebih cepat di browser', correct: false },
      { text: 'Menambahkan "static typing" untuk mengurangi bug saat development', correct: true },
      { text: 'Memiliki lebih banyak library bawaan', correct: false },
      { text: 'Bisa di-compile ke bahasa lain selain JavaScript', correct: false },
    ],
  },
  {
    questionText: 'Tipe `any` di TypeScript menandakan...',
    answers: [
      { text: 'Sebuah error karena tipe tidak valid', correct: false },
      { text: 'Hanya tipe data angka yang diizinkan', correct: false },
      { text: 'Tipe data yang tidak diketahui (unknown)', correct: false },
      { text: 'Tipe data apa saja boleh digunakan (mematikan type checking)', correct: true },
    ],
  },
  {
    questionText: 'Bagaimana cara mendefinisikan properti opsional dalam sebuah `interface`?',
    answers: [
      { text: 'menggunakan tanda tanya (?) setelah nama properti', correct: true },
      { text: 'menggunakan kata kunci `optional`', correct: false },
      { text: 'menggunakan tanda bintang (*)', correct: false },
      { text: 'menggunakan tanda seru (!)', correct: false },
    ],
  },
  {
    questionText: 'Apa fungsi dari `enum` di TypeScript?',
    answers: [
      { text: 'Untuk membuat alias tipe data', correct: false },
      { text: 'Memberi nama yang lebih mudah dibaca untuk sekumpulan nilai konstan', correct: true },
      { text: 'Untuk melakukan iterasi pada objek', correct: false },
      { text: 'Untuk membuat tipe data baru dari tipe yang sudah ada', correct: false },
    ],
  },
  {
    questionText: 'Apa itu "Generics" di TypeScript?',
    answers: [
      { text: 'Sebuah fitur untuk menghasilkan dokumentasi otomatis', correct: false },
      { text: 'Tipe data khusus untuk angka', correct: false },
      { text: 'Cara untuk membuat komponen atau fungsi yang dapat bekerja dengan berbagai tipe data', correct: true },
      { text: 'Sebuah library untuk validasi tipe', correct: false },
    ],
  },
  // Vite & Tailwind
  {
    questionText: 'Apa keunggulan utama Vite dibandingkan build tool seperti Webpack?',
    answers: [
      { text: 'Development server yang jauh lebih cepat berkat native ES modules', correct: true },
      { text: 'Ukuran bundle produksi yang selalu lebih kecil', correct: false },
      { text: 'Dukungan TypeScript yang lebih baik', correct: false },
      { text: 'Integrasi yang lebih baik dengan semua framework backend', correct: false },
    ],
  },
  {
    questionText: 'Perintah apa yang digunakan untuk memulai development server Vite?',
    answers: [
      { text: 'npm start', correct: false },
      { text: 'npm run serve', correct: false },
      { text: 'npm run dev', correct: true },
      { text: 'npm build', correct: false },
    ],
  },
  {
    questionText: 'Konsep "utility-first" pada Tailwind CSS berarti...',
    answers: [
      { text: 'Memprioritaskan fungsi utilitas JavaScript di atas styling', correct: false },
      { text: 'Menulis style dengan class-class kecil yang punya satu fungsi', correct: true },
      { text: 'Menggunakan file CSS terpisah untuk setiap komponen', correct: false },
      { text: 'Membuat komponen UI yang sudah jadi (seperti Bootstrap)', correct: false },
    ],
  },
  {
    questionText: 'Bagaimana cara menerapkan style responsif untuk layar medium (md) ke atas di Tailwind?',
    answers: [
      { text: 'menulis di dalam blok `@media (min-width: 768px)`', correct: false },
      { text: 'menggunakan file `md.css` terpisah', correct: false },
      { text: 'menggunakan prefix `md:` pada class utility (cth: md:text-lg)', correct: true },
      { text: 'menambahkan atribut `responsive="md"` pada elemen', correct: false },
    ],
  },
  {
    questionText: 'File mana yang digunakan untuk mengkustomisasi tema default Tailwind (misal: warna, font)?',
    answers: [
      { text: 'postcss.config.js', correct: false },
      { text: 'src/index.css', correct: false },
      { text: 'vite.config.ts', correct: false },
      { text: 'tailwind.config.js', correct: true },
    ],
  },
  // RHF & Yup
  {
    questionText: 'Apa fungsi dari `yupResolver` di React Hook Form?',
    answers: [
      { text: 'Sebagai "jembatan" antara skema validasi Yup dan React Hook Form', correct: true },
      { text: 'Untuk menyelesaikan promise dari Yup', correct: false },
      { text: 'Untuk membuat skema validasi Yup secara otomatis', correct: false },
      { text: 'Untuk mengubah tipe data Yup menjadi tipe RHF', correct: false },
    ],
  },
  {
    questionText: 'Hook RHF manakah yang digunakan untuk memantau perubahan nilai input secara real-time?',
    answers: [
      { text: 'useFormState', correct: false },
      { text: 'trigger', correct: false },
      { text: 'getValues', correct: false },
      { text: 'watch', correct: true },
    ],
  },
  {
    questionText: 'Bagaimana cara mendefinisikan sebuah string yang wajib diisi di dalam skema Yup?',
    answers: [
      { text: 'yup.string().required()', correct: true },
      { text: 'yup.string().optional()', correct: false },
      { text: 'yup.string().needed()', correct: false },
      { text: 'yup.string().mustExist()', correct: false },
    ],
  },
  {
    questionText: 'Apa fungsi dari method `reset()` yang didapat dari `useForm`?',
    answers: [
      { text: 'Untuk me-refresh komponen form', correct: false },
      { text: 'Mengembalikan semua nilai field ke `defaultValues`', correct: true },
      { text: 'Untuk membatalkan submit terakhir', correct: false },
      { text: 'Untuk menghapus semua input dari DOM', correct: false },
    ],
  },
  {
    questionText: 'Kapan Anda sebaiknya menggunakan komponen `<Controller>` dari React Hook Form?',
    answers: [
      { text: 'Untuk semua jenis input agar lebih rapi', correct: false },
      { text: 'Hanya untuk input tipe checkbox dan radio', correct: false },
      { text: 'Saat bekerja dengan library UI eksternal yang inputnya tidak standar', correct: true },
      { text: 'Saat ingin mengontrol form secara manual tanpa state', correct: false },
    ],
  },
  // JavaScript
  {
    questionText: 'Apa perbedaan mendasar antara `let` dan `const`?',
    answers: [
      { text: '`let` adalah global, `const` adalah lokal', correct: false },
      { text: '`let` untuk string, `const` untuk angka', correct: false },
      { text: 'Variabel `const` tidak bisa di-assign ulang nilainya', correct: true },
      { text: 'Tidak ada perbedaan, hanya preferensi gaya penulisan', correct: false },
    ],
  },
  {
    questionText: 'Fungsi `async/await` digunakan untuk...',
    answers: [
      { text: 'Menyederhanakan penulisan kode asynchronous yang menggunakan Promise', correct: true },
      { text: 'Membuat kode berjalan secara paralel di banyak thread', correct: false },
      { text: 'Menggantikan fungsi `setTimeout` dan `setInterval`', correct: false },
      { text: 'Menjalankan fungsi secara sinkron dan memblokir thread utama', correct: false },
    ],
  },
  {
    questionText: 'Apa yang dihasilkan oleh method `.map()` pada sebuah array?',
    answers: [
      { text: 'Tidak ada, method ini hanya memodifikasi array asli', correct: false },
      { text: 'Sebuah nilai boolean tunggal (true jika semua elemen lolos)', correct: false },
      { text: 'Jumlah elemen di dalam array', correct: false },
      { text: 'Array baru hasil dari operasi pada setiap elemen', correct: true },
    ],
  },
  {
    questionText: 'Operator `===` (triple equals) di JavaScript memeriksa...',
    answers: [
      { text: 'Hanya nilai (value)', correct: false },
      { text: 'Nilai (value) dan Tipe data (type)', correct: true },
      { text: 'Hanya tipe data (type)', correct: false },
      { text: 'Apakah kedua variabel menunjuk ke referensi memori yang sama', correct: false },
    ],
  },
  {
    questionText: 'Apa itu "destructuring" di JavaScript?',
    answers: [
      { text: 'Sintaks untuk "membongkar" nilai dari array atau properti dari objek ke variabel terpisah', correct: true },
      { text: 'Cara untuk menghancurkan sebuah objek dari memori', correct: false },
      { text: 'Proses mengubah struktur data dari JSON ke XML', correct: false },
      { text: 'Fungsi untuk mengurangi ukuran bundle aplikasi', correct: false },
    ],
  },
  // Umum
  {
    questionText: 'Apa fungsi dari perintah `git clone`?',
    answers: [
      { text: 'Untuk membuat branch baru dari branch master', correct: false },
      { text: 'Untuk mengunggah perubahan lokal ke remote repository', correct: false },
      { text: 'Membuat salinan lokal dari sebuah remote repository', correct: true },
      { text: 'Untuk menggabungkan dua repository yang berbeda', correct: false },
    ],
  },
  {
    questionText: 'HTTP status code `404` berarti...',
    answers: [
      { text: 'OK', correct: false },
      { text: 'Unauthorized', correct: false },
      { text: 'Internal Server Error', correct: false },
      { text: 'Not Found (Sumber daya tidak ditemukan)', correct: true },
    ],
  },
  {
    questionText: 'Apa kepanjangan dari API dalam konteks pengembangan web?',
    answers: [
      { text: 'Application Programming Interface', correct: true },
      { text: 'Advanced Programming Interface', correct: false },
      { text: 'Automated Program Interaction', correct: false },
      { text: 'Applied Programming Initiative', correct: false },
    ],
  },
  {
    questionText: 'Apa itu "CSS Box Model"?',
    answers: [
      { text: 'Sebuah library CSS untuk layouting', correct: false },
      { text: 'Konsep bahwa setiap elemen HTML adalah kotak yang terdiri dari margin, border, padding, dan content', correct: true },
      { text: 'Model untuk membuat bentuk 3D dengan CSS', correct: false },
      { text: 'Kerangka kerja untuk mengatur kotak-kotak di dalam grid', correct: false },
    ],
  },
  {
    questionText: 'Tag HTML manakah yang paling tepat untuk sebuah konten mandiri yang bisa didistribusikan ulang (seperti postingan blog)?',
    answers: [
      { text: '<div>', correct: false },
      { text: '<blockquote>', correct: false },
      { text: '<section>', correct: false },
      { text: '<article>', correct: true },
    ],
  },
];
