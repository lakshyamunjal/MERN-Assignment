// bind all the buttons on HTML page
window.addEventListener('load', bindEvents);

function bindEvents() {
    // get all the elements with class name: numbers
    var buttons = document.querySelectorAll('.numbers');

    // add EventListener to every element
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', numberPressed);
    }

    // add event listener for other keys
    document.querySelector('#multiply').addEventListener('click', calculate);
    document.querySelector('#add').addEventListener('click', calculate);
    document.querySelector('#divide').addEventListener('click', calculate);
    document.querySelector('#subtract').addEventListener('click', calculate);
    document.querySelector('#decimal').addEventListener('click', decimalClicked);
    document.querySelector('#equal').addEventListener('click', calculate);
    document.querySelector('#clearButton').addEventListener('click', clearInput);
    document.querySelector("#backspace").addEventListener('click', backspace);
}

function backspace() {
    var text = document.getElementById('equation').value;
    if (text.length > 0) {
        var newVal = text.substring(0, text.length - 1);
        document.getElementById('equation').value = newVal;
    }
}

var countOfOperators = 0;
// the button which is clicked can be found using this.
function calculate() {

    let input = document.getElementById('equation').value;
    console.log('Input: ', input);
    // check if equation has some number
    if (input.length > 0) {
        let lastElt = input.charAt(input.length - 1);
        let operator = this.value;
        if (isOperator(lastElt)) {
            return;
        }
        countOfOperators = (countOfOperators + 1) % 2;
        console.log('CountOfOperators: ', countOfOperators);

        let num1 = 0, num2 = 0;
        if (countOfOperators == 0) {
            // do math now
            let flag = false;

            for (var i = 0; i < input.length; i++) {
                // check if first number is negative
                if (input.charAt(0) == '-') {
                    // find the next operator and get the first number
                    for (var j = i + 1; j < input.length; j++) {
                        if (isOperator(input.charAt(j))) {
                            num1 = parseFloat(input.substring(0, j));
                            i = j;      // update i, since it will be used for second number
                            flag = true;
                            break;
                        }
                    }
                } else {
                    switch (input.charAt(i)) {
                        case '+':
                        case '-':
                        case '/':
                        case '*':
                            // if an operator is found, set first number
                            let n = input.substring(0, i);
                            //    console.log("num1: ",n);
                            num1 = parseFloat(n);
                            flag = true;
                            break;
                    }
                }
                if (flag == true)
                    break;
            }

            // num2 from i to end
            //  console.log('loop break at ', i, 'num2: ', input.substring(i + 1));
            let equationOperator = input.charAt(i);
            num2 = parseFloat(input.substring(i + 1));
            let output = 0;
            console.log('num1: ', num1, ', num2: ', num2, ', operator: ', equationOperator, ', countOfOperators: ' + countOfOperators);
            switch (equationOperator) {
                case '+':
                    output = num1 + num2;
                    break;

                case '-':
                    output = num1 - num2;
                    break;

                case '/':
                    output = num1 / num2;
                    break;

                case '*':
                    output = num1 * num2;
                    break;
            }

            //let currentSolvedPart = document.getElementById('msg').value;
            //document.getElementById('msg').innerText = currentSolvedPart + input;
            if (this.value == '=') {
                document.getElementById('equation').value = output;
                countOfOperators = 0;
                return;
            } else {
                document.getElementById('equation').value = output + operator;
                countOfOperators += 1;
        
                // the complete expression which is being solved
                document.getElementById('msg').innerText += operator;
            }
        } else {
            // there is just one number and one operator
            document.getElementById('equation').value = input + operator;
            document.getElementById('msg').innerText += operator;
        }
    }

}

function decimalClicked() {
    let input = document.getElementById('equation').value;

    if (input.length == 0) {
        document.getElementById('equation').value = '0.';
        return;
    }

    // there should a single decimal in a number
    if (input.length > 0) {
        // check if the last element in input is an operator
        let operator = input.charAt(input.length - 1);
        let flag = isOperator(operator);

        if (flag) {
            input += '0.';
            document.getElementById('equation').value = input;
        } else {
            // operator not found, check if a decimal is not already in the number
            let flag = false;

            for (let i = 0; i < input.length; i++) {
                let num = input.charAt(i);

                if (isOperator(num) == false) {
                    if (num == '.') {
                        // if . found, you cannot add more decimal in this number
                        flag = true;
                    }
                } else {
                    // end of a number
                    flag = false;
                }
            }
            if (flag == false)
                document.getElementById('equation').value = input + '.';
        }
    }
}

function isOperator(input) {
    switch (input) {
        case '+':
        case '-':
        case '*':
        case '/':
            return true;
            break;
    }
    return false;
}

function checkForValidInput() {
    var num = document.getElementById('equation').value;
    // check for empty string
    if (num == "") {
        return true;
    }
    // the last element can be an operation sign, we also need to check for that
    var lastElt = parseInt(num.charAt(num.length - 1));

    if (isNaN(lastElt) == false) {
        // input is valid
        return true;
    }

    return false;
}

function clearInput() {
    console.log('clear input clicked');
    document.getElementById("equation").value = "";
    countOfOperators = 0;
}

function numberPressed() {
    var equation = document.getElementById('equation').value + this.value;
    document.getElementById('equation').value = equation;
    console.log(this.value, " is pressed.");
    document.getElementById('msg').innerText += this.value;
}