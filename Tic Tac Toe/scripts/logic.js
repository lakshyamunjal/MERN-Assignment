
window.addEventListener('load', bindEvents);

var winner = '';
var start = 0;      // 0(zero) for O and 1 for X
var clicked = [];

function bindEvents() {
    document.getElementById('turn').innerText = 'O\'s turn';
    
    document.querySelector('#b1').addEventListener('click', buttonClick);
    document.querySelector('#b2').addEventListener('click', buttonClick);
    document.querySelector('#b3').addEventListener('click', buttonClick);
    document.querySelector('#b4').addEventListener('click', buttonClick);
    document.querySelector('#b5').addEventListener('click', buttonClick);
    document.querySelector('#b6').addEventListener('click', buttonClick);
    document.querySelector('#b7').addEventListener('click', buttonClick);
    document.querySelector('#b8').addEventListener('click', buttonClick);
    document.querySelector('#b9').addEventListener('click', buttonClick);
    document.querySelector('#playAgain').addEventListener('click', function(){
        location.reload();
    });
    

    for (var i = 1; i < 10; i++)
        clicked[i] = false;
}

function disableAllButtons() {
    let id = '#b';
    for (var i = 1; i < 10; i++) {
        document.querySelector(id + i).disabled = true;
    }
    document.getElementById('playAgain').hidden = false;
}

function checkForWin(turn) {

    let winSequence = ['123', '456', '789', '147', '258', '369', '159', '357'];

    if (turn == 'X') {
        // check for X at every button in winSequence
        for (let i = 0, j = 0; i < winSequence.length; i++) {
            for (j = 0; j < 3; j++) {
                let index = winSequence[i].charAt(j);
                let btnId = 'b' + index;
                let valueAtButton = document.getElementById(btnId).innerText;

                if (valueAtButton != 'X')
                    break;
            }
            if (j == 3) {
                // X was found in winSequence, X wins
                document.getElementById('result').innerText = 'X wins';
                disableAllButtons();
                return;
            }
        }
    }

    if (turn == 'O') {
        // check for O at every button in winSequence
        for (let i = 0, j = 0; i < winSequence.length; i++) {
            for (j = 0; j < 3; j++) {
                let index = winSequence[i].charAt(j);
                let btnId = 'b' + index;
                let valueAtButton = document.getElementById(btnId).innerText;

                if (valueAtButton != 'O')
                    break;
            }
            if (j == 3) {
                // O was found in winSequence, O wins
                document.getElementById('result').innerText = 'O wins';
                disableAllButtons();
                return;
            }
        }
    }

    allButtonsClicked();
}

function allButtonsClicked() {
    //console.log('checking if all buttons have been clicked');
    //console.log(clicked);
    for (var i = 1; i < 10; i++) {
        if (clicked[i] == false) {
            //        console.log('no yet clicked');
            return;
        }
    }

    // all buttons have been clicked, it is a draw
    document.getElementById('result').innerText = "It is a draw";
    document.getElementById('playAgain').hidden = false;
}

function buttonClick() {

    if (clicked[this.value] == false) {
        // change the text of this button
        var id = 'b' + this.value;
        // set button clicked to true
        clicked[this.value] = true;

        if (start % 2 == 0) {
            console.log('trying to change button color for O');
            document.getElementById(id).innerText = 'O';
            document.getElementById(id).className='btn btn-success';
            checkForWin('O');
        } else {
            console.log('trying to change button color for X');
            document.getElementById(id).className='btn btn-warning';
            document.getElementById(id).innerText = 'X';
            checkForWin('X');
        }

        start = (start + 1) % 2;

        if(start % 2 == 0){
            document.getElementById('turn').innerText = 'O\'s Turn';
        }else{
            document.getElementById('turn').innerText = 'X\'s Turn';
        }
    }
}
