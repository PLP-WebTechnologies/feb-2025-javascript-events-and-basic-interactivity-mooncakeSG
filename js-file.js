// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all event handlers and functionality
    initTabs();
    initInteractiveElements();
    initGallery();
    initFormValidation();
    initKeyboardEvents();
    
    // Set the current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// ==================== TAB FUNCTIONALITY ====================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content panes
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ==================== INTERACTIVE ELEMENTS ====================
function initInteractiveElements() {
    // Change color button
    const changeColorBtn = document.getElementById('change-color');
    let colorIndex = 0;
    const colors = ['#2ecc71', '#e74c3c', '#3498db', '#f39c12', '#9b59b6'];
    
    changeColorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
    });
    
    // Change text button
    const changeTextBtn = document.getElementById('change-text');
    const textOptions = ['Change My Text', 'Click Me Again!', 'Keep Going!', 'Almost There!', 'Back to Start!'];
    let textIndex = 0;
    
    changeTextBtn.addEventListener('click', function() {
        textIndex = (textIndex + 1) % textOptions.length;
        this.textContent = textOptions[textIndex];
    });
    
    // Secret button (double-click)
    const secretButton = document.getElementById('secret-button');
    
    secretButton.addEventListener('dblclick', function() {
        this.classList.add('color-change');
        this.textContent = '🎉 Secret Unlocked! 🎉';
        
        // Remove the animation class after it finishes
        setTimeout(() => {
            this.classList.remove('color-change');
        }, 2000);
    });
    
    // Long press detection (bonus)
    let pressTimer;
    
    secretButton.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            this.textContent = '🔥 Long Press Detected! 🔥';
            this.style.backgroundColor = '#e74c3c';
        }, 1000); // Long press threshold: 1 second
    });
    
    secretButton.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretButton.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // Hover effect for subtitle (already in CSS, but adding a JS effect too)
    const subtitle = document.querySelector('.subtitle');
    
    subtitle.addEventListener('mouseover', function() {
        this.textContent = "That's right, hover effects work!";
    });
    
    subtitle.addEventListener('mouseout', function() {
        this.textContent = "Hover over me for a surprise!";
    });
}

// ==================== KEYBOARD EVENTS ====================
function initKeyboardEvents() {
    const keyDisplay = document.getElementById('key-display');
    const keypressArea = document.querySelector('.keypress-area');
    
    // Make the keypress area clickable to ensure it gets focus
    keypressArea.addEventListener('click', function() {
        keyDisplay.textContent = 'Ready for input...';
        keyDisplay.style.backgroundColor = '#e8f4ff';
    });
    
    // Listen for keydown on the entire window to ensure it works
    window.addEventListener('keydown', function(event) {
        // Prevent default behaviors for some keys
        if (['Space', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
        }
        
        // Display the pressed key
        if (event.key === ' ' || event.key === 'Space') {
            keyDisplay.textContent = 'Spacebar';
            // Special effect for spacebar
            keyDisplay.classList.add('bounce');
            keyDisplay.style.backgroundColor = '#f8e8ff';
            setTimeout(() => {
                keyDisplay.classList.remove('bounce');
                keyDisplay.style.backgroundColor = '#fff';
            }, 500);
        } else {
            keyDisplay.textContent = event.key;
            keyDisplay.style.backgroundColor = '#e8fff0';
            
            // Reset styling after a short delay
            setTimeout(() => {
                keyDisplay.style.backgroundColor = '#fff';
            }, 300);
        }
        
        console.log('Key pressed:', event.key); // Debug info
    });
}

// ==================== GALLERY FUNCTIONALITY ====================
function initGallery() {
    const images = document.querySelectorAll('.gallery-images img');
    const dots = document.querySelectorAll('.gallery-dots .dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    
    // Function to show specific image
    function showImage(index) {
        // Hide all images and dots
        images.forEach(img => img.classList.remove('active-img'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected image and dot
        images[index].classList.add('active-img');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });
    
    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showImage(index);
        });
    });
    
    // Auto slideshow (optional)
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 5000); // Change image every 5 seconds
    
    // Pause slideshow when hovering over the gallery
    const galleryContainer = document.querySelector('.gallery-container');
    
    galleryContainer.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    galleryContainer.addEventListener('mouseleave', function() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 5000);
    });
}

// ==================== FORM VALIDATION ====================
function initFormValidation() {
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation (bonus feature)
    // Name validation
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            nameError.textContent = 'Name is required';
            this.classList.add('error');
            this.classList.remove('valid');
        } else {
            nameError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
    });
    
    // Email validation
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() === '') {
            emailError.textContent = 'Email is required';
            this.classList.add('error');
            this.classList.remove('valid');
        } else if (!emailRegex.test(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
            this.classList.add('error');
            this.classList.remove('valid');
        } else {
            emailError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
    });
    
    // Password validation
    passwordInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            passwordError.textContent = 'Password is required';
            this.classList.add('error');
            this.classList.remove('valid');
        } else if (this.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            this.classList.add('error');
            this.classList.remove('valid');
        } else {
            passwordError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
        
        // Check if confirm password needs to be updated
        if (confirmPasswordInput.value) {
            confirmPasswordInput.dispatchEvent(new Event('input'));
        }
    });
    
    // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
            this.classList.add('error');
            this.classList.remove('valid');
        } else if (this.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            this.classList.add('error');
            this.classList.remove('valid');
        } else {
            confirmPasswordError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Trigger validation for all fields
        nameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));
        confirmPasswordInput.dispatchEvent(new Event('input'));
        
        // Check if form is valid
        if (
            nameInput.classList.contains('valid') &&
            emailInput.classList.contains('valid') &&
            passwordInput.classList.contains('valid') &&
            confirmPasswordInput.classList.contains('valid')
        ) {
            // Show success message
            formSuccess.classList.remove('hidden');
            
            // Reset form after success (optional)
            setTimeout(() => {
                form.reset();
                formSuccess.classList.add('hidden');
                
                // Remove validation classes
                document.querySelectorAll('#validation-form input').forEach(input => {
                    input.classList.remove('valid');
                });
            }, 3000);
        }
    });
}