const celulas = document.querySelectorAll('.board > div');  //Pegando as propriedades da div board e suas divs filhas
const victory = [
    [[1, 1, 1], 
     [1, 1, 1], 
     [1, 1, 1]],
    [[2, 2, 2], 
     [2, 2, 2], 
     [2, 2, 2]],
];

function animationLine(x, y){
    let container = document.getElementById('conteiner');
    let line;
    
    if (y == 1){
        line = document.createElement('div');
        line.className = 'line';
        container.appendChild(line);
        switch(x){
            case 1:
                line.style.bottom = '225px';
                line.style.left = '95px';
                break;
            case 2:
                line.style.bottom = '140px';
                line.style.left = '85px';
                break;
            case 3:
                line.style.bottom = '57.5px';
                line.style.left = '85px';
                break;
        }
    } else if (y == 2){
        line = document.createElement('div');
        line.className = 'line2';
        container.appendChild(line);
        switch(x){
            case 1:
                line.style.bottom = '5px';
                line.style.left = '157.5px';
                break;
            case 2:
                line.style.bottom = '5px';
                line.style.left = '245px';
                break;
            case 3:
                line.style.bottom = '5px';
                line.style.left = '326px';
                break;
        }
    } else if (y == 3){
        switch(x){
            case 1:
                container = document.getElementById('conteiner');
                line = document.createElement('div');
                line.className = 'line3';
                container.appendChild(line);
                line.style.rotate = '45deg';
                line.style.left = '120px';
                line.style.bottom = '265px';
                line.style.scale = '120%';
                break;
            case 2:
                container = document.getElementById('conteiner');
                line = document.createElement('div');
                line.className = 'line4';
                container.appendChild(line);
                line.style.rotate = '45deg';
                line.style.bottom = '-7.5px';
                line.style.left = '245px';
                line.style.scale = '120%';
                break;
        }
    }
}

pointX = 0;
pointO = 0;

const displayPointX = document.getElementById("placarX");
const displayPointO = document.getElementById("placarO");
displayPointX.textContent = pointX;
displayPointO.textContent = pointO;

const textoRef = document.getElementById("textID");

turn = 0;
deuVelha = 0;
lock = 0;

var theGame = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

bntID = [
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"]
];

function casa(colunm, row){
    let casa = theGame[colunm][row];
    let elemento = document.getElementById(bntID[colunm][row]);
    if (casa == 0 && lock == 0){
        if (turn % 2 == 0){
            theGame[colunm][row] = 1;
            turn += 1;
            let clickSound = new Audio('./snd/check.mp3')
            clickSound.addEventListener('canplaythrough', function() {
            clickSound.play(); 
            })
            // Insere o símbolo com o span para animação (somente o X é animado, sem borda)
            elemento.innerHTML = '<span class="symbol">X</span>';
            if(turn == 9){
                deuVelha = 1;
                verifyVictory();
            }
        } else {
            theGame[colunm][row] = 2;
            turn += 1;
            let clickSound = new Audio('./snd/check.mp3')
            clickSound.addEventListener('canplaythrough', function() {
            clickSound.play(); 
            })
            elemento.innerHTML = '<span class="symbol">O</span>';
            if(turn == 9){
                deuVelha = 1;
                verifyVictory();
            }
        }
        verifyVictory();
    }
}

function zerarTheGame(){
    theGame = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    textoRef.textContent = "";
    lock = 0;
    // Reinicia o conteúdo de cada célula usando innerHTML para reiniciar as animações
    for(let i = 0; i < bntID.length; i++){
        for(let j = 0; j < bntID[i].length; j++){
            let elemento = document.getElementById(bntID[i][j]);
            elemento.innerHTML = "";
        }
    }
    deuVelha = 0;
    turn = 0;
    // Remove o efeito de vitória do contêiner (se houver)
    document.getElementById('conteiner').classList.remove('winner-board');
    // Remove as linhas de vitória, se existirem
    let container = document.getElementById('conteiner');
    while(container.querySelector('.line') || container.querySelector('.line2') ||
          container.querySelector('.line3') || container.querySelector('.line4')){
        if(container.querySelector('.line')) container.removeChild(container.querySelector('.line'));
        if(container.querySelector('.line2')) container.removeChild(container.querySelector('.line2'));
        if(container.querySelector('.line3')) container.removeChild(container.querySelector('.line3'));
        if(container.querySelector('.line4')) container.removeChild(container.querySelector('.line4'));
    }
}

function animeFy(){
    if(JSON.stringify(theGame[0]) == JSON.stringify(victory[1][0]) || JSON.stringify(theGame[0]) == JSON.stringify(victory[0][0])){
        animationLine(1, 1);
    }
    if(JSON.stringify(theGame[1]) == JSON.stringify(victory[1][1]) || JSON.stringify(theGame[1]) == JSON.stringify(victory[0][1])){
        animationLine(2, 1);
    }
    if(JSON.stringify(theGame[2]) == JSON.stringify(victory[1][2]) || JSON.stringify(theGame[2]) == JSON.stringify(victory[0][2])){
        animationLine(3, 1);
    }
    if(theGame[0][0] == 2 && theGame[1][0] == 2 && theGame[2][0] == 2 || theGame[0][0] == 1 && theGame[1][0] == 1 && theGame[2][0] == 1){
        animationLine(1, 2);
    }
    if(theGame[0][1] == 2 && theGame[1][1] == 2 && theGame[2][1] == 2 || theGame[0][1] == 1 && theGame[1][1] == 1 && theGame[2][1] == 1){
        animationLine(2, 2);
    }
    if(theGame[0][2] == 2 && theGame[1][2] == 2 && theGame[2][2] == 2 || theGame[0][2] == 1 && theGame[1][2] == 1 && theGame[2][2] == 1 ){
        animationLine(3, 2);
    }
    if(theGame[0][0] == 2 && theGame[1][1] == 2 && theGame[2][2] == 2 || theGame[0][0] == 1 && theGame[1][1] == 1 && theGame[2][2] == 1){
        animationLine(1, 3);
        console.log('true');
    }
    if(theGame[0][2] == 2 && theGame[1][1] == 2 && theGame[2][0] == 2 || theGame[0][2] == 1 && theGame[1][1] == 1 && theGame[2][0] == 1){
        animationLine(2, 3);
        console.log('true');
    }
}

function verifyVictory(){
    if(JSON.stringify(theGame[0]) == JSON.stringify(victory[1][0]) 
        || JSON.stringify(theGame[1]) == JSON.stringify(victory[1][1])
        || JSON.stringify(theGame[2]) == JSON.stringify(victory[1][2])
        || theGame[0][0] == 2 && theGame[1][0] == 2 && theGame[2][0] == 2 
        || theGame[0][1] == 2 && theGame[1][1] == 2 && theGame[2][1] == 2 
        || theGame[0][2] == 2 && theGame[1][2] == 2 && theGame[2][2] == 2
        || theGame[0][0] == 2 && theGame[1][1] == 2 && theGame[2][2] == 2
        || theGame[0][2] == 2 && theGame[1][1] == 2 && theGame[2][0] == 2){
        textoRef.textContent = "O - VENCEU!";
        pointO++;
        displayPointX.textContent = pointX;
        displayPointO.textContent = pointO;
        lock = 1;
        let clickSound = new Audio('./snd/complete.mp3')
            clickSound.addEventListener('canplaythrough', function() {
            clickSound.play(); 
            })
        // Adiciona o efeito de brilho no contêiner ao vencer
        document.getElementById('conteiner').classList.add('winner-board');
        animeFy();
    } else if(JSON.stringify(theGame[0]) == JSON.stringify(victory[0][0]) 
        || JSON.stringify(theGame[1]) == JSON.stringify(victory[0][1])
        || JSON.stringify(theGame[2]) == JSON.stringify(victory[0][2])
        || theGame[0][0] == 1 && theGame[1][0] == 1 && theGame[2][0] == 1 
        || theGame[0][1] == 1 && theGame[1][1] == 1 && theGame[2][1] == 1 
        || theGame[0][2] == 1 && theGame[1][2] == 1 && theGame[2][2] == 1
        || theGame[0][0] == 1 && theGame[1][1] == 1 && theGame[2][2] == 1
        || theGame[0][2] == 1 && theGame[1][1] == 1 && theGame[2][0] == 1){
        textoRef.textContent = "X - VENCEU!";
        pointX++;
        displayPointX.textContent = pointX;
        displayPointO.textContent = pointO;
        lock = 1;
        let clickSound = new Audio('./snd/complete.mp3')
            clickSound.addEventListener('canplaythrough', function() {
            clickSound.play(); 
            })
        // Adiciona o efeito de brilho no contêiner ao vencer
        document.getElementById('conteiner').classList.add('winner-board');
        animeFy();
    } else if(deuVelha == 1){
        textoRef.textContent = "- EMPATE -";
        lock = 1;
        let clickSound = new Audio('./snd/failure.mp3')
            clickSound.addEventListener('canplaythrough', function() {
            clickSound.play(); 
            })
    }
}
