// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('show');
});

// Smooth scrolling for navigation links (only for real in-page #anchors —
// links to other pages like "about.html" are left alone so the browser
// navigates normally)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId.charAt(0) !== '#') {
            // Real page link (e.g. about.html) — close the mobile menu and
            // let the browser navigate there as usual.
            document.getElementById('navMenu').classList.remove('show');
            return;
        }

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        e.preventDefault();

        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        document.getElementById('navMenu').classList.remove('show');
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = document.getElementById('scrollTop');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 15, 28, 0.95)';
        header.style.padding = '10px 0';
        scrollTop.classList.add('active');
    } else {
        header.style.background = 'rgba(10, 15, 28, 0.9)';
        header.style.padding = '15px 0';
        scrollTop.classList.remove('active');
    }
});

// Scroll to top functionality
document.getElementById('scrollTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing effect (only present on the home page)
const typingText = document.getElementById('typingText');
const texts = [
    "Cybersecurity Expert",
    "Python Automation Specialist", 
    "IoT Security Researcher",
    "Security Educator",
    "Vulnerability Analyst",
    "Network Security Specialist"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect after page loads (only if the element exists on this page)
if (typingText) {
    window.addEventListener('load', () => {
        setTimeout(type, 1000);
    });
}

// Animated Network Background
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Node class
class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.1})`;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Create nodes (fewer on small / low-power screens — the connection loop is O(n^2))
const nodes = [];
const nodeCount = window.innerWidth < 768 ? 35 : 70;

for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node());
}

// Draw connections between nodes
function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - distance/150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    
    // Draw connections
    drawConnections();
    
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Animated counter for stats
function animateCounter(elementId, targetValue, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return; // stat isn't on this page
    let startValue = 0;
    const increment = targetValue / (duration / 16); // 60fps
    
    const updateCounter = () => {
        startValue += increment;
        if (startValue < targetValue) {
            element.textContent = Math.floor(startValue);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
        }
    };
    
    updateCounter();
}

// Start counters when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        animateCounter('projectsCount', 15);
        animateCounter('experienceYears', 3);
        animateCounter('certificationsCount', 5);
        animateCounter('clientsCount', 12);
    }, 1000);
});

// Quick links smooth scrolling (only for real in-page #anchors)
document.querySelectorAll('.quick-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId.charAt(0) !== '#') return;

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        e.preventDefault();

        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Scroll animation for elements
function checkScroll() {
    const elements = document.querySelectorAll('.timeline-item, .education-card, .cert-card, .service-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

/* ===================== Featured Projects Carousel =====================
 * Auto-moves to the next card every 1.5 seconds, loops forever, pauses on
 * hover, and supports the arrows, dots and touch-swipe.
 */
(function initProjectsCarousel() {
    const carousel = document.getElementById('projectsCarousel');
    const track = document.getElementById('projectsTrack');
    if (!carousel || !track) return;

    const viewport = carousel.querySelector('.carousel-viewport');
    const prevBtn = document.getElementById('projPrev');
    const nextBtn = document.getElementById('projNext');
    const dotsWrap = document.getElementById('projDots');

    const AUTOPLAY_MS = 1500; // 1.5 second gap between moves
    const ANIM_MS = 600;

    const originals = Array.from(track.children);
    const originalCount = originals.length;
    if (originalCount === 0) return;

    // Clone the first few cards so stepping forward loops seamlessly.
    const CLONES = Math.min(3, originalCount);
    for (let i = 0; i < CLONES; i++) {
        const clone = originals[i % originalCount].cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.classList.add('is-clone');
        track.appendChild(clone);
    }

    let index = 0;
    let timer = null;
    let isAnimating = false;

    function step() {
        const first = track.children[0];
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return first.getBoundingClientRect().width + gap;
    }

    function setTransform(animate) {
        track.style.transition = animate
            ? 'transform ' + ANIM_MS + 'ms cubic-bezier(0.4,0,0.2,1)'
            : 'none';
        track.style.transform = 'translateX(' + (-index * step()) + 'px)';
    }

    function updateDots() {
        const real = ((index % originalCount) + originalCount) % originalCount;
        Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === real));
    }

    function next() {
        if (isAnimating) return;
        isAnimating = true;
        index++;
        setTransform(true);
        updateDots();
        window.setTimeout(() => {
            if (index >= originalCount) {
                index = 0;
                setTransform(false);
            }
            isAnimating = false;
        }, ANIM_MS);
    }

    function prev() {
        if (isAnimating) return;
        isAnimating = true;
        if (index <= 0) {
            index = originalCount;      // jump (no animation) into the clones...
            setTransform(false);
            void track.offsetWidth;     // ...force reflow so the next move animates
        }
        index--;
        setTransform(true);
        updateDots();
        window.setTimeout(() => { isAnimating = false; }, ANIM_MS);
    }

    function goTo(i) {
        if (isAnimating || i === index) return;
        isAnimating = true;
        index = i;
        setTransform(true);
        updateDots();
        window.setTimeout(() => { isAnimating = false; }, ANIM_MS);
    }

    function play() { stop(); timer = window.setInterval(next, AUTOPLAY_MS); }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

    // Dots
    for (let i = 0; i < originalCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
        dot.addEventListener('click', () => { goTo(i); play(); });
        dotsWrap.appendChild(dot);
    }

    // Arrows
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); play(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); play(); });

    // Pause on hover / keyboard focus / hidden tab
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', play);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', play);
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : play(); });

    // Touch swipe
    let startX = 0, dragging = false;
    viewport.addEventListener('touchstart', (e) => {
        dragging = true; startX = e.touches[0].clientX; stop();
    }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
        if (!dragging) return;
        dragging = false;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        play();
    });

    // Keep alignment correct when the viewport size changes
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => setTransform(false), 150);
    });

    setTransform(false);
    play();
})();

/* ===================== XARMOR TV =====================
 *  📺  CHANGE THE CHANNEL HERE
 *  -----------------------------------------------------------------
 *  XARMOR TV embeds a YouTube channel's uploads directly: whenever you
 *  publish a new video on the channel, it shows up here automatically.
 *  The "Subscribe" button points to the same channel.
 *
 *  ▶ To switch to a DIFFERENT channel later, update BOTH lines below:
 *      1. TV_CHANNEL_URL — the channel link (used by the Subscribe button)
 *      2. TV_CHANNEL_ID  — the channel's ID, which always starts with "UC".
 *                          Find it in the channel page source (search for
 *                          "channelId") or with any YouTube channel ID finder.
 */
const TV_CHANNEL_URL = 'https://www.youtube.com/@xarmororg';
const TV_CHANNEL_ID  = 'UCdJXEO9-9bh5A2my4aBU4PQ'; // @xarmororg

// Cover image shown before play is pressed (purely cosmetic — change freely).
const TV_COVER = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

(function initXarmorTV() {
    const screen = document.getElementById('xtvScreen');
    if (!screen) return;

    // A channel's uploads live in a playlist whose id is the channel id with "UC" -> "UU".
    const uploadsPlaylist = 'UU' + TV_CHANNEL_ID.slice(2);

    // Point the Subscribe button at the configured channel.
    const sub = document.getElementById('xtvSubscribe');
    if (sub) sub.href = TV_CHANNEL_URL;

    function playChannel() {
        screen.innerHTML =
            '<iframe src="https://www.youtube.com/embed/videoseries?list=' + encodeURIComponent(uploadsPlaylist) +
            '&autoplay=1&rel=0&modestbranding=1" title="XARMOR TV — live from the XARMOR YouTube channel" allowfullscreen ' +
            'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>';
    }

    function showFacade() {
        screen.innerHTML =
            '<div class="xtv-facade" role="button" tabindex="0" aria-label="Play the XARMOR channel">' +
                '<img src="' + TV_COVER + '" alt="XARMOR TV cover">' +
                '<div class="xtv-scanlines"></div>' +
                '<div class="xtv-cover-label">' +
                    '<span class="xtv-cover-brand">XARMOR&nbsp;TV</span>' +
                    '<span class="xtv-cover-sub">Live from the XARMOR channel</span>' +
                '</div>' +
                '<div class="xtv-play"><i class="fas fa-play"></i></div>' +
            '</div>';
        const facade = screen.querySelector('.xtv-facade');
        facade.addEventListener('click', playChannel);
        facade.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playChannel(); }
        });
    }

    showFacade();
})();