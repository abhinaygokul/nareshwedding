// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            icon.style.color = 'var(--text-main)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            icon.style.color = window.scrollY > 50 ? 'var(--text-main)' : '#fff';
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            icon.style.color = window.scrollY > 50 ? 'var(--text-main)' : '#fff';
        });
    });

    // --- Countdown Timer ---
    // Set the date we're counting down to (Oct 11, 2026 23:36:00)
    const countDownDate = new Date("Oct 11, 2026 23:36:00").getTime();

    // Update the count down every 1 second
    const countdownFunction = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.querySelector(".countdown-container").innerHTML = "<h3>Just Married!</h3>";
        }
    }, 1000);

    // --- Modern Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Floating Hearts Animation ---
    const createHeart = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 5 + 's'; // 5-8 seconds
        heart.style.opacity = Math.random() * 0.4 + 0.1;
        
        hero.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    };
    setInterval(createHeart, 600); // create a heart every 600ms

    // --- Music Toggle ---
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    if (musicControl && bgMusic) {
        musicControl.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicControl.classList.remove('playing');
                musicControl.innerHTML = '<i class="fas fa-music"></i>';
            } else {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
                musicControl.classList.add('playing');
                musicControl.innerHTML = '<i class="fas fa-compact-disc"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    // --- Envelope Animation ---
    const envelopeContainer = document.getElementById('openEnvelopeBtn');
    const envelopeOverlay = document.getElementById('envelope-overlay');

    if (envelopeContainer && envelopeOverlay) {
        // Prevent scrolling while envelope is active
        document.body.style.overflow = 'hidden';

        envelopeContainer.addEventListener('click', () => {
            envelopeContainer.classList.add('open');
            
            // Auto-play music when they open the envelope (solves browser autoplay restrictions!)
            if (bgMusic && !isPlaying) {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
                if (musicControl) {
                    musicControl.classList.add('playing');
                    musicControl.innerHTML = '<i class="fas fa-compact-disc"></i>';
                }
                isPlaying = true;
            }

            // Hide the overlay after animation completes (approx 2.5s)
            setTimeout(() => {
                envelopeOverlay.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }, 2500);
        });
    }

    // --- Interactive Scroll Path (Timeline) ---
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Starts drawing when timeline top reaches 70% of viewport
            const startDraw = windowHeight * 0.7;
            let progress = 0;
            
            if (rect.top < startDraw) {
                const scrolledIntoTimeline = startDraw - rect.top;
                // Add some padding to total height so it reaches 100% easily
                const totalScrollable = rect.height; 
                progress = Math.min(100, Math.max(0, (scrolledIntoTimeline / totalScrollable) * 100));
            }
            
            timeline.style.setProperty('--scroll-progress', `${progress}%`);
        });
    }

    // --- Cinematic 3D Mouse-Tracking (Holographic Effect) ---
    const cards3D = document.querySelectorAll('.event-card, .gallery-item');
    cards3D.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (!card.classList.contains('active')) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8deg
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.zIndex = 10;
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) return;
            card.style.transition = 'transform 0.5s ease-out';
            card.style.transform = ''; // Reset to default CSS
            card.style.zIndex = '';
        });
    });

    // --- Scratch-off Canvas ---
    const canvas = document.getElementById('scratchCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let isDrawing = false;

        // Fill canvas with gold foil texture
        const fillCanvas = () => {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#bf953f');
            gradient.addColorStop(0.5, '#fcf6ba');
            gradient.addColorStop(1, '#b38728');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw a subtle border inside the foil
            ctx.strokeStyle = "rgba(0,0,0,0.1)";
            ctx.lineWidth = 4;
            ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
            
            ctx.fillStyle = "rgba(0,0,0,0.5)"; // Much darker text
            ctx.font = "bold 28px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("SCRATCH HERE", canvas.width / 2, canvas.height / 2);
            
            ctx.globalCompositeOperation = 'destination-out';
        };

        fillCanvas();

        const getMousePos = (e) => {
            const rect = canvas.getBoundingClientRect();
            // Handle both touch and mouse events
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (canvas.width / rect.width),
                y: (clientY - rect.top) * (canvas.height / rect.height)
            };
        };

        const scratch = (e) => {
            if (!isDrawing) return;
            const pos = getMousePos(e);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 35, 0, Math.PI * 2);
            ctx.fill();
        };

        canvas.addEventListener('mousedown', () => isDrawing = true);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mousemove', scratch);
        
        // Mobile support
        canvas.addEventListener('touchstart', (e) => { 
            // Prevent scrolling while scratching
            if (e.target === canvas) e.preventDefault();
            isDrawing = true; 
            scratch(e); 
        }, { passive: false });
        canvas.addEventListener('touchend', () => isDrawing = false);
        canvas.addEventListener('touchmove', (e) => { 
            if (e.target === canvas) e.preventDefault();
            scratch(e); 
        }, { passive: false });
    }

});
