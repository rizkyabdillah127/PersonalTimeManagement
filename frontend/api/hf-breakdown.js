export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal } = req.body;
  if (!goal) return res.status(400).json({ error: 'Goal is required' });

  const g = goal.toLowerCase();
  const tasks = [];

  // === REACT / FRONTEND DEVELOPER ===
  if (g.includes('react') || g.includes('frontend')) {
    tasks.push('📦 Install Node.js (nodejs.org) & VS Code (code.visualstudio.com) — 15 menit');
    tasks.push('🧠 Pelajari dasar HTML: tag, atribut, form, tabel (w3schools.com/html) — 2-3 hari, 1 jam/hari');
    tasks.push('🎨 Pelajari dasar CSS: selector, flexbox, grid, responsive (w3schools.com/css) — 3-4 hari, 1 jam/hari');
    tasks.push('⚡ Pelajari JavaScript dasar: variabel, fungsi, array, object, DOM (javascript.info) — 1-2 minggu, 1.5 jam/hari');
    tasks.push('📘 Pelajari ES6+: arrow function, destructuring, spread, template literal, async/await — 3-4 hari, 1 jam/hari');
    tasks.push('⚛️ Install React: jalankan "npm create vite@latest my-app -- --template react" — 10 menit');
    tasks.push('🧩 Pelajari komponen React: functional component, JSX syntax, props — 2 hari, 1.5 jam/hari');
    tasks.push('🔄 Pelajari State & Event: useState, onChange, onClick, form handling — 2-3 hari, 1.5 jam/hari');
    tasks.push('🪝 Pelajari Hooks: useEffect (fetch data, side effects), useRef, useContext — 3-4 hari, 1.5 jam/hari');
    tasks.push('🗂️ Pelajari React Router: routing, navigate, dynamic route (reactrouter.com) — 2 hari, 1 jam/hari');
    tasks.push('🎨 Pelajari Tailwind CSS: install & pakai di React (tailwindcss.com) — 2 hari, 1 jam/hari');
    tasks.push('🌐 Pelajari fetch API & Axios: ambil data dari backend/API — 2 hari, 1 jam/hari');
    tasks.push('📦 Pelajari State Management: Context API atau Zustand — 2-3 hari, 1 jam/hari');
    tasks.push('🛠️ Buat project portfolio: to-do app, weather app, atau blog — 1-2 minggu, 2 jam/hari');
    tasks.push('🚀 Deploy project ke Vercel atau Netlify (gratis) — 30 menit');
    tasks.push('💼 Buat akun GitHub, upload project, lengkapi profil — 1 jam');
    tasks.push('📝 Buat CV/resume developer & mulai apply — 1-2 hari');
  }
  // === JAVASCRIPT ===
  else if (g.includes('javascript') || g.includes('js')) {
    tasks.push('📦 Install Node.js & VS Code — 15 menit');
    tasks.push('🧠 Pelajari variabel: var, let, const & tipe data — 1 hari, 45 menit');
    tasks.push('🔀 Pelajari kondisi: if/else, switch, ternary operator — 1 hari, 45 menit');
    tasks.push('🔁 Pelajari perulangan: for, while, forEach, map, filter — 1-2 hari, 1 jam/hari');
    tasks.push('⚡ Pelajari fungsi: deklarasi, arrow function, parameter, return — 1-2 hari, 1 jam/hari');
    tasks.push('📦 Pelajari array & object: method penting (push, pop, map, filter, reduce) — 2 hari, 1 jam/hari');
    tasks.push('🌐 Pelajari DOM manipulation: querySelector, addEventListener, innerHTML — 2-3 hari, 1 jam/hari');
    tasks.push('⏳ Pelajari async: callback, promise, async/await, fetch API — 3-4 hari, 1.5 jam/hari');
    tasks.push('📘 Pelajari ES6+: destructuring, spread, module, template literal — 2 hari, 1 jam/hari');
    tasks.push('🛠️ Buat 3 mini project: kalkulator, to-do list, quiz app — 1-2 minggu, 2 jam/hari');
  }
  // === PYTHON ===
  else if (g.includes('python')) {
    tasks.push('📦 Install Python (python.org) & VS Code — 15 menit');
    tasks.push('🧠 Pelajari variabel, tipe data, input/output (print, input) — 1 hari, 45 menit');
    tasks.push('🔀 Pelajari kondisi: if/elif/else — 1 hari, 45 menit');
    tasks.push('🔁 Pelajari perulangan: for, while, range, enumerate — 1-2 hari, 1 jam/hari');
    tasks.push('⚡ Pelajari fungsi: def, parameter, return, lambda — 1-2 hari, 1 jam/hari');
    tasks.push('📦 Pelajari list, tuple, dictionary, set & method-nya — 2-3 hari, 1 jam/hari');
    tasks.push('📁 Pelajari file handling: baca/tulis file txt, csv — 1 hari, 1 jam');
    tasks.push('🧩 Pelajari OOP: class, object, inheritance, encapsulation — 3-4 hari, 1.5 jam/hari');
    tasks.push('📚 Pelajari library populer: requests, pandas, matplotlib — 3-5 hari, 1 jam/hari');
    tasks.push('🛠️ Buat 3 mini project: kalkulator, web scraper, data analysis — 1-2 minggu, 2 jam/hari');
  }
  // === WEB DEVELOPMENT UMUM ===
  else if (g.includes('web') || g.includes('website') || g.includes('html') || g.includes('css')) {
    tasks.push('📦 Install VS Code & extension Live Server — 15 menit');
    tasks.push('🧠 Pelajari HTML: struktur, tag semantik, form, tabel (w3schools.com) — 2-3 hari, 1 jam/hari');
    tasks.push('🎨 Pelajari CSS: selector, box model, flexbox, grid — 3-5 hari, 1 jam/hari');
    tasks.push('📱 Pelajari responsive design: media queries, mobile-first — 2 hari, 1 jam/hari');
    tasks.push('⚡ Pelajari JavaScript dasar: variabel, fungsi, DOM — 1-2 minggu, 1.5 jam/hari');
    tasks.push('🎨 Pelajari framework CSS: Tailwind atau Bootstrap — 2-3 hari, 1 jam/hari');
    tasks.push('🛠️ Buat website pertama: landing page / portfolio — 1 minggu, 2 jam/hari');
    tasks.push('🚀 Deploy ke GitHub Pages atau Netlify (gratis) — 30 menit');
  }
  // === BACKEND / FULLSTACK ===
  else if (g.includes('backend') || g.includes('fullstack') || g.includes('full stack') || g.includes('server') || g.includes('node') || g.includes('express')) {
    tasks.push('📦 Install Node.js, npm, Postman & VS Code — 20 menit');
    tasks.push('🧠 Pelajari JavaScript/TypeScript dasar — 1 minggu, 1.5 jam/hari');
    tasks.push('🌐 Pelajari HTTP: method (GET, POST, PUT, DELETE), status code — 1 hari, 1 jam');
    tasks.push('⚡ Pelajari Express.js: routing, middleware, request/response — 3-4 hari, 1.5 jam/hari');
    tasks.push('🗄️ Pelajari database: MongoDB (Mongoose) atau PostgreSQL — 1 minggu, 1.5 jam/hari');
    tasks.push('🔐 Pelajari autentikasi: JWT, bcrypt, session — 3-4 hari, 1.5 jam/hari');
    tasks.push('📡 Buat REST API sederhana: CRUD operations — 1 minggu, 2 jam/hari');
    tasks.push('🛠️ Buat project fullstack: connect frontend + backend — 2 minggu, 2 jam/hari');
    tasks.push('🚀 Deploy backend ke Railway/Render (gratis) — 1 jam');
  }
  // === CODING / PROGRAMMING UMUM ===
  else if (g.includes('programming') || g.includes('coding') || g.includes('programmer') || g.includes('developer')) {
    tasks.push('🤔 Pilih bahasa pertama: JavaScript (web) atau Python (general) — 30 menit riset');
    tasks.push('📦 Install tools: VS Code + bahasa yang dipilih — 15 menit');
    tasks.push('🧠 Pelajari dasar: variabel, tipe data, operator — 2 hari, 1 jam/hari');
    tasks.push('🔀 Pelajari logika: kondisi (if/else) & perulangan (for/while) — 2-3 hari, 1 jam/hari');
    tasks.push('⚡ Pelajari fungsi, array/list, object/dictionary — 3-4 hari, 1.5 jam/hari');
    tasks.push('🧩 Pelajari OOP: class, object, inheritance — 1 minggu, 1 jam/hari');
    tasks.push('🔧 Pelajari Git & GitHub untuk version control — 2 hari, 1 jam/hari');
    tasks.push('🛠️ Buat 3 mini project untuk latihan — 2 minggu, 2 jam/hari');
    tasks.push('📚 Ikuti kursus online (freeCodeCamp, Dicoding, atau Coursera) — ongoing');
    tasks.push('💼 Buat portfolio & mulai apply/freelance — 1 minggu');
  }
  // === LATIHAN FISIK / TES KEPOLISIAN / TNI ===
  else if (g.includes('polisi') || g.includes('polri') || g.includes('tni') || g.includes('militer') || g.includes('akpol') || g.includes('bintara')) {
    tasks.push('🏃 Lari 12 menit (tes Cooper) - target 2.4 km, latihan 5x/minggu pagi jam 5-6 — 30 menit/sesi');
    tasks.push('💪 Push-up: mulai 20, naikkan 5/minggu, target 50 dalam 1 menit — 15 menit/hari');
    tasks.push('🏋️ Sit-up: mulai 20, naikkan 5/minggu, target 50 dalam 1 menit — 15 menit/hari');
    tasks.push('🔼 Pull-up: mulai 3, naikkan 1/minggu, target 10 kali — 15 menit/hari');
    tasks.push('🏃‍♂️ Sprint 100 meter: latihan interval 5-8 kali, istirahat 2 menit antar sprint — 20 menit, 3x/minggu');
    tasks.push('🔀 Shuttle run: latihan lari bolak-balik 10 meter, 10 set — 15 menit, 3x/minggu');
    tasks.push('🏊 Renang 25-50 meter: latihan teknik & stamina — 30 menit, 2x/minggu');
    tasks.push('🧘 Peregangan & pemanasan wajib sebelum latihan — 10 menit setiap sesi');
    tasks.push('🍗 Pola makan: tinggi protein (telur, ayam, ikan), kurangi gorengan — setiap hari');
    tasks.push('😴 Tidur 7-8 jam, hindari begadang — setiap malam');
    tasks.push('🧠 Latihan psikotes: tes logika, kepribadian, kecerdasan (beli buku/app) — 1 jam/hari');
    tasks.push('📖 Belajar wawasan kebangsaan: Pancasila, UUD 1945, sejarah RI — 45 menit/hari');
    tasks.push('🏥 Cek kesehatan: mata, tinggi, berat badan, gigi — 1 minggu sebelum tes');
    tasks.push('📋 Siapkan dokumen: ijazah, SKCK, KTP, pas foto, rapor — 2-3 hari');
  }
  // === LATIHAN FISIK UMUM ===
  else if (g.includes('fisik') || g.includes('olahraga') || g.includes('fitness') || g.includes('gym') || g.includes('lari') || g.includes('latihan')) {
    tasks.push('🧘 Pemanasan: stretching dinamis + jogging ringan 5 menit — 10 menit');
    tasks.push('💪 Push-up: 3 set x 15 kali, istirahat 30 detik antar set — 10 menit');
    tasks.push('🏋️ Sit-up/crunch: 3 set x 20 kali — 10 menit');
    tasks.push('🦵 Squat: 3 set x 15 kali, pastikan lutut tidak melewati jari kaki — 10 menit');
    tasks.push('🧱 Plank: 3 set x 30-60 detik, jaga posisi lurus — 5 menit');
    tasks.push('🏃 Lari/jogging: mulai 15 menit, tambah 5 menit/minggu, target 30 menit — waktu pagi jam 5-6');
    tasks.push('🔼 Pull-up (jika ada palang): 3 set x 5 kali, naikkan bertahap — 10 menit');
    tasks.push('💥 Burpees: 3 set x 8 kali, istirahat 1 menit antar set — 10 menit');
    tasks.push('🧘 Pendinginan: stretching statis seluruh tubuh — 10 menit');
    tasks.push('💧 Minum air putih 2-3 liter/hari, lebih banyak saat olahraga — setiap hari');
    tasks.push('⏰ Waktu terbaik olahraga: pagi (05.00-07.00) atau sore (16.00-18.00) — 4-5x/minggu');
  }
  // === DIET / KESEHATAN ===
  else if (g.includes('diet') || g.includes('sehat') || g.includes('makan') || g.includes('nutrisi') || g.includes('berat badan')) {
    tasks.push('📊 Hitung kebutuhan kalori harian (gunakan kalkulator TDEE online) — 15 menit');
    tasks.push('🍽️ Buat menu makan sehat 1 minggu: 3 makanan utama + 2 snack sehat/hari — 1 jam');
    tasks.push('🥚 Sarapan protein tinggi sebelum jam 9 (telur, oatmeal, roti gandum) — setiap pagi');
    tasks.push('🥗 Makan sayur & buah minimal 5 porsi/hari — setiap makan');
    tasks.push('🚫 Kurangi: gula, gorengan, mie instan, minuman manis — setiap hari');
    tasks.push('💧 Minum air putih 8 gelas/hari (2 liter), minum sebelum makan — setiap hari');
    tasks.push('🏃 Olahraga ringan 30 menit/hari (jalan kaki, jogging, yoga) — pagi atau sore');
    tasks.push('😴 Tidur 7-8 jam, tidur sebelum jam 10 malam — setiap malam');
    tasks.push('📝 Timbang berat badan & catat progress setiap minggu — 5 menit/minggu');
    tasks.push('📵 Hindari makan sambil nonton HP/TV — setiap makan');
  }
  // === MASAK / KULINER ===
  else if (g.includes('masak') || g.includes('kuliner') || g.includes('resep') || g.includes('chef') || g.includes('kue')) {
    tasks.push('📖 Pilih 1 resep spesifik yang ingin dimasak (cari di YouTube/cookpad) — 15 menit');
    tasks.push('📝 Tulis daftar bahan & bumbu yang dibutuhkan — 10 menit');
    tasks.push('🛒 Belanja bahan di pasar/supermarket — 30-60 menit');
    tasks.push('🔪 Cuci, kupas, dan potong semua bahan terlebih dahulu (mise en place) — 15-30 menit');
    tasks.push('🔥 Ikuti langkah resep satu per satu, jangan terburu-buru — 30-60 menit');
    tasks.push('👅 Tes rasa di setiap tahap, sesuaikan garam/bumbu — 5 menit');
    tasks.push('🍽️ Plating: sajikan di piring dengan rapi — 5 menit');
    tasks.push('🧹 Bersihkan dapur: cuci peralatan, lap meja — 15-20 menit');
    tasks.push('📝 Catat tips & modifikasi untuk masak berikutnya — 5 menit');
  }
  // === BERSIH-BERSIH ===
  else if (g.includes('bersih') || g.includes('rumah') || g.includes('rapih') || g.includes('cuci') || g.includes('laundry')) {
    tasks.push('🛏️ Rapikan tempat tidur & bantal — 5 menit');
    tasks.push('🧹 Sapu seluruh ruangan — 15 menit');
    tasks.push('🧽 Pel lantai — 15 menit');
    tasks.push('🍽️ Cuci piring & bersihkan counter dapur — 15 menit');
    tasks.push('🗑️ Buang sampah & ganti kantong plastik — 5 menit');
    tasks.push('👕 Cuci baju, jemur, & lipat pakaian kering — 30 menit');
    tasks.push('🚿 Bersihkan kamar mandi: WC, wastafel, lantai — 15 menit');
    tasks.push('🪟 Lap meja, rak, jendela & permukaan berdebu — 10 menit');
    tasks.push('📦 Rapikan barang berantakan, kembalikan ke tempatnya — 10 menit');
    tasks.push('⏰ Waktu ideal: pagi hari jam 7-9 atau sore jam 15-17 — 1-1.5 jam total');
  }
  // === UJIAN / TES ===
  else if (g.includes('ujian') || g.includes('tes') || g.includes('sekolah') || g.includes('kuliah') || g.includes('skripsi') || g.includes('tugas')) {
    tasks.push('📚 Kumpulkan semua materi: buku, catatan, slide, & soal latihan — 30 menit');
    tasks.push('📝 Buat ringkasan/mind map poin-poin penting setiap bab — 1-2 jam/hari');
    tasks.push('✍️ Latihan soal-soal tahun sebelumnya dengan timer — 1.5 jam/hari');
    tasks.push('📖 Belajar dengan teknik Pomodoro: 25 menit fokus, 5 menit istirahat — 2-3 sesi/hari');
    tasks.push('👥 Diskusi dengan teman: tanya jawab & jelaskan materi bergantian — 45 menit/sesi');
    tasks.push('🔁 Review ulang materi yang sulit, buat catatan tambahan — 30 menit/hari');
    tasks.push('⏱️ Simulasi ujian: kerjakan soal dengan batas waktu seperti ujian asli — 1-2 jam, 1x/minggu');
    tasks.push('😴 Tidur cukup malam sebelum ujian, jangan begadang — 7-8 jam tidur');
    tasks.push('⏰ Waktu belajar terbaik: pagi (08-11) & malam (19-21) — setiap hari');
  }
  // === WAWANCARA / INTERVIEW ===
  else if (g.includes('wawancara') || g.includes('interview') || g.includes('lamaran') || g.includes('kerja')) {
    tasks.push('🔍 Riset perusahaan: visi misi, produk, budaya kerja — 1 jam');
    tasks.push('📄 Update CV/resume: pengalaman, skill, portofolio — 2-3 jam');
    tasks.push('💬 Latihan jawab pertanyaan umum: "ceritakan diri Anda", kelebihan/kekurangan — 1 jam/hari, 3 hari');
    tasks.push('🗣️ Latihan perkenalan diri (1-2 menit) di depan cermin atau rekam video — 30 menit/hari');
    tasks.push('👔 Siapkan pakaian formal & rapi 1 hari sebelumnya — 15 menit');
    tasks.push('📋 Pelajari posisi yang dilamar: job desc, skill yang dibutuhkan — 30 menit');
    tasks.push('❓ Siapkan 2-3 pertanyaan untuk interviewer — 15 menit');
    tasks.push('📍 Cek lokasi/link meeting & datang/login 15 menit lebih awal — hari H');
    tasks.push('🧘 Tenangkan diri: tarik napas, percaya diri, kontak mata — sebelum masuk');
  }
  // === TRAVELING ===
  else if (g.includes('liburan') || g.includes('traveling') || g.includes('jalan-jalan') || g.includes('wisata') || g.includes('trip')) {
    tasks.push('🗺️ Tentukan destinasi, tanggal, dan durasi trip — 30 menit');
    tasks.push('💰 Tentukan budget total (transport, hotel, makan, tiket wisata) — 30 menit');
    tasks.push('✈️ Booking tiket transportasi (pesawat/kereta/bus) — 30 menit');
    tasks.push('🏨 Booking hotel/penginapan (cek Traveloka, Agoda, Airbnb) — 30 menit');
    tasks.push('📋 Buat itinerary harian: tempat wisata, waktu, rute — 1 jam');
    tasks.push('🎒 Packing: baju, toiletries, charger, obat-obatan, snack — 1 jam, 1 hari sebelum');
    tasks.push('📱 Download peta offline, app transportasi lokal, & konversi mata uang — 15 menit');
    tasks.push('📄 Pastikan dokumen: KTP/paspor/visa, print booking — 15 menit');
    tasks.push('💳 Siapkan uang cash + kartu debit/e-wallet — 15 menit');
  }
  // === PROJECT / APLIKASI ===
  else if (g.includes('project') || g.includes('proyek') || g.includes('aplikasi') || g.includes('app')) {
    tasks.push('🎯 Tentukan tujuan, target user, dan fitur utama — 1 jam');
    tasks.push('📝 Buat wireframe/sketsa UI sederhana (pakai Figma atau kertas) — 1-2 jam');
    tasks.push('🔧 Pilih tech stack: frontend, backend, database — 30 menit');
    tasks.push('📦 Setup project: init repo, install dependencies, struktur folder — 30 menit');
    tasks.push('💻 Coding fitur utama satu per satu — 1-2 minggu, 2 jam/hari');
    tasks.push('🧪 Testing: cek bug & edge case di setiap fitur — 2-3 hari, 1 jam/hari');
    tasks.push('🎨 Polish UI/UX: responsif, warna, animasi — 2-3 hari, 1 jam/hari');
    tasks.push('🚀 Deploy ke hosting (Vercel, Netlify, Railway) — 1 jam');
    tasks.push('📄 Tulis README & dokumentasi — 1 jam');
  }
  // === BELAJAR UMUM ===
  else if (g.includes('belajar') || g.includes('study') || g.includes('learn') || g.includes('kursus')) {
    tasks.push(`🔍 Riset & kumpulkan sumber belajar terbaik tentang: ${goal} — 30 menit`);
    tasks.push('📋 Buat daftar topik/bab yang perlu dipelajari — 15 menit');
    tasks.push('📅 Buat jadwal belajar harian: 1-2 jam/hari, waktu terbaik pagi (08-11) atau malam (19-21)');
    tasks.push('📖 Baca/tonton materi & catat poin penting dengan bahasa sendiri — 1 jam/hari');
    tasks.push('✍️ Latihan/praktik langsung dari yang sudah dipelajari — 30-60 menit/hari');
    tasks.push('🔁 Review ulang materi kemarin sebelum lanjut yang baru — 15 menit/hari');
    tasks.push('🧪 Uji pemahaman: kerjakan soal/quiz/project kecil — 1x/minggu');
    tasks.push('💬 Diskusi atau jelaskan ke orang lain (teknik Feynman) — 30 menit/minggu');
  }
  // === KARIR / BISNIS ===
  else if (g.includes('karir') || g.includes('bisnis') || g.includes('usaha') || g.includes('jualan') || g.includes('toko')) {
    tasks.push('🎯 Tentukan produk/jasa yang akan dijual & keunikannya — 1 jam');
    tasks.push('🔍 Riset pasar: siapa target konsumen, harga kompetitor — 2-3 jam');
    tasks.push('📝 Buat rencana bisnis sederhana: target, modal, strategi — 2 jam');
    tasks.push('💰 Hitung modal awal & siapkan sumber dana — 1 hari');
    tasks.push('🎨 Buat branding: nama usaha, logo, akun sosmed (IG, TikTok) — 1 hari');
    tasks.push('📸 Buat konten & foto produk yang menarik — 2-3 jam');
    tasks.push('📢 Mulai promosi: posting di sosmed, kasih promo pembukaan — setiap hari');
    tasks.push('📊 Catat pemasukan & pengeluaran di spreadsheet — 15 menit/hari');
    tasks.push('🔄 Evaluasi & sesuaikan strategi setiap minggu — 30 menit/minggu');
  }
  // === IBADAH ===
  else if (g.includes('ibadah') || g.includes('sholat') || g.includes('puasa') || g.includes('quran') || g.includes('mengaji') || g.includes('doa')) {
    tasks.push('🕌 Sholat 5 waktu tepat waktu (usahakan berjamaah) — setiap hari');
    tasks.push('📖 Baca Al-Quran minimal 1 halaman/hari setelah Subuh atau Maghrib — 15-20 menit');
    tasks.push('📿 Dzikir & doa setelah sholat — 5-10 menit');
    tasks.push('🌅 Sholat Dhuha (08.00-11.00) — 5 menit');
    tasks.push('🌙 Sholat Tahajud (sebelum Subuh) — 10-15 menit');
    tasks.push('📚 Belajar ilmu agama: baca buku/tonton kajian — 15 menit/hari');
    tasks.push('💝 Sedekah atau berbuat baik pada orang lain — setiap hari');
    tasks.push('🪞 Muhasabah: evaluasi diri sebelum tidur — 5 menit/malam');
  }
  // === GENERIC ===
  else {
    tasks.push(`🎯 Pahami tujuan utama: ${goal} — 15 menit`);
    tasks.push('📋 Tulis langkah-langkah yang diperlukan dari awal sampai akhir — 15 menit');
    tasks.push('🔧 Siapkan alat, bahan, dan sumber daya yang dibutuhkan — 30 menit');
    tasks.push('📅 Buat jadwal & timeline realistis — 15 menit');
    tasks.push('🚀 Mulai dari langkah pertama yang paling mudah — segera');
    tasks.push('⏰ Kerjakan secara bertahap: 1-2 jam/hari, konsisten — setiap hari');
    tasks.push('📝 Catat progress & hambatan setiap hari — 5 menit/hari');
    tasks.push('🔄 Evaluasi & sesuaikan rencana setiap minggu — 15 menit/minggu');
  }

  return res.status(200).json(tasks);
}
