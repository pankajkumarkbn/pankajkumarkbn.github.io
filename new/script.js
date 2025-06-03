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
                // Adjusted offset for potentially taller scrolled navbar or if sections are very close to top
                const offsetPosition = elementPosition - navbarHeight - 10; // Added small extra offset
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open and it's a link inside the mobile menu
                if (mobileMenu && mobileMenu.classList.contains('open') && this.closest('#mobile-menu')) {
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


    // Typed.js for Hero Subtitle
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle && typeof Typed !== 'undefined') {
        new Typed('#hero-subtitle', {
            strings: [
                'Cyber Security Expert.',
                'Application Risk Analyst.',
                'Threat Mitigation Specialist.',
                'Guardian of Digital Fortresses.'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            smartBackspace: true,
            showCursor: true,
            cursorChar: '_',
        });
    } else if (!heroSubtitle) {
        console.warn("Element with ID 'hero-subtitle' not found for Typed.js.");
    } else if (typeof Typed === 'undefined') {
        console.warn("Typed.js library not loaded.");
    }


    // Simple Contact Form Handler (for demonstration)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission for this demo

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Error: All fields are required.';
                formStatus.className = 'mt-6 text-center text-red-400';
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) { // Basic email validation
                formStatus.textContent = 'Error: Please enter a valid email address.';
                formStatus.className = 'mt-6 text-center text-red-400';
                return;
            }
            
            formStatus.textContent = 'Transmitting secure message...';
            formStatus.className = 'mt-6 text-center text-cyan-400';

            setTimeout(() => {
                // Replace this with actual form submission logic (e.g., using Fetch API to a backend)
                formStatus.textContent = 'Message received. Awaiting decryption... Acknowledged!';
                formStatus.className = 'mt-6 text-center text-green-400';
                contactForm.reset(); 
                
                setTimeout(() => { 
                    formStatus.textContent = '';
                    formStatus.className = 'mt-6 text-center'; // Reset class
                }, 5000);

            }, 2000); 
        });
    }


    // Scroll Reveal Animation for sections
    // Selecting more specific elements for reveal for better control
    const revealElements = document.querySelectorAll(
        '.project-card, .skill-item, #about .md\\:w-1\\/3 img, #about .md\\:w-2\\/3 > p, #about .md\\:w-2\\/3 > div, #contact .max-w-2xl'
    ); 

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay based on element index for a staggered effect (optional)
                // const delay = Array.from(revealElements).indexOf(entry.target) * 100;
                // setTimeout(() => {
                //     entry.target.classList.add('visible');
                // }, delay);
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional: unobserve after first reveal
            } else {
                // Optional: remove 'visible' to re-animate on scroll up
                // entry.target.classList.remove('visible'); 
            }
        });
    }, {
        root: null, 
        threshold: 0.1, 
        rootMargin: '0px 0px -30px 0px' // Trigger a bit earlier
    });

    revealElements.forEach(el => {
        el.classList.add('reveal'); // Add initial state for animation
        revealObserver.observe(el);
    });

});
