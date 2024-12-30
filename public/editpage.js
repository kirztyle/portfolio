// Fungsi untuk memuat data dari server
function loadDataToForm(index) {
    fetch('/jobhist')
      .then(response => response.json())
      .then(data => {
        const item = data[index];
        document.getElementById('job-title').value = item['job-title'];
        document.getElementById('job-description').value = item['job-description'];
        document.getElementById('join-date').value = item['join-date'];
        document.getElementById('end-date').value = item['end-date'];
      })
      .catch(error => console.error('Error loading data:', error));
  }
  
  // Fungsi untuk menyimpan data ke server
  function saveData(index) {
    fetch('/jobhist')
      .then(response => response.json())
      .then(data => {
        // Perbarui data berdasarkan input form
        data[index] = {
          'job-title': document.getElementById('job-title').value,
          'job-description': document.getElementById('job-description').value,
          'join-date': document.getElementById('join-date').value,
          'end-date': document.getElementById('end-date').value,
          'attachment': null // Jika ingin mendukung file upload, tambahkan logika di sini
        };
  
        // Kirim data yang diperbarui ke server
        return fetch('/jobhist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      })
      .then(() => {
        alert('Data updated successfully!');
      })
      .catch(error => console.error('Error saving data:', error));
  }
  
  // Event listener untuk form submit
  document.getElementById('edit-form').addEventListener('submit', function (event) {
    event.preventDefault();
    saveData(0); // Ubah "0" dengan index data yang sedang diedit
  });
  
  // Memuat data pertama kali
  loadDataToForm(0); // Ubah "0" dengan index data yang ingin diedit
  