// Fungsi untuk menampilkan form sesuai dengan pilihan dan menambahkan ID otomatis
function tampilkanForm() {
    const selectedValue = document.getElementById('section').value;
    const formSections = document.querySelectorAll('.form-section');
    
    // Menyembunyikan semua form
    formSections.forEach(form => form.style.display = 'none');
    
    // Menampilkan form yang sesuai dengan pilihan
    if (selectedValue) {
        const selectedForm = document.getElementById(selectedValue);
        if (selectedForm) {
            selectedForm.style.display = 'block';
            generateAutoIDs(selectedValue); // Menambahkan ID otomatis saat form dipilih
        }
    }
}

// Fungsi untuk menambahkan ID otomatis berdasarkan konten yang dipilih
function generateAutoIDs(section) {
    console.log('Generating IDs for section:', section); // Debugging: Cek bagian yang dipilih

    if (section === 'my-work') {
        // Menambahkan ID otomatis untuk form My Work
        const jobTitle = document.getElementById('job-title');
        const jobDescription = document.getElementById('job-description');
        const joinDate = document.getElementById('join-date');
        const endDate = document.getElementById('end-date');
        const workAttachment = document.getElementById('work-attachment');
        
        if (jobTitle && jobDescription && joinDate && endDate && workAttachment) {
            jobTitle.id = 'job-title-' + generateUniqueID();
            jobDescription.id = 'job-description-' + generateUniqueID();
            joinDate.id = 'join-date-' + generateUniqueID();
            endDate.id = 'end-date-' + generateUniqueID();
            workAttachment.id = 'work-attachment-' + generateUniqueID();
            
            console.log('IDs generated for My Work form');
        } else {
            console.error('Elements not found for My Work form');
        }
    } else if (section === 'my-service') {
        // Menambahkan ID otomatis untuk form My Service
        const serviceTitle = document.getElementById('service-title');
        const serviceDescription = document.getElementById('service-description');
        const serviceTools = document.getElementById('service-tools');
        const attachment = document.getElementById('attachment');
        
        if (serviceTitle && serviceDescription && serviceTools && attachment) {
            serviceTitle.id = 'service-title-' + generateUniqueID();
            serviceDescription.id = 'service-description-' + generateUniqueID();
            serviceTools.id = 'service-tools-' + generateUniqueID();
            attachment.id = 'attachment-' + generateUniqueID();
            
            console.log('IDs generated for My Service form');
        } else {
            console.error('Elements not found for My Service form');
        }
    }
}

// Fungsi untuk menghasilkan ID unik (bisa menggunakan timestamp atau random number)
function generateUniqueID() {
    return 'id-' + new Date().getTime(); // Menggunakan timestamp untuk ID unik
}

// Event listener untuk form "My Work"
document.getElementById('my-work-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah form submit default

    const formData = new FormData(event.target); // Gunakan FormData untuk mengirimkan form data (termasuk file)

    // Mengirim data ke server
    fetch('/submit-job-history', { // Ubah endpoint ke /submit-job-history
        method: 'POST',
        body: formData, // Kirim formData tanpa menambahkan headers 'Content-Type'
    })
    .then(response => {
        if (!response.ok) throw new Error('Gagal menyimpan data');
        return response.json();
    })
    .then(result => {
        alert(result.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan, data gagal disimpan.');
    });
});

// Event listener untuk form "My Service"
document.getElementById('my-service-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah form submit default

    const formData = new FormData(event.target); // Gunakan FormData untuk mengirimkan form data (termasuk file)

    // Mengirim data ke server
    fetch('/submit-service', { // Ubah endpoint ke /submit-service
        method: 'POST',
        body: formData, // Kirim formData tanpa menambahkan headers 'Content-Type'
    })
    .then(response => {
        if (!response.ok) throw new Error('Gagal menyimpan data');
        return response.json();
    })
    .then(result => {
        alert(result.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan, data gagal disimpan.');
    });
});
