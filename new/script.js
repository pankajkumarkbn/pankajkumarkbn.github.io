// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Navigation bar shrink on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed navbar
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
                }
            }
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show button after scrolling 300px
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            if (mobileMenu.classList.contains('open')) {
                mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>'; // Change to close icon
            } else {
                mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>'; // Change back to menu icon
            }
        });
    }


    // Simple Contact Form Handler (for demonstration)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission for this demo

            // Basic validation (you'd want more robust validation)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.className = 'mt-6 text-center text-red-500';
                return;
            }
            
            // Simulate form submission
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'mt-6 text-center text-blue-600';

            setTimeout(() => {
                // Replace this with actual form submission logic (e.g., using Fetch API to a backend)
                formStatus.textContent = 'Message sent successfully! Thank you.';
                formStatus.className = 'mt-6 text-center text-green-500';
                contactForm.reset(); // Clear the form
                
                setTimeout(() => { // Clear status message after a few seconds
                    formStatus.textContent = '';
                }, 5000);

            }, 2000); // Simulate network delay
        });
    }


    // Scroll Reveal Animation for sections (optional, can be performance intensive)
    const revealElements = document.querySelectorAll('.project-card, .skill-item, #about > div > div'); // Select elements to reveal

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after revealing to save resources
                // observer.unobserve(entry.target); 
            } else {
                // Optional: remove 'visible' if you want elements to re-animate when scrolling back up
                // entry.target.classList.remove('visible'); 
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust bottom margin to trigger a bit earlier
    });

    revealElements.forEach(el => {
        el.classList.add('reveal'); // Add initial state for animation
        revealObserver.observe(el);
    });

});
