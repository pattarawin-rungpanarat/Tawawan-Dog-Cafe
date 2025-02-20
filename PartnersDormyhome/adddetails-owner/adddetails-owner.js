const inputElement = document.getElementById('priceInput');

        inputElement.addEventListener('input', function() {
            let value = this.value.replace(/[^0-9]/g, '')
            this.value = value;
        });
        