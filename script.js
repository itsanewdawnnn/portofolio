// ID dan GID dari Google Sheet
const sheetID = '1JZ4OV-qpB_QhyXJMeNR9YRAL5GDuKYdAm62ch7ShteM';
const gid = '371636866';
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/export?format=csv&gid=${gid}`;

// Tampilkan elemen loader saat proses loading
function showLoader() {
  document.getElementById('loader').style.display = 'flex';
}

// Sembunyikan loader saat proses selesai
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// Fungsi utama untuk mengambil dan memuat data ke dalam tabel
function loadData() {
  showLoader(); // Tampilkan loading

  // Ambil elemen-elemen tabel
  const portfolioThead = document.querySelector('#portfolioTable thead');
  const portfolioTbody = document.querySelector('#portfolioTable tbody');
  const rekapThead = document.querySelector('#rekapitulasiTable thead');
  const rekapTbody = document.querySelector('#rekapitulasiTable tbody');

  // Kosongkan isi tabel sebelum diisi ulang
  portfolioThead.innerHTML = '';
  portfolioTbody.innerHTML = '';
  rekapThead.innerHTML = '';
  rekapTbody.innerHTML = '';

  // Fetch data dari Google Sheets dalam format CSV
  fetch(url)
    .then(res => res.text()) // Ambil data sebagai teks
    .then(csvText => {
      // Parse CSV menjadi array 2 dimensi
      Papa.parse(csvText, {
        complete: function(results) {
          const data = results.data;

          // === BAGIAN PORTOFOLIO ===
          const headRow = document.createElement('tr');
          for (let j = 0; j <= 7; j++) {
            const th = document.createElement('th');
            th.textContent = data[0][j] ?? ''; // Header dari baris pertama CSV
            headRow.appendChild(th);
          }
          portfolioThead.appendChild(headRow);

          // Isi data baris portofolio
          for (let i = 1; i < data.length; i++) {
            const row = data[i];
            // Lewati baris kosong
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

          // === BAGIAN REKAPITULASI ===
          const rekapHeader = document.createElement('tr');
          for (let j = 9; j <= 10; j++) {
            const th = document.createElement('th');
            th.textContent = data[0][j] ?? '';
            rekapHeader.appendChild(th);
          }
          rekapThead.appendChild(rekapHeader);

          // Baris rekap (hanya ambil 8 baris pertama)
          for (let i = 1; i <= 8; i++) {
            const tr = document.createElement('tr');
            for (let j = 9; j <= 10; j++) {
              const td = document.createElement('td');
              td.textContent = data[i]?.[j] ?? '';
              tr.appendChild(td);
            }
            rekapTbody.appendChild(tr);
          }

          hideLoader(); // Sembunyikan loading setelah selesai
        }
      });
    })
    .catch(err => {
      hideLoader();
      alert("Gagal mengambil data dari Google Sheets.");
      console.error(err);
    });
}

// Jalankan saat halaman pertama kali dibuka
window.onload = function () {
  loadData();
};
