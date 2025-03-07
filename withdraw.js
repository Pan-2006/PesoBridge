document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.transfer-step');
    const stepIndicators = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const submitButton = document.querySelector('.submit-withdraw');
    let currentStep = 0;

    // Handle Next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateCurrentStep()) {
                if (currentStep < steps.length - 1) {
                    steps[currentStep].classList.remove('active');
                    steps[currentStep + 1].classList.add('active');
                    stepIndicators[currentStep + 1].classList.add('active');
                    currentStep++;
                    updateSummary();
                }
            }
        });
    });

    // Handle Previous button clicks
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                steps[currentStep].classList.remove('active');
                steps[currentStep - 1].classList.add('active');
                stepIndicators[currentStep].classList.remove('active');
                currentStep--;
            }
        });
    });

    // Handle withdrawal method selection
    document.getElementById('withdrawMethod').addEventListener('change', function() {
        const otherMethodInput = document.getElementById('otherMethodInput');
        const otherMethodName = document.getElementById('otherMethodName');
        const bankDetails = document.getElementById('bankDetails');
        const accountInput = document.getElementById('accountNumber');
        
        // Show/hide other method input
        if (this.value === 'other') {
            otherMethodInput.style.display = 'block';
            otherMethodName.required = true;
        } else {
            otherMethodInput.style.display = 'none';
            otherMethodName.required = false;
            otherMethodName.value = '';
        }
    
        // Handle account number field visibility
        if (this.value === 'bank' || this.value === 'gcash' || this.value === 'paymaya') {
            bankDetails.style.display = 'block';
            accountInput.required = true;
        } else {
            bankDetails.style.display = 'none';
            accountInput.required = false;
            accountInput.value = '';
        }
    });

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
            // Update summary with user input
            document.getElementById('summaryName').textContent = document.getElementById('withdrawName').value;
            
            const methodSelect = document.getElementById('withdrawMethod');
            const methodValue = methodSelect.value === 'other' 
                ? document.getElementById('otherMethodName').value 
                : methodSelect.options[methodSelect.selectedIndex].text;
            document.getElementById('summaryMethod').textContent = methodValue;
            
            document.getElementById('summaryAccount').textContent = document.getElementById('accountNumber').value;
            
            const amount = parseFloat(document.getElementById('withdrawAmount').value) || 0;
            document.getElementById('summaryAmount').textContent = '₱ ' + amount.toFixed(2);

            // Calculate and update fees
            const fee = amount * 0.005; // 0.5% processing fee
            document.getElementById('processingFee').textContent = fee.toFixed(2);
            document.getElementById('totalAmount').textContent = (amount - fee).toFixed(2);
        }
    }

    // Handle form submission
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateCurrentStep()) {
            alert('Withdrawal request submitted successfully!');
            // Add your form submission logic here
        }
    });

    // Add real-time validation
    document.querySelectorAll('input[required], select[required]').forEach(input => {
        input.addEventListener('input', validateCurrentStep);
    });
});