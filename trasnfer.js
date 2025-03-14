document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.transfer-step');
    const stepIndicators = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const submitButton = document.querySelector('.submit-transfer');
    let currentStep = 0;

    // Handle Next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveToNextStep();
        });
    });

    // Handle Previous button clicks
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveToPreviousStep();
        });
    });

    function moveToNextStep() {
        if (validateCurrentStep()) {
            if (currentStep < steps.length - 1) {
                // Hide current step
                steps[currentStep].classList.remove('active');
                // Show next step
                steps[currentStep + 1].classList.add('active');
                // Update progress indicator
                stepIndicators[currentStep + 1].classList.add('active');
                currentStep++;
                updateSummary();
            }
        }
    }

    function moveToPreviousStep() {
        if (currentStep > 0) {
            // Hide current step
            steps[currentStep].classList.remove('active');
            // Show previous step
            steps[currentStep - 1].classList.add('active');
            // Update progress indicator
            stepIndicators[currentStep].classList.remove('active');
            currentStep--;
        }
    }

    function validateCurrentStep() {
        const currentStepElement = steps[currentStep];
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            const validationMessage = input.nextElementSibling;
            if (!input.value.trim()) {
                isValid = false;
                if (validationMessage && validationMessage.classList.contains('validation-message')) {
                    validationMessage.textContent = 'This field is required';
                }
                input.classList.add('invalid');
            } else {
                if (validationMessage && validationMessage.classList.contains('validation-message')) {
                    validationMessage.textContent = '';
                }
                input.classList.remove('invalid');
            }
        });

        return isValid;
    }

    function updateSummary() {
        if (currentStep === 2) {
            const senderName = document.getElementById('senderName').value;
            const recipientName = document.querySelector('.transfer-step:nth-child(2) input[type="text"]').value;
            const bankName = document.querySelector('.transfer-step:nth-child(2) select').value;
            const amount = parseFloat(document.getElementById('transferAmount').value) || 0;

            document.getElementById('summarySender').textContent = senderName;
            document.getElementById('summaryRecipient').textContent = recipientName;
            document.getElementById('summaryBank').textContent = bankName;
            document.getElementById('summaryAmount').textContent = '₱ ' + amount.toFixed(2);

            // Calculate fee (1% of transfer amount)
            const fee = amount * 0.01;
            document.getElementById('transferFee').textContent = fee.toFixed(2);
            document.getElementById('totalAmount').textContent = (amount + fee).toFixed(2);
        }
    }

    // Handle form submission
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateCurrentStep()) {
            alert('Transfer submitted successfully!');
            // Add your form submission logic here
        }
    });

    // Add input event listeners for real-time validation
    document.querySelectorAll('input[required], select[required]').forEach(input => {
        input.addEventListener('input', () => {
            validateCurrentStep();
        });
    // Add this to your existing JavaScript
document.getElementById('bankSelect').addEventListener('change', function() {
    const otherBankInput = document.getElementById('otherBankInput');
    const otherBankName = document.getElementById('otherBankName');
    
    if (this.value === 'other') {
        otherBankInput.style.display = 'block';
        otherBankName.required = true;
    } else {
        otherBankInput.style.display = 'none';
        otherBankName.required = false;
        otherBankName.value = '';
    }
});

// Modify your existing updateSummary function to include the custom bank name
function updateSummary() {
    if (currentStep === 2) {
        // ... existing summary code ...
        const bankSelect = document.getElementById('bankSelect');
        const bankName = bankSelect.value === 'other' 
            ? document.getElementById('otherBankName').value 
            : bankSelect.options[bankSelect.selectedIndex].text;
        document.getElementById('summaryBank').textContent = bankName;
        // ... rest of the summary code ...
    }
}

    });
});