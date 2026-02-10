const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Smart AI breakdown - spesifik & detail, multi-layer keyword matching
function fallbackBreakdown(goal) {
  const g = goal.toLowerCase();
  const tasks = [];

  // ============================================
  // LAYER 1: Topik SANGAT SPESIFIK (prioritas)
  // ============================================

  // --- React Spesifik ---
  if (g.includes('react') && !g.includes('react native')) {
    if (g.includes('hook') || g.includes('usestate') || g.includes('useeffect')) {
      tasks.push('📘 Pahami konsep hooks: fungsi khusus React untuk state & side effects');
      tasks.push('🔧 useState: buat counter sederhana (const [count, setCount] = useState(0))');
      tasks.push('🔧 useState dengan object: form input dengan multiple field');
      tasks.push('🔧 useState dengan array: buat todo list (push, filter, map)');
      tasks.push('⚡ useEffect: fetch data dari API saat komponen mount');
      tasks.push('⚡ useEffect cleanup: clearInterval, unsubscribe, abort controller');
      tasks.push('⚡ useEffect dependency array: [] sekali, [var] saat var berubah');
      tasks.push('📦 useRef: akses DOM element & simpan value tanpa re-render');
      tasks.push('🧩 useContext: sharing data antar komponen tanpa prop drilling');
      tasks.push('🔄 useMemo & useCallback: optimasi performa, hindari re-render');
      tasks.push('🛠️ Custom hooks: buat useLocalStorage, useFetch, useToggle sendiri');
      tasks.push('✅ Mini project: buat app pencarian film dengan useState + useEffect + fetch');
    } else if (g.includes('state') && !g.includes('usestate')) {
      tasks.push('📘 Pahami konsep state: data yang bisa berubah dalam komponen');
      tasks.push('🔧 useState dasar: string, number, boolean');
      tasks.push('🔧 State dengan object: { name: "", email: "" }');
      tasks.push('🔧 State dengan array: tambah, hapus, update item');
      tasks.push('🔄 Lifting state up: kirim state dari child ke parent');
      tasks.push('📦 Props vs State: kapan pakai props, kapan pakai state');
      tasks.push('🧩 Context API: global state tanpa prop drilling');
      tasks.push('⚡ Zustand/Redux: state management untuk app besar');
      tasks.push('🛠️ Latihan: buat shopping cart dengan state management');
    } else if (g.includes('router') || g.includes('routing') || g.includes('navigasi')) {
      tasks.push('📦 Install: npm install react-router-dom');
      tasks.push('🔧 Setup BrowserRouter di main.jsx');
      tasks.push('🗂️ Buat Routes & Route: <Route path="/" element={<Home />} />');
      tasks.push('🔗 Link & NavLink: navigasi tanpa reload halaman');
      tasks.push('🔀 useNavigate: redirect setelah submit form / login');
      tasks.push('📋 useParams: ambil parameter dari URL (/user/:id)');
      tasks.push('🔍 useSearchParams: query string (?search=react)');
      tasks.push('🛡️ Protected Route: halaman hanya bisa diakses kalau login');
      tasks.push('📂 Nested Routes: layout dengan Outlet');
      tasks.push('❌ 404 Page: route untuk halaman tidak ditemukan');
      tasks.push('✅ Latihan: buat app multi-halaman (Home, About, Detail)');
    } else if (g.includes('komponen') || g.includes('component') || g.includes('jsx')) {
      tasks.push('📘 Pahami JSX: HTML di dalam JavaScript');
      tasks.push('🧩 Functional component: function App() { return <div>...</div> }');
      tasks.push('📦 Props: kirim data ke komponen (name, color, onClick)');
      tasks.push('🔁 Render list: array.map() untuk tampilkan banyak item');
      tasks.push('🔀 Conditional rendering: {isLogin ? <Dashboard/> : <Login/>}');
      tasks.push('🎨 Styling component: className, inline style, CSS modules');
      tasks.push('📂 Struktur folder: components/, pages/, layouts/');
      tasks.push('🧩 Children props: <Card><p>isi</p></Card>');
      tasks.push('🔧 Event handling: onClick, onChange, onSubmit');
      tasks.push('✅ Latihan: buat komponen Card, Button, Navbar yang reusable');
    } else if (g.includes('api') || g.includes('fetch') || g.includes('axios')) {
      tasks.push('📘 Pahami API: cara frontend ambil data dari server');
      tasks.push('🌐 fetch() dasar: GET request ke public API');
      tasks.push('⚡ useEffect + fetch: ambil data saat komponen mount');
      tasks.push('⏳ Loading state: tampilkan spinner saat data loading');
      tasks.push('❌ Error handling: try/catch, tampilkan pesan error');
      tasks.push('📦 Install Axios: npm install axios (alternatif fetch)');
      tasks.push('📤 POST request: kirim data form ke API');
      tasks.push('🔄 PUT/DELETE: update dan hapus data');
      tasks.push('🔍 Search & filter: fetch dengan query parameter');
      tasks.push('📋 Custom hook: buat useFetch(url) yang reusable');
      tasks.push('✅ Latihan: buat app cuaca / pencarian film dari API');
    } else if (g.includes('tailwind')) {
      tasks.push('📦 Install: npm install tailwindcss @tailwindcss/vite');
      tasks.push('⚙️ Setup: tambah plugin di vite.config.js');
      tasks.push('🎨 Utility class: text-lg, font-bold, bg-blue-500, p-4, rounded');
      tasks.push('📐 Layout: flex, grid, justify-center, items-center, gap-4');
      tasks.push('📱 Responsive: sm:, md:, lg: breakpoint prefixes');
      tasks.push('🎯 Hover & state: hover:bg-blue-700, focus:ring-2, active:scale-95');
      tasks.push('🌙 Dark mode: dark:bg-gray-900, dark:text-white');
      tasks.push('🧩 Component pattern: Card, Button, Navbar dengan Tailwind');
      tasks.push('✅ Latihan: buat landing page responsive dengan Tailwind');
    } else {
      // React umum
      tasks.push('⚛️ Pahami apa itu React: library JavaScript untuk bikin UI');
      tasks.push('📦 Install: npm create vite@latest my-app -- --template react');
      tasks.push('📂 Pahami struktur project: src/, components/, App.jsx, main.jsx');
      tasks.push('🧩 JSX: menulis HTML di dalam JavaScript');
      tasks.push('📦 Props: kirim data antar komponen (seperti parameter)');
      tasks.push('🔄 useState: buat data yang bisa berubah (counter, form, toggle)');
      tasks.push('⚡ useEffect: jalankan kode saat load / data berubah');
      tasks.push('🔁 Render list: tampilkan array data dengan .map()');
      tasks.push('🔀 Conditional rendering: tampilkan komponen berdasarkan kondisi');
      tasks.push('🎯 Event handling: onClick, onChange, onSubmit');
      tasks.push('📝 Form handling: input text, checkbox, select dengan state');
      tasks.push('🗂️ React Router: buat multi-halaman (npm install react-router-dom)');
      tasks.push('🌐 Fetch API: ambil data dari external API');
      tasks.push('🎨 Styling: Tailwind CSS / CSS Modules');
      tasks.push('🛠️ Project: buat to-do app lengkap dengan semua konsep di atas');
    }
  }
  // --- React Native ---
  else if (g.includes('react native') || g.includes('mobile app react')) {
    tasks.push('📦 Install Expo: npx create-expo-app my-app');
    tasks.push('📱 Jalankan di HP: download Expo Go, scan QR code');
    tasks.push('🧩 Komponen dasar: View, Text, Image, ScrollView, TouchableOpacity');
    tasks.push('🎨 StyleSheet: flexbox layout, dimensi, warna');
    tasks.push('📝 TextInput: buat form input dengan state');
    tasks.push('📋 FlatList: render list data yang efisien');
    tasks.push('🔀 React Navigation: stack, tab, drawer navigation');
    tasks.push('💾 AsyncStorage: simpan data lokal di HP');
    tasks.push('🌐 Fetch API: ambil data dari backend');
    tasks.push('📷 Akses kamera, lokasi, notifikasi dengan Expo');
    tasks.push('🛠️ Buat app sederhana: to-do list atau catatan');
  }
  // --- Next.js ---
  else if (g.includes('next') && (g.includes('js') || g.includes('next.js') || g.includes('nextjs'))) {
    tasks.push('📦 Buat project: npx create-next-app@latest my-app');
    tasks.push('📂 Pahami App Router: app/, page.tsx, layout.tsx');
    tasks.push('🗂️ File-based routing: folder = route (app/about/page.tsx)');
    tasks.push('⚡ Server Component vs Client Component ("use client")');
    tasks.push('🌐 Data fetching: fetch() di server component');
    tasks.push('📡 API Routes: app/api/route.ts untuk backend endpoint');
    tasks.push('🔗 Link & useRouter: navigasi antar halaman');
    tasks.push('🖼️ Image optimization: <Image> component');
    tasks.push('📦 Dynamic routes: [id]/page.tsx & generateStaticParams');
    tasks.push('🔐 Middleware: autentikasi & redirect');
    tasks.push('🚀 Deploy ke Vercel: git push → auto deploy');
  }
  // --- TypeScript ---
  else if (g.includes('typescript') || g.includes('ts') && g.includes('belajar')) {
    tasks.push('📘 Pahami TypeScript: JavaScript + tipe data');
    tasks.push('🔧 Install: npm install -g typescript, jalankan tsc');
    tasks.push('📝 Tipe dasar: string, number, boolean, array, object');
    tasks.push('🔀 Union type: string | number, literal type');
    tasks.push('📋 Interface: definisi bentuk object { name: string; age: number }');
    tasks.push('📦 Type alias: type User = { name: string; role: "admin" | "user" }');
    tasks.push('⚡ Generic: function<T>(arg: T): T untuk tipe fleksibel');
    tasks.push('🧩 Enum: enum Status { Active, Inactive }');
    tasks.push('🔧 Type assertion: as, typeof, instanceof');
    tasks.push('⚛️ TypeScript + React: props typing, event typing');
    tasks.push('✅ Latihan: konversi project JavaScript ke TypeScript');
  }
  // --- JavaScript Spesifik ---
  else if (g.includes('javascript') || g.includes(' js')) {
    if (g.includes('async') || g.includes('promise') || g.includes('fetch')) {
      tasks.push('📘 Pahami synchronous vs asynchronous');
      tasks.push('⏳ Callback: fungsi sebagai parameter (setTimeout, addEventListener)');
      tasks.push('🔗 Promise: new Promise((resolve, reject) => { ... })');
      tasks.push('🔗 .then() & .catch(): handle sukses dan error');
      tasks.push('⚡ async/await: cara modern tulis async (lebih mudah dibaca)');
      tasks.push('🌐 fetch(): ambil data dari API');
      tasks.push('📤 fetch POST: kirim data ke server');
      tasks.push('❌ Error handling: try/catch dengan async/await');
      tasks.push('🔄 Promise.all(): jalankan multiple promise sekaligus');
      tasks.push('✅ Latihan: buat app yang fetch data dari jsonplaceholder.typicode.com');
    } else if (g.includes('dom') || g.includes('manipulasi')) {
      tasks.push('📘 Apa itu DOM: representasi HTML di JavaScript');
      tasks.push('🔍 querySelector & getElementById: ambil element');
      tasks.push('✏️ innerHTML, textContent, value: ubah isi element');
      tasks.push('🎨 classList: add, remove, toggle class CSS');
      tasks.push('🎯 addEventListener: click, submit, keydown, input');
      tasks.push('➕ createElement & appendChild: buat element baru');
      tasks.push('❌ removeChild & remove(): hapus element');
      tasks.push('🔄 Event delegation: handle event di parent');
      tasks.push('📝 Form handling: ambil value input, validasi, submit');
      tasks.push('✅ Latihan: buat to-do list murni pake DOM manipulation');
    } else if (g.includes('array') || g.includes('object') || g.includes('method')) {
      tasks.push('📦 Array dasar: buat, akses index, length');
      tasks.push('➕ push, pop, shift, unshift: tambah/hapus item');
      tasks.push('🔁 forEach: loop setiap item tanpa return');
      tasks.push('🔄 map: transformasi setiap item → array baru');
      tasks.push('🔍 filter: ambil item yang sesuai kondisi');
      tasks.push('📊 reduce: akumulasi array jadi 1 value (total, rata-rata)');
      tasks.push('🔎 find & findIndex: cari item tertentu');
      tasks.push('✅ includes & some & every: cek kondisi boolean');
      tasks.push('📦 Object: buat, akses property, destructuring');
      tasks.push('🔑 Object.keys, Object.values, Object.entries');
      tasks.push('🔗 Spread operator: { ...obj }, [ ...arr ]');
      tasks.push('✅ Latihan: olah data array of objects (sorting, filtering, grouping)');
    } else {
      tasks.push('📦 Setup: install Node.js & VS Code');
      tasks.push('📝 Variabel: let, const (hindari var)');
      tasks.push('📊 Tipe data: string, number, boolean, null, undefined');
      tasks.push('🔀 Kondisi: if/else, switch, ternary (? :)');
      tasks.push('🔁 Perulangan: for, while, for...of, forEach');
      tasks.push('⚡ Fungsi: function, arrow function (=>), parameter, return');
      tasks.push('📦 Array: push, map, filter, reduce, find');
      tasks.push('📦 Object: property, method, destructuring, spread');
      tasks.push('🧩 ES6+: template literal, destructuring, optional chaining');
      tasks.push('🌐 DOM: querySelector, addEventListener, innerHTML');
      tasks.push('⏳ Async: callback, promise, async/await, fetch');
      tasks.push('🛠️ Buat 3 mini project: kalkulator, quiz, to-do list');
    }
  }
  // --- Python Spesifik ---
  else if (g.includes('python')) {
    if (g.includes('django') || g.includes('flask') || g.includes('web python')) {
      tasks.push('📦 Install: pip install django (atau flask)');
      tasks.push('🔧 Buat project: django-admin startproject myproject');
      tasks.push('📂 Pahami struktur: urls.py, views.py, models.py, templates/');
      tasks.push('🗂️ URL routing: path("about/", views.about)');
      tasks.push('📄 Views & Templates: render HTML dengan data');
      tasks.push('🗄️ Models & Database: definisi tabel, migrasi');
      tasks.push('📝 Form handling: input data dari user');
      tasks.push('🔐 Autentikasi: login, register, logout');
      tasks.push('📡 REST API: Django REST Framework / Flask-RESTful');
      tasks.push('🚀 Deploy ke PythonAnywhere atau Railway');
    } else if (g.includes('data') || g.includes('pandas') || g.includes('analisis')) {
      tasks.push('📦 Install: pip install pandas matplotlib jupyter');
      tasks.push('📊 Pandas DataFrame: baca CSV, filter, groupby');
      tasks.push('🔍 Data cleaning: handle missing values, duplikat');
      tasks.push('📈 Matplotlib: line chart, bar chart, histogram');
      tasks.push('📊 Seaborn: heatmap, scatter plot, box plot');
      tasks.push('📋 Statistik dasar: mean, median, std, correlation');
      tasks.push('🔄 Merge & Join: gabungkan multiple dataset');
      tasks.push('📤 Export: simpan ke CSV, Excel, JSON');
      tasks.push('✅ Latihan: analisis dataset Kaggle (Titanic/Netflix)');
    } else {
      tasks.push('📦 Install Python (python.org) & VS Code');
      tasks.push('📝 print(), input(), variabel, tipe data');
      tasks.push('🔀 Kondisi: if / elif / else');
      tasks.push('🔁 Perulangan: for, while, range()');
      tasks.push('⚡ Fungsi: def, parameter, return, lambda');
      tasks.push('📦 List: append, remove, slicing, list comprehension');
      tasks.push('📦 Dictionary: key-value, get, items, loop');
      tasks.push('📁 File I/O: open, read, write, with statement');
      tasks.push('🧩 OOP: class, __init__, method, inheritance');
      tasks.push('📚 Module & pip: import, install library');
      tasks.push('🛠️ Buat 3 project: kalkulator, tebak angka, to-do CLI');
    }
  }
  // --- HTML & CSS ---
  else if (g.includes('html') || g.includes('css')) {
    if (g.includes('css') && (g.includes('flexbox') || g.includes('grid') || g.includes('layout'))) {
      tasks.push('📐 Flexbox: display: flex, justify-content, align-items');
      tasks.push('↔️ flex-direction: row, column, row-reverse');
      tasks.push('📏 flex-wrap, flex-grow, flex-shrink, flex-basis');
      tasks.push('🔲 Grid: display: grid, grid-template-columns/rows');
      tasks.push('📐 grid-gap, grid-area, grid-template-areas');
      tasks.push('📱 Responsive: media queries @media (max-width: 768px)');
      tasks.push('📱 Mobile-first approach: design dari layar kecil dulu');
      tasks.push('✅ Latihan: buat layout dashboard responsive');
    } else {
      tasks.push('📄 Struktur HTML: <!DOCTYPE>, <html>, <head>, <body>');
      tasks.push('📝 Tag teks: h1-h6, p, span, strong, em, br');
      tasks.push('🔗 Link & gambar: <a href>, <img src>');
      tasks.push('📋 List: <ul>, <ol>, <li>');
      tasks.push('📊 Tabel: <table>, <tr>, <th>, <td>');
      tasks.push('📝 Form: <form>, <input>, <select>, <textarea>, <button>');
      tasks.push('🏷️ Semantic: <header>, <nav>, <main>, <section>, <footer>');
      tasks.push('🎨 CSS selector: tag, .class, #id, kombinasi');
      tasks.push('📦 Box model: margin, border, padding, content');
      tasks.push('📐 Flexbox: display flex, justify-content, align-items');
      tasks.push('📐 Grid: display grid, template-columns, gap');
      tasks.push('📱 Responsive: media queries');
      tasks.push('✅ Latihan: buat website portofolio personal');
    }
  }
  // --- Git & GitHub ---
  else if (g.includes('git')) {
    tasks.push('📦 Install Git (git-scm.com) & buat akun GitHub');
    tasks.push('⚙️ Config: git config --global user.name & user.email');
    tasks.push('🔧 git init: inisialisasi repo baru');
    tasks.push('➕ git add: staging file (git add . untuk semua)');
    tasks.push('💾 git commit -m "pesan": simpan perubahan');
    tasks.push('📜 git log: lihat histori commit');
    tasks.push('🔀 git branch: buat & pindah branch (git checkout -b fitur)');
    tasks.push('🔗 git merge: gabungkan branch');
    tasks.push('☁️ git remote add origin URL: hubungkan ke GitHub');
    tasks.push('📤 git push: upload ke GitHub');
    tasks.push('📥 git pull: download perubahan terbaru');
    tasks.push('🔄 git clone: download repo dari GitHub');
    tasks.push('✅ Latihan: buat repo, branching, push, pull request');
  }
  // --- Node.js / Express ---
  else if (g.includes('node') || g.includes('express') || g.includes('backend')) {
    tasks.push('📦 Install Node.js & pahami npm / package.json');
    tasks.push('📝 Module system: require, module.exports, ES import/export');
    tasks.push('📁 File system: fs.readFile, fs.writeFile');
    tasks.push('🌐 HTTP module: buat server sederhana tanpa framework');
    tasks.push('📦 Install Express: npm install express');
    tasks.push('🔧 Express dasar: app.get, app.post, app.listen');
    tasks.push('🗂️ Routing: router, parameter (:id), query string');
    tasks.push('🔌 Middleware: cors, body-parser, custom middleware');
    tasks.push('🗄️ Database: MongoDB (mongoose) atau PostgreSQL (prisma)');
    tasks.push('🔐 Auth: bcrypt hash password, JWT token');
    tasks.push('📡 REST API: CRUD lengkap (Create, Read, Update, Delete)');
    tasks.push('✅ Buat API: user registration, login, CRUD produk');
  }
  // --- Database / SQL ---
  else if (g.includes('database') || g.includes('sql') || g.includes('mongodb') || g.includes('mysql')) {
    tasks.push('📘 Pahami database: relational (SQL) vs NoSQL (MongoDB)');
    tasks.push('📦 Install: MySQL/PostgreSQL atau MongoDB Atlas (cloud)');
    tasks.push('📊 SQL dasar: CREATE TABLE, tipe data (VARCHAR, INT, DATE)');
    tasks.push('➕ INSERT INTO: tambah data baru');
    tasks.push('🔍 SELECT: ambil data, WHERE, ORDER BY, LIMIT');
    tasks.push('✏️ UPDATE & DELETE: ubah dan hapus data');
    tasks.push('🔗 JOIN: gabungkan data dari beberapa tabel');
    tasks.push('📐 Relasi: one-to-many, many-to-many, foreign key');
    tasks.push('📊 Aggregate: COUNT, SUM, AVG, GROUP BY');
    tasks.push('🔧 Index: percepat query');
    tasks.push('✅ Latihan: design database toko online / blog');
  }
  // --- Tailwind CSS ---
  else if (g.includes('tailwind')) {
    tasks.push('📦 Install Tailwind CSS di project');
    tasks.push('🎨 Utility class: text, bg, p, m, rounded, shadow');
    tasks.push('📐 Layout: flex, grid, justify, items, gap');
    tasks.push('📏 Sizing: w, h, max-w, min-h');
    tasks.push('📱 Responsive: sm:, md:, lg:, xl: breakpoints');
    tasks.push('🎯 States: hover:, focus:, active:, group-hover:');
    tasks.push('🌙 Dark mode: dark: prefix');
    tasks.push('🎨 Custom theme: tailwind.config.js colors, fonts');
    tasks.push('🧩 Component patterns: Card, Button, Form, Navbar');
    tasks.push('✅ Latihan: redesign website lama pakai Tailwind');
  }
  // === KEPOLISIAN / TNI ===
  else if (g.includes('polisi') || g.includes('polri') || g.includes('tni') || g.includes('militer') || g.includes('akpol') || g.includes('bintara')) {
    tasks.push('🏃 Lari 12 menit (Cooper): target 2.4 km — latihan 5x/minggu pagi');
    tasks.push('💪 Push-up: target 50/menit — mulai 20, tambah 5/minggu');
    tasks.push('🏋️ Sit-up: target 50/menit — mulai 20, tambah 5/minggu');
    tasks.push('🔼 Pull-up: target 10 kali — mulai 3, tambah 1/minggu');
    tasks.push('🏃‍♂️ Sprint 100m & shuttle run: latihan 3x/minggu');
    tasks.push('🏊 Renang 25-50m: latihan teknik 2x/minggu');
    tasks.push('🧠 Psikotes: tes logika, kepribadian, kecerdasan — 1 jam/hari');
    tasks.push('📖 Wawasan kebangsaan: Pancasila, UUD 1945, sejarah');
    tasks.push('🍗 Nutrisi: tinggi protein, kurangi gorengan');
    tasks.push('😴 Tidur 7-8 jam, hindari begadang');
    tasks.push('🏥 Cek kesehatan: mata, gigi, tinggi, berat badan');
    tasks.push('📋 Siapkan dokumen: ijazah, SKCK, KTP, pas foto');
  }
  // === FITNESS / GYM ===
  else if (g.includes('fitness') || g.includes('gym') || g.includes('otot') || g.includes('bulking') || g.includes('cutting')) {
    if (g.includes('bulking') || g.includes('massa otot') || g.includes('nambah otot')) {
      tasks.push('📊 Hitung TDEE + surplus 300-500 kalori/hari');
      tasks.push('🍗 Protein 1.6-2.2g per kg berat badan/hari');
      tasks.push('🏋️ Push day: bench press, overhead press, tricep dip');
      tasks.push('🏋️ Pull day: barbell row, pull-up, bicep curl');
      tasks.push('🦵 Leg day: squat, deadlift, leg press, calf raise');
      tasks.push('📈 Progressive overload: tambah beban/rep setiap minggu');
      tasks.push('😴 Tidur 7-9 jam untuk recovery otot');
      tasks.push('💧 Minum 3 liter air/hari');
      tasks.push('📝 Catat progress: beban, rep, berat badan mingguan');
    } else {
      tasks.push('🧘 Pemanasan: dynamic stretching 10 menit');
      tasks.push('💪 Push-up: 3 set x 15 kali');
      tasks.push('🏋️ Sit-up/crunch: 3 set x 20 kali');
      tasks.push('🦵 Squat: 3 set x 15 kali');
      tasks.push('🧱 Plank: 3 set x 30-60 detik');
      tasks.push('🏃 Cardio: lari/jogging 20-30 menit');
      tasks.push('🔼 Pull-up: 3 set x 5-8 kali');
      tasks.push('🧘 Pendinginan: static stretching 10 menit');
      tasks.push('⏰ Jadwal: 4-5x/minggu, pagi 05-07 atau sore 16-18');
    }
  }
  // === OLAHRAGA / LARI ===
  else if (g.includes('olahraga') || g.includes('lari') || g.includes('fisik') || g.includes('latihan')) {
    tasks.push('🧘 Pemanasan: stretching + jogging ringan 5 menit');
    tasks.push('💪 Push-up 3x15, sit-up 3x20, squat 3x15');
    tasks.push('🧱 Plank 3x30-60 detik');
    tasks.push('🏃 Lari/jogging: mulai 15 menit, +5 menit/minggu');
    tasks.push('💥 Burpees: 3x8 kali untuk stamina');
    tasks.push('🧘 Pendinginan: stretching 10 menit');
    tasks.push('💧 Minum air 2-3 liter/hari');
    tasks.push('⏰ Jadwal: 4-5x/minggu pagi atau sore');
  }
  // === DIET ===
  else if (g.includes('diet') || g.includes('berat badan') || g.includes('kurus') || g.includes('nutrisi')) {
    if (g.includes('kurus') || g.includes('turun') || g.includes('kurang')) {
      tasks.push('📊 Hitung TDEE lalu defisit 300-500 kalori/hari');
      tasks.push('🥚 Sarapan protein: telur rebus, oatmeal');
      tasks.push('🥗 Makan banyak sayur & protein, kurangi karbohidrat');
      tasks.push('🚫 Stop: gorengan, minuman manis, junk food, mie instan');
      tasks.push('💧 Minum air 2L/hari, minum sebelum makan');
      tasks.push('🏃 Olahraga 30 menit/hari (cardio + strength)');
      tasks.push('⏰ Makan terakhir sebelum jam 7 malam');
      tasks.push('😴 Tidur 7-8 jam (kurang tidur = nambah berat)');
      tasks.push('📝 Timbang & catat progress mingguan');
    } else {
      tasks.push('📊 Hitung kebutuhan kalori TDEE');
      tasks.push('🥚 Sarapan protein tinggi sebelum jam 9');
      tasks.push('🥗 Sayur & buah 5 porsi/hari');
      tasks.push('🚫 Kurangi gula, gorengan, mie instan');
      tasks.push('💧 Air putih 8 gelas/hari');
      tasks.push('🏃 Olahraga 30 menit/hari');
      tasks.push('😴 Tidur 7-8 jam');
      tasks.push('📝 Catat progress mingguan');
    }
  }
  // === MASAK ===
  else if (g.includes('masak') || g.includes('resep') || g.includes('chef') || g.includes('kue')) {
    tasks.push('📖 Pilih resep di YouTube/Cookpad');
    tasks.push('📝 Tulis daftar bahan & bumbu');
    tasks.push('🛒 Belanja bahan');
    tasks.push('🔪 Mise en place: cuci, potong semua bahan');
    tasks.push('🔥 Ikuti langkah resep satu per satu');
    tasks.push('👅 Tes rasa, sesuaikan bumbu');
    tasks.push('🍽️ Plating & sajikan');
    tasks.push('🧹 Bersihkan dapur');
  }
  // === UJIAN / BELAJAR AKADEMIK ===
  else if (g.includes('ujian') || g.includes('sekolah') || g.includes('kuliah') || g.includes('skripsi') || g.includes('tugas')) {
    if (g.includes('skripsi') || g.includes('thesis')) {
      tasks.push('🎯 Tentukan topik & rumusan masalah');
      tasks.push('📚 Literature review: baca 10-15 jurnal terkait');
      tasks.push('📝 Tulis BAB 1: latar belakang, rumusan, tujuan');
      tasks.push('📖 Tulis BAB 2: landasan teori dari jurnal');
      tasks.push('🔧 Tulis BAB 3: metodologi penelitian');
      tasks.push('💻 Implementasi/penelitian & kumpulkan data');
      tasks.push('📊 Tulis BAB 4: hasil & pembahasan');
      tasks.push('📝 Tulis BAB 5: kesimpulan & saran');
      tasks.push('🔍 Review, revisi, cek plagiarisme');
      tasks.push('📋 Siapkan slide presentasi sidang');
    } else {
      tasks.push('📚 Kumpulkan materi: buku, catatan, slide');
      tasks.push('📝 Buat ringkasan/mind map per bab');
      tasks.push('✍️ Latihan soal tahun sebelumnya');
      tasks.push('📖 Teknik Pomodoro: 25 min fokus, 5 min istirahat');
      tasks.push('🔁 Review materi sulit setiap hari');
      tasks.push('⏱️ Simulasi ujian: kerjakan soal dengan timer');
      tasks.push('😴 Tidur cukup, jangan begadang');
    }
  }
  // === INTERVIEW / KERJA ===
  else if (g.includes('interview') || g.includes('wawancara') || g.includes('lamaran') || g.includes('kerja') || g.includes('karir')) {
    tasks.push('🔍 Riset perusahaan: visi misi, produk, kultur');
    tasks.push('📄 Update CV: pengalaman, skill, portofolio');
    tasks.push('💬 Latihan pertanyaan: "ceritakan diri Anda", STAR method');
    tasks.push('🗣️ Latihan perkenalan 1-2 menit di depan cermin');
    tasks.push('💻 Portofolio online: GitHub, website personal');
    tasks.push('👔 Siapkan pakaian formal');
    tasks.push('❓ Siapkan pertanyaan untuk interviewer');
    tasks.push('📍 Datang/login 15 menit lebih awal');
  }
  // === TRAVELING ===
  else if (g.includes('liburan') || g.includes('traveling') || g.includes('wisata') || g.includes('trip')) {
    tasks.push('🗺️ Tentukan destinasi, tanggal, durasi');
    tasks.push('💰 Tentukan budget total');
    tasks.push('✈️ Booking tiket transportasi');
    tasks.push('🏨 Booking penginapan');
    tasks.push('📋 Buat itinerary harian');
    tasks.push('🎒 Packing: baju, toiletries, charger, obat');
    tasks.push('📱 Download peta offline & app transportasi');
    tasks.push('📄 Siapkan dokumen: KTP/paspor');
    tasks.push('💳 Siapkan cash + e-wallet');
  }
  // === BISNIS ===
  else if (g.includes('bisnis') || g.includes('usaha') || g.includes('jualan') || g.includes('toko') || g.includes('freelance')) {
    tasks.push('🎯 Tentukan produk/jasa & keunikannya');
    tasks.push('🔍 Riset pasar: target konsumen, kompetitor');
    tasks.push('📝 Rencana bisnis: target, modal, strategi');
    tasks.push('💰 Hitung modal awal');
    tasks.push('🎨 Branding: nama, logo, akun sosmed');
    tasks.push('📸 Buat konten & foto produk');
    tasks.push('📢 Promosi di sosmed, promo pembukaan');
    tasks.push('📊 Catat pemasukan/pengeluaran');
    tasks.push('🔄 Evaluasi strategi mingguan');
  }
  // === IBADAH ===
  else if (g.includes('ibadah') || g.includes('sholat') || g.includes('quran') || g.includes('mengaji') || g.includes('puasa')) {
    tasks.push('🕌 Sholat 5 waktu tepat waktu');
    tasks.push('📖 Baca Al-Quran 1 halaman/hari');
    tasks.push('📿 Dzikir & doa setelah sholat');
    tasks.push('🌅 Sholat Dhuha');
    tasks.push('🌙 Sholat Tahajud');
    tasks.push('📚 Baca buku/tonton kajian 15 menit/hari');
    tasks.push('💝 Sedekah / berbuat baik');
    tasks.push('🪞 Muhasabah sebelum tidur');
  }
  // === BERSIH-BERSIH ===
  else if (g.includes('bersih') || g.includes('rumah') || g.includes('rapih') || g.includes('cuci')) {
    tasks.push('🛏️ Rapikan tempat tidur');
    tasks.push('🧹 Sapu & pel lantai');
    tasks.push('🍽️ Cuci piring');
    tasks.push('🗑️ Buang sampah');
    tasks.push('👕 Cuci & lipat baju');
    tasks.push('🚿 Bersihkan kamar mandi');
    tasks.push('🪟 Lap meja & rak');
    tasks.push('📦 Rapikan barang berantakan');
  }
  // === BELAJAR UMUM (catch-all untuk "belajar X") ===
  else if (g.includes('belajar') || g.includes('study') || g.includes('learn') || g.includes('kursus')) {
    const topik = goal.replace(/belajar|study|learn|mau|ingin|saya|kursus/gi, '').trim();
    tasks.push(`🔍 Cari sumber belajar terbaik: "${topik}" (YouTube, Udemy, docs resmi)`);
    tasks.push(`📋 List topik/bab utama yang harus dipelajari tentang ${topik}`);
    tasks.push('📅 Jadwal belajar: 1-2 jam/hari, konsisten');
    tasks.push('📖 Baca/tonton materi, catat poin penting');
    tasks.push('✍️ Praktik langsung: coding/latihan setiap selesai baca');
    tasks.push('🔁 Review materi kemarin sebelum lanjut');
    tasks.push('🧪 Uji pemahaman: soal/quiz/project kecil mingguan');
    tasks.push('💬 Jelaskan ke orang lain (teknik Feynman)');
    tasks.push('🛠️ Buat project kecil untuk portfolio');
  }
  // === PROJECT / APLIKASI ===
  else if (g.includes('project') || g.includes('proyek') || g.includes('aplikasi') || g.includes('app') || g.includes('portfolio')) {
    tasks.push('🎯 Tentukan tujuan & fitur utama');
    tasks.push('📝 Wireframe/sketsa UI (Figma/kertas)');
    tasks.push('🔧 Pilih tech stack');
    tasks.push('📦 Setup: init repo, install dependencies');
    tasks.push('💻 Coding fitur satu per satu');
    tasks.push('🧪 Testing setiap fitur');
    tasks.push('🎨 Polish UI/UX');
    tasks.push('🚀 Deploy & tulis README');
  }
  // === FRONTEND (tanpa framework spesifik) ===
  else if (g.includes('frontend') || g.includes('web') || g.includes('website')) {
    tasks.push('📄 HTML: tag, form, tabel, semantic');
    tasks.push('🎨 CSS: selector, flexbox, grid, responsive');
    tasks.push('⚡ JavaScript: variabel, fungsi, DOM, event');
    tasks.push('🎨 Framework CSS: Tailwind atau Bootstrap');
    tasks.push('⚛️ Framework JS: React / Vue / Angular');
    tasks.push('🛠️ Buat website landing page / portfolio');
    tasks.push('🚀 Deploy ke Vercel / Netlify');
  }
  // === GENERIC ===
  else {
    const topik = goal.trim();
    tasks.push(`🎯 Tentukan target utama: ${topik}`);
    tasks.push('📋 Tulis langkah-langkah dari awal sampai akhir');
    tasks.push('🔧 Siapkan alat & sumber daya yang dibutuhkan');
    tasks.push('📅 Buat jadwal realistis');
    tasks.push('🚀 Mulai dari langkah termudah');
    tasks.push('⏰ Kerjakan 1-2 jam/hari, konsisten');
    tasks.push('📝 Catat progress harian');
    tasks.push('🔄 Evaluasi & sesuaikan mingguan');
  }

  return tasks;
}

app.post('/api/hf-breakdown', async (req, res) => {
  const { goal } = req.body;
  try {
    // Coba HuggingFace API dulu
    const response = await fetch('https://router.huggingface.co/hf-inference/models/google/flan-t5-large', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({ inputs: `Break down this goal into small actionable tasks. Goal: ${goal}. Tasks:` })
    });
    const data = await response.json();

    // Jika API error, gunakan fallback
    if (data.error) {
      console.log('HuggingFace API error, using fallback:', data.error);
      return res.json(fallbackBreakdown(goal));
    }

    res.json(data);
  } catch (e) {
    // Jika fetch gagal, gunakan fallback
    console.log('Fetch error, using fallback:', e.message);
    res.json(fallbackBreakdown(goal));
  }
});

app.listen(3001, () => console.log('Proxy listening on port 3001'));
