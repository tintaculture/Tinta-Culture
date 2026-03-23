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
                // Optional: Stop observing once faded in
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

    // Newsletter Form Submission & Modal Logic
    const newsletterForm = document.getElementById('newsletterForm');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.close-modal, #closeModalBtn');

    // EmailJS Initialization
    emailjs.init("nOlFTuXc-tAzsBCTT");

    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[name="user_email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            if(emailInput.value) {
                // Visual Loading State
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // EmailJS Integration
                const templateParams = {
                    user_email: emailInput.value,
                    message: "New subscriber for Tinta Culture!"
                };

                // Real EmailJS Call
                emailjs.send('service_axeawap', 'template_yrr0ukg', templateParams)
                    .then(function(response) {
                       console.log('SUCCESS!', response.status, response.text);
                       successModal.classList.add('active');
                       newsletterForm.reset();
                    }, function(error) {
                       console.log('FAILED...', error);
                       alert("Sorry, er is iets misgegaan bij het versturen. Probeer het later opnieuw.");
                    })
                    .finally(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            }
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
