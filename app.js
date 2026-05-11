// MASTER NAVIGATION & ANIMATION ENGINE
const showPage = (pageId) => {
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(pageId);

    // If the target page doesn't exist or we are already there, stop.
    if (!targetPage || currentPage === targetPage) return;

    // 1. Close mobile menu if open
    const menu = document.getElementById('mobileMenu');
    if (menu?.classList.contains('active')) {
        toggleMobileMenu();
    }

    // 2. Execute Slide Transition
    // First, ensure the target page is display:block so the animation is visible
    targetPage.style.display = 'block';

    if (currentPage) {
        currentPage.classList.add('slide-out');
        currentPage.classList.remove('active');
    }

    targetPage.classList.add('slide-in');
    
    setTimeout(() => {
        targetPage.classList.remove('slide-in');
        targetPage.classList.add('active');
        
        setTimeout(() => {
            if (currentPage) {
                currentPage.classList.remove('slide-out');
                // Hide old page completely so it doesn't block clicks or layout
                currentPage.style.display = 'none'; 
            }
        }, 600);

        // Ensure new page is scrolled to top immediately
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, 50);
};

// SMART SCROLL (For sections inside the Home page)
const smartScroll = (sectionId) => {
    // If we aren't on home, go home first
    const homePage = document.getElementById('home');
    const isHomeActive = homePage.classList.contains('active');
    
    if (!isHomeActive) {
        showPage('home');
        // Wait for page transition to finish (~650ms), then scroll
        setTimeout(() => performScroll(sectionId), 650);
    } else {
        performScroll(sectionId);
    }
};

const performScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('nav').offsetHeight || 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
        });
    }
};

// NAVIGATION HELPERS
const navToServices = () => smartScroll('services-section');
const scrollToContact = () => smartScroll('contact-section');
const navToInventory = () => showPage('inventory'); // Direct page swap
const navAndClose = (pageId) => showPage(pageId);

// MOBILE MENU LOGIC
const toggleMobileMenu = () => {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
    
    const b1 = document.getElementById('bar1');
    const b2 = document.getElementById('bar2');
    const b3 = document.getElementById('bar3');
    
    if(menu.classList.contains('active')) {
        b1.style.transform = "translateY(8px) rotate(45deg)";
        b2.style.opacity = "0";
        b3.style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
        b1.style.transform = "none";
        b2.style.opacity = "1";
        b3.style.transform = "none";
    }
};

// MODAL CONTROLS
const openEmergency = () => {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
};

const closeEmergency = () => {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
};

// INITIAL LOAD TRIGGER
window.addEventListener('DOMContentLoaded', () => {
    // Ensure Home is visible and active on first load
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.style.display = 'block';
        setTimeout(() => {
            homePage.classList.add('active');
        }, 100);
    }
});