//Variables declaration
var diceArray = [];
var audioDices = new Audio('./assets/res/sounds/dices_roll.wav');
var audioSelectDice = new Audio('./assets/res/sounds/selectdice.mp3');
var audioCheckScore = new Audio('./assets/res/sounds/checkscore.mp3');
var audioEndgame = new Audio('../audio/endgame.wav');
var audioRestart = new Audio('../audio/restart.mp3');
var throwN = 1;
var turnsPlayed = 0;
var turn = true;
var strValues = '';
var player1, player2;
var throwButton = $("#button_throw");
var disableClicks = false;
//Regex to test games
var generalaRegex = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/;
var escaleraRegex = /12345|23456|13456/;
var pokerRegex = /1{4}(2|3|4|5|6)|((12{4})|(2{4}(3|4|5|6)))|(((1|2)3{4})|(3{4}(4|5|6)))|(((1|2|3)4{4})|(4{4}(5|6)))|(((1|2|3|4)5{4})|(5{4}6))|(1|2|3|4|5)6{4}/;
var fullRegex = /(1{2})(2{3}|3{3}|4{3}|5{3}|6{3})|(1{3})(2{2}|3{2}|4{2}|5{2}|6{2})|(2{2})(3{3}|4{3}|5{3}|6{3})|(2{3})(3{2}|4{2}|5{2}|6{2})|(3{2})(4{3}|5{3}|6{3})|(3{3})(4{2}|5{2}|6{2})|(4{2})(5{3}|6{3})|(4{3})(5{2}|6{2})|(5{2})(6{3})|(5{3})(6{2})/;
var fullRegex2 = /(.)\1{2}(.)\2|(.)\3(.)\4{2}/;
// Constructor function for Dice objects
function Dice(value, selected, img) {
    this.value = value;
    this.selected = selected;
    this.img = img;
}
//Constructor function for Player objects
function Player(name, points) {
    this.name = name;
    this.points = points;
    this.one = -1;
    this.two = -1;
    this.three = -1;
    this.four = -1;
    this.five = -1;
    this.six = -1;
    this.escalera = -1;
    this.full = -1;
    this.poker = -1;
    this.generala = -1;
}
//LocalStorage
myStorage = window.localStorage;
if (typeof myStorage !== 'undefined') {
    if (myStorage.getItem('Players') === null) {
        //No players loaded in localStorage
    } else {
        //Load players points from localStorage
        var players = JSON.parse(myStorage.getItem('Players'));
    }
    if (myStorage.getItem('Generala') === null) {
        //There isn't a game saved
        var pointsP1 = 0;
        var pointsP2 = 0;
        player1 = new Player(players[0].name, pointsP1);
        player2 = new Player(players[1].name, pointsP2);
        console.log(player1.name, player2.name);
        $('#namep1').text(player1.name);
        $('#namep2').text(player2.name);
    } else {
        //There is a game saved
        //Load
        var generala = JSON.parse(myStorage.getItem('Generala'));
        player1 = new Player(generala.Player1.name, generala.Player1.points);
        player2 = new Player(generala.Player2.name, generala.Player2.points);
        player1.one = generala.Player1.one;
        player1.two = generala.Player1.two;
        player1.three = generala.Player1.three;
        player1.four = generala.Player1.four;
        player1.five = generala.Player1.five;
        player1.six = generala.Player1.six;
        player1.escalera = generala.Player1.escalera;
        player1.full = generala.Player1.full;
        player1.poker = generala.Player1.poker;
        player1.generala = generala.Player1.generala;
        player2.one = generala.Player2.one;
        player2.two = generala.Player2.two;
        player2.three = generala.Player2.three;
        player2.four = generala.Player2.four;
        player2.five = generala.Player2.five;
        player2.six = generala.Player2.six;
        player2.escalera = generala.Player2.escalera;
        player2.full = generala.Player2.full;
        player2.poker = generala.Player2.poker;
        player2.generala = generala.Player2.generala;
        turn = generala.Turn;
        turnsPlayed = generala.TurnsPlayed;
        /* boardSize = parseInt(memotest.Size);
        player1.pairs = memotest.Player1.pairs;
        player2.pairs = memotest.Player2.pairs; */
        drawGridStorage(generala);
        $('#namep1').text(player1.name);
        $('#namep2').text(player2.name);
    }

} else {
    console.log("myStorage UNDEFINED");
    // localStorage not defined
}
//Function to draw the grid with the scores from storage
function drawGridStorage(generala) {
    //PLAYER1
    if (player1.one !== -1) {
        var el = $("#onep1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.one));
    }
    if (player1.two !== -1) {
        var el = $("#twop1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.two));
    }
    if (player1.three !== -1) {
        var el = $("#threep1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.three));
    }
    if (player1.four !== -1) {
        var el = $("#fourp1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.four));
    }
    if (player1.five !== -1) {
        var el = $("#fivep1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.five));
    }
    if (player1.six !== -1) {
        var el = $("#sixp1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.six));
    }
    if (player1.escalera !== -1) {
        var el = $("#escalerap1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.escalera));
    }
    if (player1.full !== -1) {
        var el = $("#fullp1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.full));
    }
    if (player1.poker !== -1) {
        var el = $("#pokerp1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.poker));
    }
    if (player1.generala !== -1) {
        var el = $("#generalap1");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player1.generala));
    }
    //PLAYER2
    if (player2.one !== -1) {
        var el = $("#onep2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.one));
    }
    if (player2.two !== -1) {
        var el = $("#twop2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.two));
    }
    if (player2.three !== -1) {
        var el = $("#threep2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.three));
    }
    if (player2.four !== -1) {
        var el = $("#fourp2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.four));
    }
    if (player2.five !== -1) {
        var el = $("#fivep2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.five));
    }
    if (player2.six !== -1) {
        var el = $("#sixp2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.six));
    }
    if (player2.escalera !== -1) {
        var el = $("#escalerap2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.escalera));
    }
    if (player2.full !== -1) {
        var el = $("#fullp2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.full));
    }
    if (player2.poker !== -1) {
        var el = $("#pokerp2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.poker));
    }
    if (player2.generala !== -1) {
        var el = $("#generalap2");
        el.removeAttr('onclick');
        el.text(JSON.stringify(player2.generala));
    }
}
/* Function that calls the specific function for the turn at play (1st, 2nd or 3rd) */
function throwDices() {
    if (disableClicks) {
        //If disableClicks == true, it means a score has been clicked, so the play is over and a new turn has to start
        changeTurn();
        $("#dice_container").empty();
        $('#button_throw').text('Lanzar 1er tiro');
    } else {
        if (turn) {
            $("#p1").removeClass('invisible');
            $("#p2").addClass('invisible');
        } else {
            $("#p2").removeClass('invisible');
            $("#p1").addClass('invisible');
        }

        $("#grid").removeClass('invisible');
        switch (throwN) {
            case 1:
                firstThrow();
                break;
            case 2:
                otherThrow(2);
                break;
            case 3:
                otherThrow(3);
                throwButton.addClass("choose");
                throwButton.removeAttr('onclick');
                throwButton.text('¡Elegí tu juego!');
                break;
        }
    }
}
//Function for the 1st throw.
function firstThrow() {
    //Starts a for loop for all the dices (5)
    for (let i = 0; i < 5; i++) {
        //Gets the random value for Dice
        var value = rnd();
        var imagePath = '';
        //Depending on the value, assign the correct image to imagePath
        switch (value) {
            case 1:
                imagePath = './assets/res/img/1.svg';
                break;
            case 2:
                imagePath = './assets/res/img/2.svg';
                break;
            case 3:
                imagePath = './assets/res/img/3.svg';
                break;
            case 4:
                imagePath = './assets/res/img/4.svg';
                break;
            case 5:
                imagePath = './assets/res/img/5.svg';
                break;
            case 6:
                imagePath = './assets/res/img/6.svg';
                break;
            default:
                break;
        }
        // Create a Dice object with value, selected(false for now) and the path to the img
        let myDice = new Dice(value, false, imagePath);
        //push myDice to the dices Array
        diceArray.push(myDice);
    }
    audioDices.play();
    //Sorts diceArray to test with regex
    diceArray.sort(compare);
    var imgsHTML = '';
    for (let i = 0; i < diceArray.length; i++) {
        const dice = diceArray[i];
        //append the <img> to the HTML string
        imgsHTML += "<img id='img" + JSON.stringify(i) + "' src='" + dice.img + "' alt='Dado' class='dice' onclick='select(" + JSON.stringify(i) + ")'>";
    }
    //appends HTML string to div
    $("#dice_container").append(imgsHTML);
    //Next throw
    throwN++;
    $("#button_throw").text("Lanzar 2do tiro");
    checkGeneralaServida();
}
//Function for 2nd and 3rd throws
function otherThrow(n) {
    //Filter the array searching for dices selected and creates a new one
    var newArr = diceArray.filter(filterBySelection);
    //Get the number of new dices to get
    var qDicesToFill = 5 - newArr.length;
    if (qDicesToFill != 0) {
        //call function that returns new diceArray
        diceArray = fillDicesArray(qDicesToFill, newArr);
    }
    //Sort it again
    diceArray.sort(compare);
    var imgsHTML = '';
    for (let i = 0; i < diceArray.length; i++) {
        const dice = diceArray[i];
        //append the <img> to the HTML string
        if (dice.selected) {
            imgsHTML += "<img id='img" + JSON.stringify(i) + "' src='" + dice.img + "' alt='Dado' class='dice selected' onclick='select(" + JSON.stringify(i) + ")'>";
        } else {
            imgsHTML += "<img id='img" + JSON.stringify(i) + "' src='" + dice.img + "' alt='Dado' class='dice' onclick='select(" + JSON.stringify(i) + ")'>";
        }
    }
    //empty actual container and fill it with new HTML string
    $('#dice_container').empty();
    $("#dice_container").append(imgsHTML);
    var audio = new Audio('./assets/res/sounds/dices_roll.wav');
    audio.play();
    if (throwN === 3) {
        $("#button_throw").addClass('disable');
        return;
    }
    throwN++;
    $("#button_throw").text("Lanzar 3er tiro");
}

function filterBySelection(dice) {
    if (dice.selected) {
        return true;
    } else {
        return false;
    }
}

function fillDicesArray(qDices, arr) {
    for (let i = 0; i < qDices; i++) {
        //Gets the random value for Dice
        var value = rnd();
        var imagePath = '';
        //Depending on the value, assign the correct image to imagePath
        switch (value) {
            case 1:
                imagePath = './assets/res/img/1.svg';
                break;
            case 2:
                imagePath = './assets/res/img/2.svg';
                break;
            case 3:
                imagePath = './assets/res/img/3.svg';
                break;
            case 4:
                imagePath = './assets/res/img/4.svg';
                break;
            case 5:
                imagePath = './assets/res/img/5.svg';
                break;
            case 6:
                imagePath = './assets/res/img/6.svg';
                break;
            default:
                break;
        }
        // Create a Dice object with value, selected(false for now) and the path to the img
        let myDice = new Dice(value, false, imagePath);
        //push myDice to the dices Array
        arr.push(myDice);
    }
    return arr;
}

function win() {
    //Create new array with the values of Player objects
    var p1PointsArr = Object.values(player1);
    var p2PointsArr = Object.values(player2);
    var p1Points = player1.points;
    var p2Points = player2.points;
    console.log(p1PointsArr, p2PointsArr);
    //The scores range from position 2 to the end
    for (let i = 2; i < p1PointsArr.length; i++) {
        if (p1PointsArr[i] !== -1) {
            p1Points = p1Points + p1PointsArr[i];
        }
        if (p2PointsArr[i] !== -1) {
            p2Points = p2Points + p2PointsArr[i];
        }
    }
    player1.points = p1Points;
    player2.points = p2Points;
    //Sum Generala scores to the scores of the players in the app (localStorage)
    players[0].points += player1.points;
    players[1].points += player2.points;
    myStorage.setItem('Players', JSON.stringify(players));
    //Show end-game div
    var winDiv = $('#winDiv');
    if (player1.points > player2.points) {
        winDiv.append('<h1>¡Ganó ' + player1.name + '!</h1><span onclick="restart()">Empezar nueva partida</span>');
        winDiv.removeClass('invisible');
    } else {
        if (player1.points === player2.points) {
            winDiv.append('<h1>¡Empate!</h1><span onclick="restart()">Empezar nueva partida</span>');
            winDiv.removeClass('invisible');
        } else {
            winDiv.append('<h1>¡Ganó ' + player2.name + '!</h1><span onclick="restart()">Empezar nueva partida</span>');
            winDiv.removeClass('invisible');
        }
    }
    audioEndgame.play();
    $('#results').removeClass('invisible');
    $('#dice_container').addClass('invisible');
    $('#p1').removeClass('invisible');
    $('#p2').removeClass('invisible');
    /* $('#juegos').append("<div class='fix'>TOTAL</div>");
    $('#p1').append("<p class='points_total'>" + JSON.stringify(player1.points) + "</p>")
    $('#p2').append("<p class='points_total'>" + JSON.stringify(player2.points) + "</p>") */
    $('#points_p1').text(JSON.stringify(player1.points));
    $('#points_p2').text(JSON.stringify(player2.points));
    $('#name_p1').text(player1.name);
    $('#name_p2').text(player2.name);
    //Erase Generala from localStorage because the match has ended
    myStorage.removeItem('Generala');
}

function changeTurn() {
    disableClicks = false;
    turnsPlayed++;
    if (turnsPlayed === 20) {
        win();
    } else {
        turn = !turn;
        throwN = 1;
        $("#dice_container").empty();
        diceArray = [];
        throwButton.attr('onclick', 'throwDices()');
        throwButton.text('Lanzar 1er tiro');
        $('#grid').addClass('invisible');
        if (turn) {
            var div2 = $("#p2");
            var div1 = $("#p1");
            div2.addClass('invisible');
            div1.removeClass('invisible');
        } else {
            var div2 = $("#p2");
            var div1 = $("#p1");
            div2.removeClass('invisible');
            div1.addClass('invisible');
        }
        //Creates object generala with current gameState to save it in localStorage
        generala = {
            Player1: player1,
            Player2: player2,
            Turn: turn,
            TurnsPlayed: turnsPlayed
        };
        myStorage.setItem('Generala', JSON.stringify(generala));
    }

}
//Show div with instructions
function showInfo() {
    $('#overlay').removeClass('disappear');
    $('#overlay').addClass('fade-in');
}
//Hide div with instructions
function closeInfo() {
    $('#overlay').addClass('disappear');
    $('#overlay').removeClass('fade-in');
}
//Restart game
function restart() {
    audioRestart.play();
    myStorage.removeItem('Generala');
    diceArray = [];
    $('#dice_container').empty();
    player1 = new Player(players[0].name, 0);
    player2 = new Player(players[1].name, 0);
    turnsPlayed = 0;
    throwN = 1;
    turn = true;
    $('#grid').addClass('invisible');
    $('#p2').addClass('invisible');
    $('#p1').removeClass('invisible');
    $('#winDiv').addClass('invisible');
    $('#button_throw').text('Lanzar 1er tiro');
    disableClicks = false;
    var els = document.getElementsByClassName('points');
    Array.prototype.forEach.call(els, function (el) {
        // Do stuff here
        el.innerHTML = '-';
        console.log(el.onclick);
    });
    reassignOnClicks();
}

function reassignOnClicks() {
    for (let i = 1; i <= 10; i++) {
        switch (i) {
            case 1:
                document.getElementById('onep1').onclick = check1New;
                document.getElementById('onep2').onclick = check1New;
                break;
            case 2:
                document.getElementById('twop1').onclick = check2New;
                document.getElementById('twop2').onclick = check2New;
                break;
            case 3:
                document.getElementById('threep1').onclick = check3New;
                document.getElementById('threep2').onclick = check3New;
                break;
            case 4:
                document.getElementById('fourp1').onclick = check4New;
                document.getElementById('fourp2').onclick = check4New;
                break;
            case 5:
                document.getElementById('fivep1').onclick = check5New;
                document.getElementById('fivep2').onclick = check5New;
                break;
            case 6:
                document.getElementById('sixp1').onclick = check6New;
                document.getElementById('sixp2').onclick = check6New;
                break;
            case 7:
                document.getElementById('escalerap1').onclick = checkEscaleraNew;
                document.getElementById('escalerap2').onclick = checkEscaleraNew;
                break;
            case 8:
                document.getElementById('fullp1').onclick = checkFullNew;
                document.getElementById('fullp2').onclick = checkFullNew;
                break;
            case 9:
                document.getElementById('pokerp1').onclick = checkPokerNew;
                document.getElementById('pokerp2').onclick = checkPokerNew;
                break;
            default:
                document.getElementById('generalap1').onclick = checkGeneralaNew;
                document.getElementById('generalap2').onclick = checkGeneralaNew;
        }
    }
}

function popUp(points) {
    function onConfirm(buttonIndex) {
        alert('You selected button ' + buttonIndex);
    }
    navigator.notification.confirm(
        'Sumarás ' + points + ' puntos.', // message
        onConfirm, // callback to invoke with index of button pressed
        '¿Estás seguro?', // title
        ['Sí', 'No'] // buttonLabels
    );
}
//FUNCTIONS CALLED WHEN GAME SELECTED (1|2|3|4|5|6|Escalera|Full|Poker|Generala)
function check1New() {
    console.log("check1New");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        var points = (strValues.match(/1/g) || []).length;
        pointsPlay = points;
        if (turn) {
            checkTurn(player1, 1, 'one', pointsPlay);
        } else {
            checkTurn(player2, 2, 'one', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function check2New() {
    console.log("check2New");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        var points = (strValues.match(/2/g) || []).length;
        pointsPlay = points * 2;
        if (turn) {
            checkTurn(player1, 1, 'two', pointsPlay);
        } else {
            checkTurn(player2, 2, 'two', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function check3New() {
    console.log("check3New");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        var points = (strValues.match(/3/g) || []).length;
        pointsPlay = points * 3;
        if (turn) {
            checkTurn(player1, 1, 'three', pointsPlay);
        } else {
            checkTurn(player2, 2, 'three', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function check4New() {
    console.log("check4New");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        var points;
        points = (strValues.match(/4/g) || []).length;
        pointsPlay = points * 4;
        if (turn) {
            checkTurn(player1, 1, 'four', pointsPlay);
        } else {
            checkTurn(player2, 2, 'four', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function check5New() {
    console.log("check5New");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        var points = (strValues.match(/5/g) || []).length;
        pointsPlay = points * 5;
        if (turn) {
            checkTurn(player1, 1, 'five', pointsPlay);
        } else {
            checkTurn(player2, 2, 'five', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function check6New() {
    console.log("check6New");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        var points = (strValues.match(/6/g) || []).length;
        pointsPlay = points * 6;
        if (turn) {
            checkTurn(player1, 1, 'six', pointsPlay);
        } else {
            checkTurn(player2, 2, 'six', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function checkEscaleraNew() {
    console.log("checkEscaleraNew");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        if (escaleraRegex.test(strValues) === true) {
            pointsPlay = 20;
            if (throwN === 2) {
                pointsPlay += 5;
            }
        } else {
            pointsPlay = 0;
        }
        if (turn) {
            checkTurn(player1, 1, 'escalera', pointsPlay);
        } else {
            checkTurn(player2, 2, 'escalera', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function checkFullNew() {
    console.log("checkFullNew");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        if (fullRegex2.test(strValues) === true) {
            pointsPlay = 30;
            if (throwN === 2) {
                pointsPlay += 5;
            }
        } else {
            pointsPlay = 0;
        }
        if (turn) {
            checkTurn(player1, 1, 'full', pointsPlay);
        } else {
            checkTurn(player2, 2, 'full', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function checkPokerNew() {
    console.log("checkPokerNew");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        if (pokerRegex.test(strValues) === true) {
            pointsPlay = 40;
            if (throwN === 2) {
                pointsPlay += 5;
            }
        } else {
            pointsPlay = 0;
        }
        if (turn) {
            checkTurn(player1, 1, 'poker', pointsPlay);
        } else {
            checkTurn(player2, 2, 'poker', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function checkGeneralaNew() {
    console.log("checkGeneralaNew");
    if (!disableClicks) {
        audioCheckScore.play();
        disableClicks = true;
        var pointsPlay;
        strValues = checkGame();
        if (fullRegex2.test(strValues) === true) {
            pointsPlay = 50;
        } else {
            pointsPlay = 0;
        }
        if (turn) {
            checkTurn(player1, 1, 'generala', pointsPlay);
        } else {
            checkTurn(player2, 2, 'generala', pointsPlay);
        }
        $('#button_throw').text('Cambiar turno');
        $('#button_throw').attr('onclick', 'throwDices()');
    }
}

function checkTurn(player, number, game, points) {
    console.log("checkTurn");
    var el = $('#' + game + 'p' + number);
    player[game] = points;
    el.removeAttr('onclick');
    console.log(JSON.stringify(player[game]));
    el.text(JSON.stringify(player[game]));
}

function checkGeneralaServida() {
    console.log("Generala servida");
    /* audioCheckScore.play(); */
    /* disableClicks = true; */
    strValues = checkGame();
    console.log(strValues);
    if (generalaRegex.test(strValues) === true) {
        console.log("win");
        if (turn) {
            player1.generala = 300;
            var el = $("#generalap1");
            el.removeAttr('onclick');
            el.text(JSON.stringify(player1.generala));
        } else {
            player2.generala = 300;
            var el = $("#generalap2");
            el.removeAttr('onclick');
            el.text(JSON.stringify(player2.generala));
        }
        setTimeout(win, 3000);
    }
}


function checkGame() {
    strValues = '';
    for (let i = 0; i < diceArray.length; i++) {
        const dice = diceArray[i];
        strValues += JSON.stringify(dice.value);
    }
    return strValues;
}
//Callback function for Array.sort
function compare(a, b) {
    if (a.value < b.value) {
        return -1;
    }
    if (a.value > b.value) {
        return 1;
    }
    return 0;
}

//onClick when a dice is clicked on DOM
function select(diceIndex) {
    audioSelectDice.play();
    diceArray[diceIndex].selected = !diceArray[diceIndex].selected;
    if (diceArray[diceIndex].selected) {
        document.getElementById('img' + diceIndex).classList.toggle("selected", true);
    } else {
        document.getElementById('img' + diceIndex).classList.toggle("selected", false);
    }
}

//Random function
function rnd() {
    var randomdice = Math.round(Math.random() * 5 + 1)
    return randomdice;
}