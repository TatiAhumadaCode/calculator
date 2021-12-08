const numbersKey = document.querySelectorAll('[data-number]');
const operatorsKey = document.querySelectorAll('[data-operator]');
const equalKey = document.querySelector('[data-equal]');
const eraserKey = document.querySelector('[data-eraser]');
const allClearKey = document.querySelector('[data-all-clear]');
const previousOutputText = document.querySelector('[data-previous-operand]');
const currentOutputText = document.querySelector('[data-current-operand]');


//constructor 

class Calculator {
    constructor(previousOutputText, currentOutputText) {
        this.previousOutputText = previousOutputText
        this.currentOutputText = currentOutputText
        this.clear()
    }

    clear() {
        this.currentOutput = ''
        this.previousOutput = ''
        this.operation = undefined
    }

    delete() {
        this.currentOutput = this.currentOutput.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOutput.includes('.')) return;
        this.currentOutput = this.currentOutput.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOutput === '') return;
        if(this.previousOutput !== '') {
            this.compute();
        }
        this.operation = operation
        this.previousOutput = this.currentOutput
        this.currentOutput = ''
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOutput);
        const current = parseFloat(this.currentOutput);
        if(isNaN(prev) || isNaN(current)) return;
        
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / computation;
                break;
            default:
                return;
        }
        this.currentOutput = computation;
        this.operation = undefined;
        this.previousOutput = '';
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number);
        if(isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }

    updateDisplay() {
        this.currentOutputText.innerText = this.getDisplayNumber(this.currentOutput)
        if(this.operation != null) {
            this.previousOutputText.innerText = `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`;
        } else {
            this.previousOutputText.innerText = '';
        }
    }
}


const calculator = new Calculator(previousOutputText, currentOutputText);


//events 

numbersKey.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorsKey.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalKey.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearKey.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

eraserKey.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})