document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('result');
    const stateSelect = document.getElementById('state');
    const basePriceInput = document.getElementById('base-price');

    const taxRates = {
        AK: { stateTax: 0, localTax: 0, exciseTax: 0 },
        AZ: { stateTax: 0.16, localTax: 0.02, exciseTax: 0 },
        CA: { stateTax: 0.15, localTax: 0.10, exciseTax: 0 },
        CO: { stateTax: 0.15, localTax: 0.08, exciseTax: 0 },
        CT: { stateTax: 0.0625, localTax: 0, exciseTax: 0.0375 },
        IL: { stateTax: 0.07, localTax: 0.03, exciseTax: 0.10 },
        MA: { stateTax: 0.0625, localTax: 0.03, exciseTax: 0.1075 },
        MI: { stateTax: 0.06, localTax: 0, exciseTax: 0.10 },
        MT: { stateTax: 0.04, localTax: 0, exciseTax: 0.16 },
        NV: { stateTax: 0.0685, localTax: 0.0315, exciseTax: 0.10 },
        NJ: { stateTax: 0.0625, localTax: 0.02, exciseTax: 0 },
        NM: { stateTax: 0.12, localTax: 0, exciseTax: 0 },
        NY: { stateTax: 0.13, localTax: 0.04, exciseTax: 0 },
        OR: { stateTax: 0.17, localTax: 0.03, exciseTax: 0 },
        VT: { stateTax: 0.06, localTax: 0, exciseTax: 0.14 },
        VA: { stateTax: 0.0530, localTax: 0, exciseTax: 0.2125 },
        WA: { stateTax: 0.37, localTax: 0, exciseTax: 0 }
    };

    // Function to check if the user is on a mobile device
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Add event listeners for real-time validation
    stateSelect.addEventListener('change', validateForm);
    basePriceInput.addEventListener('input', validateForm);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const state = stateSelect.value;
        const basePrice = parseFloat(basePriceInput.value);

        if (!state || isNaN(basePrice)) {
            alert('Please select a state and enter a valid base price.');
            return;
        }

        const { stateTax, localTax, exciseTax } = taxRates[state];
        
        const stateTaxAmount = basePrice * stateTax;
        const localTaxAmount = basePrice * localTax;
        const exciseTaxAmount = basePrice * exciseTax;
        const totalPrice = basePrice + stateTaxAmount + localTaxAmount + exciseTaxAmount;

        document.getElementById('display-base-price').textContent = basePrice.toFixed(2);
        document.getElementById('state-tax').textContent = stateTaxAmount.toFixed(2);
        document.getElementById('local-tax').textContent = localTaxAmount.toFixed(2);
        document.getElementById('excise-tax').textContent = exciseTaxAmount.toFixed(2);
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);

        resultDiv.classList.remove('hidden');
    });

    // Set up the base price input
    if (isMobile()) {
        basePriceInput.setAttribute('type', 'number');
        basePriceInput.setAttribute('step', '0.01');
        basePriceInput.setAttribute('min', '0');
    } else {
        basePriceInput.setAttribute('type', 'text');
        basePriceInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
    }

    function validateForm() {
        const state = stateSelect.value;
        const basePrice = parseFloat(basePriceInput.value);
        const submitButton = form.querySelector('button[type="submit"]');

        if (state && !isNaN(basePrice) && basePrice > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Initial validation
    validateForm();
});
