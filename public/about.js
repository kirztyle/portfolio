document.addEventListener("DOMContentLoaded", function () {
    fetch("about.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((about) => {
        const aboutSection = about.about;
  
        // Tambahkan Nama dan Deskripsi
        document.querySelector(".about-col-2 .sub-title").innerHTML = `Hi, My name is <b>${aboutSection.name}</b>.`;
        document.querySelector(".about-col-2 p").textContent = aboutSection.description;
  
        // Tambahkan Skills
        const skillsContainer = document.getElementById("skills").querySelector("ul");
        aboutSection.skills.forEach((skill) => {
          const li = document.createElement("li");
          li.innerHTML = `<span>${skill.title}</span><br>${skill.description}`;
          skillsContainer.appendChild(li);
        });
  
        // Tambahkan Experience
        const experienceContainer = document.getElementById("experience").querySelector("ul");
        aboutSection.experience.forEach((exp) => {
          const li = document.createElement("li");
          li.innerHTML = `<span>${exp.title}</span><br>${exp.description}`;
          experienceContainer.appendChild(li);
        });
  
        // Tambahkan Education
        const educationContainer = document.getElementById("education").querySelector("ul");
        aboutSection.education.forEach((edu) => {
          const li = document.createElement("li");
          li.innerHTML = `<span>${edu.title}</span><br>${edu.year}`;
          educationContainer.appendChild(li);
        });
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });
  });

  fetch('myservice.json')
  .then(response => {
      if (!response.ok) {
          throw new Error('Gagal membaca file JSON');
      }
      return response.json();
  })
  .then(data => {
      const servicesList = document.getElementById('services-list');
      
      // Iterasi setiap item dalam data JSON
      data.forEach(item => {
          const serviceDiv = document.createElement('div');
          serviceDiv.className = 'service-item';

          // Menambahkan data ke elemen HTML
          serviceDiv.innerHTML = `
              <img src="${item.attachment.path}" alt="Lampiran Gambar" class="service-image" style="max-width: 100%; height: auto;">
              <h2>${item['service-title']}</h2>
              <p>${item['service-description']}</p>
              <h3>Used Tools: ${item['service-tools']}</h3>
          `;

          // Tambahkan elemen ke dalam daftar layanan
          servicesList.appendChild(serviceDiv);
      });
  })
  .catch(error => {
      console.error('Error:', error);
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    const servicesList = document.getElementById('services-list');
    servicesList.scrollBy({ left: 300, behavior: 'smooth' });
});

document.getElementById('prev-btn').addEventListener('click', () => {
    const servicesList = document.getElementById('services-list');
    servicesList.scrollBy({ left: -300, behavior: 'smooth' });
});

fetch('jobhist.json')
  .then(response => {
      if (!response.ok) {
          throw new Error('Gagal membaca file JSON');
      }
      return response.json();
  })
  .then(data => {
      const jobhistList = document.getElementById('jobhist-list');
      
      // Iterasi setiap item dalam data JSON
      data.forEach(item => {
          const jobhistDiv = document.createElement('div');
          jobhistDiv.className = 'jobhist-item';

          // Menambahkan data ke elemen HTML
          jobhistDiv.innerHTML = `
              <img src="${item.attachment.path}" alt="Lampiran Gambar" class="jobhist-image" style="max-width: 100%; height: auto;">
              <h2>${item['job-title']}</h2>
              <p>${item['job-description']}</p>
              <p><strong>Join Date:</strong> ${item['join-date']}</p>
              <p><strong>End Date:</strong> ${item['end-date']}</p>
          `;

          // Tambahkan elemen ke dalam daftar job histories
          jobhistList.appendChild(jobhistDiv);
      });
  })
  .catch(error => {
      console.error('Error:', error);
  });

document.getElementById('nexto-btn').addEventListener('click', () => {
    const jobhistList = document.getElementById('jobhist-list');
    jobhistList.scrollBy({ left: 300, behavior: 'smooth' });
});

document.getElementById('prevo-btn').addEventListener('click', () => {
    const jobhistList = document.getElementById('jobhist-list');
    jobhistList.scrollBy({ left: -300, behavior: 'smooth' });
});


