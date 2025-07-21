// Menunggu hingga seluruh konten halaman (DOM) dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', function() {

    // --- Efek Smooth Scroll untuk Navigasi ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Efek Bayangan pada Header Saat Scroll ---
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // --- Fungsionalitas Form Kontak EmailJS ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        // Inisialisasi EmailJS dengan Public Key Anda
        (function() {
            emailjs.init({
              publicKey: "nDw3DQtAnYsZ5c5x6", // Kunci Anda sudah terpasang
            });
        })();

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const status = document.getElementById('form-status');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Mengirim...';
            status.style.display = 'none';

            emailjs.sendForm('service_nml3pgq', 'template_gjnhogu', this)
                .then(function(response) {
                    status.innerHTML = "Terima kasih! Pesan Anda telah berhasil dikirim.";
                    status.className = 'success';
                    contactForm.reset();
                }, function(error) {
                    status.innerHTML = "Oops! Terjadi masalah saat mengirim pesan.";
                    status.className = 'error';
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Kirim Pesan';
                    status.style.display = 'block';
                });
        });
    }
});