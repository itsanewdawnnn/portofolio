// ----------------------------------------
// KONFIGURASI: ID dan GID dari Google Sheet
// ----------------------------------------
const sheetID = '1JZ4OV-qpB_QhyXJMeNR9YRAL5GDuKYdAm62ch7ShteM'; // ID dokumen Google Sheet
const gid = '371636866'; // GID (tab tertentu dalam Google Sheets)
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/export?format=csv&gid=${gid}`; // URL CSV

// ----------------------------------------
// FUNGSI: Menampilkan animasi loader
// ----------------------------------------
function showLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

// ----------------------------------------
// FUNGSI: Menyembunyikan animasi loader
// ----------------------------------------
function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
}

// ----------------------------------------
// FUNGSI UTAMA: Ambil data dan tampilkan di tabel
// ----------------------------------------
function loadData() {
  showLoader(); // Tampilkan loader saat mulai proses

  // Ambil elemen-elemen target (thead & tbody) dari DOM
  const portfolioThead = document.querySelector('#tabel-portfolio thead');
  const portfolioTbody = document.querySelector('#tabel-portfolio tbody');
  const rekapitulasiThead = document.querySelector('#tabel-rekapitulasi thead');
  const rekapitulasiTbody = document.querySelector('#tabel-rekapitulasi tbody');

  // Kosongkan isi tabel sebelumnya (reset data)
  portfolioThead.innerHTML = '';
  portfolioTbody.innerHTML = '';
  rekapitulasiThead.innerHTML = '';
  rekapitulasiTbody.innerHTML = '';

  // Ambil file CSV dari Google Sheets
  fetch(url)
    .then(response => response.text()) // Ubah menjadi teks
    .then(csvText => {
      // Parse CSV dengan PapaParse
      Papa.parse(csvText, {
        complete: function(results) {
          const data = results.data;

          // ----------------------------------------
          // HEADER: Tabel Portofolio (kolom 0 s.d. 7)
          // ----------------------------------------
          const headRow = document.createElement('tr');
          for (let j = 0; j <= 7; j++) {
            const th = document.createElement('th');
            th.textContent = data[0][j] ?? ''; // Gunakan baris pertama sebagai header
            headRow.appendChild(th);
          }
          portfolioThead.appendChild(headRow);

          // ----------------------------------------
          // DATA: Tabel Portofolio (baris 1 s.d. akhir)
          // ----------------------------------------
          for (let i = 1; i < data.length; i++) {
            const row = data[i];

            // Lewati baris kosong (jika semua kolom 0-7 kosong)
            const isEmpty = row.slice(0, 8).every(cell => !cell || cell.trim() === '');
            if (isEmpty) continue;

            const tr = document.createElement('tr');
            for (let j = 0; j <= 7; j++) {
              const td = document.createElement('td');
              td.textContent = row[j] ?? '';
              tr.appendChild(td);
            }
            portfolioTbody.appendChild(tr);
          }

          // ----------------------------------------
          // HEADER: Tabel Rekapitulasi (kolom 9-10)
          // ----------------------------------------
          const rekapHeader = document.createElement('tr');
          for (let j = 9; j <= 10; j++) {
            const th = document.createElement('th');
            th.textContent = data[0][j] ?? '';
            rekapHeader.appendChild(th);
          }
          rekapitulasiThead.appendChild(rekapHeader);

          // ----------------------------------------
          // DATA: Tabel Rekapitulasi (baris 1-8)
          // ----------------------------------------
          for (let i = 1; i <= 8; i++) {
            const tr = document.createElement('tr');
            for (let j = 9; j <= 10; j++) {
              const td = document.createElement('td');
              td.textContent = data[i]?.[j] ?? '';
              tr.appendChild(td);
            }
            rekapitulasiTbody.appendChild(tr);
          }

          hideLoader(); // Sembunyikan loader setelah selesai
        }
      });
    })
    .catch(err => {
      hideLoader(); // Tetap sembunyikan loader meskipun gagal
      alert("Gagal mengambil data dari Google Sheets.");
      console.error("Detail error:", err);
    });
}

// ----------------------------------------
// JALANKAN SAAT HALAMAN DIMUAT
// ----------------------------------------
window.onload = loadData;
