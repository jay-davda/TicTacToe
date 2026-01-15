let clickSound = new Audio('click.mp3')
let drawSound = new Audio('draw.mp3')
let winSound = new Audio('win.wav')

let turn = 'X'
let gameOver = false;
let moves = 0; 

const changeTurn = () => {
    return turn === 'X' ? 'O' : 'X';
}

const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');

    let wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


    wins.forEach(win => {
        if (
            boxtexts[win[0]].innerText !== '' &&
            boxtexts[win[0]].innerText === boxtexts[win[1]].innerText &&
            boxtexts[win[1]].innerText === boxtexts[win[2]].innerText
        ) {
            document.getElementsByClassName('info')[0].innerText = boxtexts[win[0]].innerText + ' WON';
            winSound.play();
            gameOver = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    });
};

let boxes = document.getElementsByClassName('box')

Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');

    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameOver) {
            boxtext.innerText = turn;
            moves++; 

            turn = changeTurn();
            clickSound.play();
            checkWin();

        
            if (!gameOver) {
                if (moves === 9) {
                    document.getElementsByClassName('info')[0].innerText = "It's a Draw";
                    drawSound.play();
                    gameOver = true;
                } else {
                    document.getElementsByClassName('info')[0].innerText = 'Turn for ' + turn;
                }
            }
        }
    });
});

reset.addEventListener('click', () => {
    let boxtexts = document.getElementsByClassName('boxtext');

    Array.from(boxtexts).forEach(element => {
        element.innerText = ''
    });

    turn = 'X'
    gameOver = false
    moves = 0; 
    document.getElementsByClassName('info')[0].innerText = 'Turn for ' + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
});
