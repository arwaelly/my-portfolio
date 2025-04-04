const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const projectBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav-link');
const currentYearEl = document.getElementById('current-year');

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Scroll event listener
window.addEventListener('scroll', () => {
  // Change navbar background on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Highlight active section in navbar
  highlightActiveSection();
});

// Highlight the current active section in navigation
function highlightActiveSection() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Project filtering
projectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and add to clicked button
    projectBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    
    // Filter project cards
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Form validation (basic)
  if (!name || !email || !subject || !message) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  // Here you would normally send the form data to a server
  // For demo purposes, we'll just log it and show a success message
  console.log({ name, email, subject, message });
  
  // Show success toast
  showToast('Message sent successfully!', 'success');
  
  // Clear form
  contactForm.reset();
});

// Toast notification
function showToast(message, type = 'success') {
  const toastMessage = document.querySelector('.toast-message');
  const toastIcon = document.querySelector('.toast-content i');
  
  // Set message
  toastMessage.textContent = message;
  
  // Set icon based on type
  if (type === 'error') {
    toastIcon.classList.remove('fa-check-circle');
    toastIcon.classList.add('fa-times-circle');
    toastIcon.style.color = 'var(--error)';
  } else {
    toastIcon.classList.remove('fa-times-circle');
    toastIcon.classList.add('fa-check-circle');
    toastIcon.style.color = 'var(--success)';
  }
  
  // Show toast
  toast.classList.add('show');
  
  // Hide toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Apply fade-in animation to elements when they enter the viewport
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  // Target elements to animate
  const animatedElements = document.querySelectorAll('.skill-card, .project-card, .about-image, .contact-method, .service-card, .testimonial-card');
  
  animatedElements.forEach(element => {
    element.classList.add('fade-in-section');
    observer.observe(element);
  });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Run these functions on initial load
  highlightActiveSection();
});
   
