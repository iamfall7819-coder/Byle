// 1. Mengatur Animasi Logo Pembuka
window.addEventListener('load', () => {
    const introScreen = document.getElementById('intro-screen');
    if (!introScreen) {
        return;
    }

    const logoBadge = introScreen.querySelector('.logo-badge');
    const logoImage = logoBadge.querySelector('img');
    const fragmentsContainer = logoBadge.querySelector('.logo-fragments');
    const nameStage = introScreen.querySelector('.name-stage');
    const nameFragments = nameStage.querySelector('.name-fragments');
    const fragmentCount = 8;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        introScreen.classList.add('is-hidden');
        return;
    }

    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 1000;
    nameCanvas.height = 240;
    const context = nameCanvas.getContext('2d');
    context.font = 'bold 180px Segoe UI, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#d97706';
    context.fillText('Byle', nameCanvas.width / 2, nameCanvas.height / 2);

    function createFragments(container, imageUrl, className) {
        for (let row = 0; row < fragmentCount; row += 1) {
            for (let column = 0; column < fragmentCount; column += 1) {
                const fragment = document.createElement('span');
                const horizontalPosition = (column / (fragmentCount - 1)) * 100;
                const verticalPosition = (row / (fragmentCount - 1)) * 100;
                const angle = Math.atan2(row - 3.5, column - 3.5);
                const distance = 70 + Math.random() * 90;

                fragment.className = className;
                fragment.style.backgroundImage = `url("${imageUrl}")`;
                fragment.style.backgroundPosition = `${horizontalPosition}% ${verticalPosition}%`;
                fragment.style.setProperty('--scatter-x', `${Math.cos(angle) * distance}px`);
                fragment.style.setProperty('--scatter-y', `${Math.sin(angle) * distance}px`);
                fragment.style.setProperty('--scatter-rotation', `${Math.random() * 100 - 50}deg`);
                fragment.style.animationDelay = `${Math.random() * 180}ms`;
                container.appendChild(fragment);
            }
        }
    }

    createFragments(nameFragments, nameCanvas.toDataURL(), 'name-fragment');
    createFragments(fragmentsContainer, logoImage.src, 'logo-fragment');

    setTimeout(() => {
        nameStage.classList.add('is-shattering');

        setTimeout(() => {
            logoBadge.classList.add('is-shattering');

            setTimeout(() => {
                introScreen.classList.add('is-hidden');
            }, 3200);
        }, 3000);
    }, 900);
});

// 2. Data 13 Siswa
const dataSiswa = [
    { id: "siswa-1", nama: "1. Aditya Damara Putra Kristiawan", info: "Wakil Ketua • NIS: 0108737154" },
    { id: "siswa-2", nama: "2. Alfaza Oktavino Praditia", info: "Anggota Kelas • NIS: 0097678393" },
    { id: "siswa-3", nama: "3. Badria Nur Anisa", info: "Anggota Kelas • NIS: 0099940723" },
    { id: "siswa-4", nama: "4. Dwi Ayu Jayanti", info: "Ketua Kelas • NIS: 0108153368" },
    { id: "siswa-5", nama: "5. Ferdio Putra Prasetya", info: "Bendahara 1 • NIS: 0108026037" },
    { id: "siswa-6", nama: "6. Ketut Dimas Muhammad Risal", info: "Bendahara 2 • NIS: 0098437959" },
    { id: "siswa-7", nama: "7. Muhammad Yusron Ginanda", info: "Sekretaris • NIS: 0093234409" },
    { id: "siswa-8", nama: "8. Muhammad Riski Neo Valentino", info: "Anggota Kelas • NIS: 0089145134" },
    { id: "siswa-9", nama: "9. Muhammad Rizki", info: "Anggota Kelas • NIS: 0119631620" },
    { id: "siswa-10", nama: "10. Naufal Dzaki Hanif Abiyi", info: "Anggota Kelas • NIS: 0095829771" },
    { id: "siswa-11", nama: "11. Razky Gabril Wahyudi", info: "Seksi Kebersihan • NIS: 0099114829" },
    { id: "siswa-12", nama: "12. Rizky Widodo", info: "Anggota Kelas • NIS: 0109444333" },
    { id: "siswa-13", nama: "13. Supriyadi", info: "Anggota Kelas • NIS: 0113396361", posisiTengah: true }
];

const container = document.getElementById('students-container');
const searchInput = document.getElementById('searchInput');

// 3. Fungsi untuk Menampilkan Kartu Siswa
function tampilkanSiswa(daftar) {
    container.innerHTML = '';

    if (daftar.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color:#64748b;">Nama atau jabatan siswa tidak ditemukan.</p>';
        return;
    }

    daftar.forEach(siswa => {
        const cardHTML = `
            <div class="card${siswa.posisiTengah ? ' student-card--last' : ''}">
                <a class="profile-avatar-link" href="profile.html?id=${encodeURIComponent(siswa.id)}" aria-label="Buka profil ${siswa.nama}" title="Buka profil ${siswa.nama}">
                    <span class="avatar avatar-initial" aria-hidden="true">${siswa.nama.replace(/^\d+\.\s*/, '').charAt(0)}</span>
                </a>
                <div class="role-badge">Siswa SMKS PGRI</div>
                <h4>${siswa.nama}</h4>
                <p>${siswa.info}</p>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

if (container && searchInput) {
    tampilkanSiswa(dataSiswa);

    // 4. Fungsi Pencarian Real-Time
    searchInput.addEventListener('input', (e) => {
        const kataKunci = e.target.value.toLowerCase();
        const hasilFilter = dataSiswa.filter(siswa =>
            siswa.nama.toLowerCase().includes(kataKunci) ||
            siswa.info.toLowerCase().includes(kataKunci)
        );
        tampilkanSiswa(hasilFilter);
    });
}

const dataPimpinan = [
    { id: "kepala-sekolah", nama: "Irawan Adi Wasito, S.T.", peran: "Kepala Sekolah" },
    { id: "wali-kelas", nama: "Zulfi Amaliyah, S.Kom.", peran: "Wali Kelas" }
];

async function inisialisasiHalamanProfil() {
    const profilePage = document.getElementById('profile-page');
    if (!profilePage) {
        return;
    }

    const profileId = new URLSearchParams(window.location.search).get('id');
    const siswa = dataSiswa.find(item => item.id === profileId);
    const pimpinan = dataPimpinan.find(item => item.id === profileId);
    const profil = siswa
        ? { ...siswa, peran: siswa.info.split(' • ')[0] }
        : pimpinan;
    const nameElement = document.getElementById('profile-name');
    const roleElement = document.getElementById('profile-role');
    const statusElement = document.getElementById('profile-status');
    const initialElement = document.getElementById('profile-initial');
    const aboutText = document.getElementById('about-text');
    const loginForm = document.getElementById('profile-login-form');
    const usernameInput = document.getElementById('profile-username');
    const nameInput = document.getElementById('profile-name-value');
    const editor = document.getElementById('about-editor');
    const logoutButton = document.getElementById('profile-logout');
    const buatInisial = nama => nama.replace(/^\d+\.\s*/, '').trim().charAt(0).toUpperCase();
    const configReady = window.BYLE_SUPABASE_URL &&
        window.BYLE_SUPABASE_ANON_KEY &&
        !window.BYLE_SUPABASE_URL.includes('YOUR_PROJECT_ID') &&
        !window.BYLE_SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY');

    if (!profil) {
        nameElement.textContent = 'Profil tidak ditemukan';
        roleElement.textContent = '';
        statusElement.textContent = 'Periksa tautan profil, lalu pilih kembali ikon dari halaman daftar.';
        loginForm.hidden = true;
        return;
    }

    nameElement.textContent = profil.nama;
    roleElement.textContent = profil.peran;
    initialElement.textContent = buatInisial(profil.nama);

    if (!configReady || !window.supabase) {
        aboutText.textContent = 'Cerita profil akan tampil setelah koneksi Supabase disiapkan.';
        statusElement.textContent = 'Halaman ini belum terhubung ke Supabase. Admin situs perlu mengatur URL proyek dan public anon key.';
        return;
    }

    const client = window.supabase.createClient(
        window.BYLE_SUPABASE_URL,
        window.BYLE_SUPABASE_ANON_KEY
    );

    async function muatProfil() {
        const { data, error } = await client
            .from('profiles')
            .select('name, role, about')
            .eq('id', profileId)
            .single();

        if (error) {
            throw error;
        }

        nameElement.textContent = data.name;
        roleElement.textContent = data.role;
        initialElement.textContent = buatInisial(data.name);
        nameInput.value = data.name;
        aboutText.textContent = data.about || 'Belum ada cerita tentang diri yang ditambahkan.';
        document.getElementById('about-value').value = data.about || '';
    }

    async function perbaruiStatusLogin() {
        const { data, error } = await client.auth.getSession();
        if (error) {
            throw error;
        }

        const sudahLogin = Boolean(data.session);
        loginForm.hidden = sudahLogin;
        editor.hidden = !sudahLogin;
        logoutButton.hidden = !sudahLogin;
        if (sudahLogin) {
            statusElement.textContent = 'Anda sudah masuk. Perubahan hanya dapat disimpan ke profil yang ditugaskan untuk akun ini.';
        } else {
            statusElement.textContent = 'Profil dapat dibaca semua pengunjung. Masuk untuk memperbarui nama atau Tentang Saya.';
        }
    }

    loginForm.addEventListener('submit', async event => {
        event.preventDefault();
        const button = loginForm.querySelector('button[type="submit"]');
        button.disabled = true;
        statusElement.textContent = 'Sedang masuk...';

        try {
            const identifier = usernameInput.value.trim();
            const email = identifier.includes('@')
                ? identifier
                : `${identifier.toLowerCase()}@login.byle.invalid`;
            if (!identifier.includes('@') && !/^[a-z0-9._-]{3,32}$/i.test(identifier)) {
                statusElement.textContent = 'Username harus terdiri dari 3–32 huruf, angka, titik, garis bawah, atau tanda hubung.';
                return;
            }

            const { error } = await client.auth.signInWithPassword({
                email,
                password: document.getElementById('profile-password').value
            });

            if (error) {
                statusElement.textContent = `Gagal masuk: ${error.message}`;
                return;
            }

            await perbaruiStatusLogin();
        } catch (error) {
            statusElement.textContent = `Gagal masuk: ${error.message}`;
        } finally {
            button.disabled = false;
        }
    });

    editor.addEventListener('submit', async event => {
        event.preventDefault();
        const button = editor.querySelector('button[type="submit"]');
        button.disabled = true;
        statusElement.textContent = 'Menyimpan perubahan...';

        try {
            const { data, error } = await client
                .from('profiles')
                .update({
                    name: nameInput.value.trim(),
                    about: document.getElementById('about-value').value.trim()
                })
                .eq('id', profileId)
                .select('id, name')
                .maybeSingle();

            if (error || !data) {
                statusElement.textContent = error
                    ? `Gagal menyimpan. Pastikan akun ini ditugaskan ke profil ini. Detail: ${error.message}`
                    : 'Profil ini tidak ditugaskan ke akun yang sedang masuk. Hubungi admin situs.';
                return;
            }

            await muatProfil();
            statusElement.textContent = 'Profil berhasil disimpan dan dapat dilihat pengunjung.';
        } catch (error) {
            statusElement.textContent = `Gagal menyimpan profil: ${error.message}`;
        } finally {
            button.disabled = false;
        }
    });

    logoutButton.addEventListener('click', async () => {
        try {
            const { error } = await client.auth.signOut();
            if (error) {
                statusElement.textContent = `Gagal keluar: ${error.message}`;
                return;
            }

            await perbaruiStatusLogin();
        } catch (error) {
            statusElement.textContent = `Gagal keluar: ${error.message}`;
        }
    });

    try {
        await muatProfil();
        await perbaruiStatusLogin();
    } catch (error) {
        console.error('Gagal memuat profil Supabase:', error);
        aboutText.textContent = 'Cerita profil tidak dapat dimuat saat ini.';
        statusElement.textContent = `Profil gagal dimuat dari Supabase: ${error.message}`;
    }
}

inisialisasiHalamanProfil();
