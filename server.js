const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // Mengimpor multer
const bodyParser = require('body-parser');

const app = express();

// Konfigurasi multer untuk menyimpan file di folder 'uploads' dengan nama yang sesuai
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads'); // Tentukan folder tempat menyimpan file
    // Pastikan folder 'uploads' ada
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Tentukan folder untuk menyimpan file
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Mendapatkan ekstensi file asli
    const timestamp = Date.now(); // Menambahkan timestamp untuk nama unik
    const fileName = `${timestamp}-${file.originalname}`; // Menyimpan file dengan nama asli
    cb(null, fileName); // Simpan file dengan nama yang sesuai
  }
});

// Filter file untuk hanya mengizinkan tipe tertentu (misalnya gambar dan PDF)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']; // Hanya image dan PDF yang diperbolehkan
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Lanjutkan jika tipe file diperbolehkan
  } else {
    cb(new Error('Only images and PDFs are allowed!'), false); // Tolak jika tipe file tidak diperbolehkan
  }
};

// Inisialisasi multer dengan konfigurasi storage dan filter
const upload = multer({ storage, fileFilter });

app.use(express.json());
app.use(express.static('public'));

// Menyajikan file statis dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // File yang diupload bisa diakses via URL

// Route untuk menerima data form dan file
app.post('/submit-job-history', upload.single('attachment'), (req, res) => {
  const data = req.body;

  // Jika ada file yang diupload, tambahkan informasi file ke data
  if (req.file) {
    data.attachment = {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      path: `/uploads/${req.file.filename}`, // Path untuk file yang bisa diakses via URL
    };
  }

  // Path ke file jobhist.json
  const filePath = path.join(__dirname, 'public', 'jobhist.json');

  // Membaca file jobhist.json dan menambahkan data baru
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server Error');
    }

    const jsonData = JSON.parse(fileData || '[]');
    jsonData.push(data);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Server Error');
      }
      res.status(200).send({ message: 'Job history berhasil disimpan' });
    });
  });
});
// Mengupdate data json
app.post('/jobhist', (req, res) => {
  const updatedData = req.body;

  fs.writeFile(jobhistFilePath, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error writing file' });
    }
    res.json({ message: 'Data updated successfully!' });
  });
});

// Route untuk menerima data form dan file untuk my-service
app.post('/submit-service', upload.single('attachment'), (req, res) => {
  const data = req.body;

  // Jika ada file yang diupload, tambahkan informasi file ke data
  if (req.file) {
    data.attachment = {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      path: `/uploads/${req.file.filename}`, // Path untuk file yang bisa diakses via URL
    };
  }

  // Path ke file myservice.json
  const filePath = path.join(__dirname, 'public', 'myservice.json');

  // Membaca file myservice.json dan menambahkan data baru
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server Error');
    }

    const jsonData = JSON.parse(fileData || '[]');
    jsonData.push(data);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Server Error');
      }
      res.status(200).send({ message: 'Service berhasil disimpan' });
    });
  });
});

// Error handling untuk upload file
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Only images and PDFs are allowed!') {
    return res.status(400).send({ error: err.message });
  }
  next(err);
});

// Menggunakan Body Parser
app.use(bodyParser.json());

//Routing file directory
const jobhistFilePath = path.join(__dirname, 'public', 'jobhist.json');

//Membaca data json
app.get('/jobhist', (req, res) => {
  fs.readFile(jobhistFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    res.json(JSON.parse(data));
  });
});

//Mengupdate data json
app.post('/jobhist', (req, res) => {
  const updatedData = req.body;

  fs.writeFile(jobhistFilePath, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error writing file' });
    }
    res.json({ message: 'Data updated successfully!' });
  });
});

//Menghapus data job json
app.post('/delete-job-history', (req, res) => {
  const updatedData = req.body; // Mengambil data yang dikirim oleh frontend

  const filePath = './public/jobhist.json'; // Lokasi file JSON

  // Menyimpan data yang sudah diperbarui ke file JSON
  fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
    res.status(200).json({ success: true, message: 'Pekerjaan berhasil dihapus' });
  });
});

//Menghapus data service json
app.post('/delete-service-history', (req, res) => {
  const updatedData = req.body; // Mengambil data yang dikirim oleh frontend

  const filePath = './public/myservice.json'; // Lokasi file JSON

  // Menyimpan data yang sudah diperbarui ke file JSON
  fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
    res.status(200).json({ success: true, message: 'Service berhasil dihapus' });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
