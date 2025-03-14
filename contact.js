document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show sending status
        formStatus.innerHTML = '<div class="alert alert-info">Sending message...</div>';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            formStatus.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
            contactForm.reset();

            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }, 1500);
    });

    function validateForm() {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else {
                clearError(input);

                // Additional validation
                if (input.type === 'email' && !isValidEmail(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                }
                if (input.id === 'name' && !isValidName(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid name');
                }
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidName(name) {
        return /^[A-Za-z\s]{2,}$/.test(name);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('invalid');
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.classList.remove('invalid');
    }

    // Real-time validation
    contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                clearError(this);
            }
        });
    });
});