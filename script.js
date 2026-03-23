// Initialize EmailJS at the top
(function() {
    emailjs.init("nOlFTuXc-tAzsBCTT");
})();

document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.05)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.02)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
        }
    });

    // Newsletter Form Submission using sendForm (More Reliable)
    const newsletterForm = document.getElementById('newsletterForm');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.close-modal, #closeModalBtn');

    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Visual Loading
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const emailInput = newsletterForm.querySelector('input[name="user_email"]');
            const hiddenEmail = document.getElementById('hiddenEmail');
            if(hiddenEmail) hiddenEmail.value = emailInput.value;

            // Uses the HTML Form directly for maximum reliability
            emailjs.sendForm('service_axeawap', 'template_yrr0ukg', newsletterForm)
                .then(function() {
                    console.log('SUCCESS: Email Sent');
                    successModal.classList.add('active');
                    newsletterForm.reset();
                }, function(error) {
                    console.log('FAILED: ', error);
                    alert("Fout bij versturen: " + JSON.stringify(error));
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Modal Close Logic
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    });

    // Close modal on outside click
    successModal.addEventListener('click', (e) => {
        if(e.target === successModal) {
            successModal.classList.remove('active');
        }
    });

});
