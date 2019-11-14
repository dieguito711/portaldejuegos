/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;'); */

        console.log('Received Event: ' + id);

        //-------------------------------------------------------------------------------------------------------------
        //Buttons and onClicks
        let btnPhoto = document.getElementById("myImage");
        btnPhoto.onclick = takePicture;
        let btnCheck = document.getElementById("checkPlayer");
        btnCheck.onclick = checkPlayer;

        let btnErase = document.getElementById("erase_players");
        btnErase.onclick = erasePlayers;

        let btnEdit1 = document.getElementById('edit_p1');
        btnEdit1.onclick = editP1;

        let btnEdit2 = document.getElementById('edit_p2');
        btnEdit2.onclick = editP2;

        let btnCancelEdit = document.getElementById('cancel_edit');
        btnCancelEdit.onclick = cancelEdit;
    }
};
//Elements and variables for future control
var divPlayers = document.getElementById('players');
var divP1 = document.getElementById('div_p1');
var divP2 = document.getElementById('div_p2');
var imgP1 = document.getElementById('img_p1');
var imgP2 = document.getElementById('img_p2');
var nameP1 = document.getElementById('name_p1');
var nameP2 = document.getElementById('name_p2');
var pointsP1 = document.getElementById('points_p1');
var pointsP2 = document.getElementById('points_p2');
var btnErase = document.getElementById("erase_players");
var divData = document.getElementById('player-data');
var divLinks = document.getElementById('enterLinks');
var players = [];
//Variable to know which player is on editing mode
var editingPlayers = true; //TRUE = P1, FALSE = P2
//LocalStorage
myStorage = window.localStorage;
if (typeof myStorage !== 'undefined') {
    if (myStorage.getItem('Players') === null) {} else {
        players = JSON.parse(myStorage.getItem('Players'));
        //If there are already 2 players
        if (players.length >= 2) {
            //Show them on their respective divs
            showPlayersData(players.length);
            //And display:none the form
            divLinks.classList.remove('dissapear');
        } else {
            //If there are less than 2 players, user have to add one more at least
            showPlayersData(players.length);
        }
    }
} else {
    // localStorage not defined
}

app.initialize();
//Function to show the divs with each player data (img, name and points) It receives the amount of players loaded
function showPlayersData(n) {
    if (n != 0) {
        divPlayers.classList.remove('dissapear');
        btnErase.classList.remove('dissapear');
        divP1.classList.remove('dissapear');
        divP2.classList.add('dissapear');
        imgP1.src = players[0].img;
        console.log(players[0].img);
        nameP1.innerText = players[0].name;
        console.log(players[0].name);
        pointsP1.innerText = "Puntos: " + players[0].points;
        console.log(players[0].points);
        if (n > 1) {
            divData.classList.add('dissapear');
            divP2.classList.remove('dissapear');
            divLinks.classList.remove('dissapear');
            imgP2.src = players[1].img;
            console.log(players[1].img);
            nameP2.innerText = players[1].name;
            console.log(players[1].name);
            pointsP2.innerText = "Puntos :" + players[1].points;
            console.log(players[1].points);
        }
    }
}
//Function to edit the data from Player 1
function editP1() {
    divP1.classList.add('dissapear');
    divP2.classList.add('dissapear');
    divData.classList.remove('dissapear');
    divLinks.classList.add('dissapear');

    document.getElementById('name').value = players[0].name;
    document.getElementById('nickname').value = players[0].nickname;
    document.getElementById('myImage').src = players[0].img;
    document.getElementById('cancel_edit').classList.remove('dissapear');
    editingPlayers = true;
}
//Function to edit the data from Player 2
function editP2() {
    divP1.classList.add('dissapear');
    divP2.classList.add('dissapear');
    divData.classList.remove('dissapear');
    divLinks.classList.add('dissapear');

    document.getElementById('name').value = players[1].name;
    document.getElementById('nickname').value = players[1].nickname;
    document.getElementById('myImage').src = players[1].img;
    document.getElementById('cancel_edit').classList.remove('dissapear');
    editingPlayers = false;
}
//Function to cancel the current editing
function cancelEdit() {
    document.getElementById('name').value = "";
    document.getElementById('nickname').value = "";
    document.getElementById('myImage').src = "./img/camera.svg";
    divData.classList.add('dissapear');
    divP1.classList.remove('dissapear');
    divP2.classList.remove('dissapear');
    divLinks.classList.remove('dissapear');
}
//Function to erase all the players in local storage
function erasePlayers() {
    divPlayers.classList.add('dissapear');
    btnErase.classList.add('dissapear');
    divData.classList.remove('dissapear');
    divLinks.classList.add('dissapear');
    myStorage.clear();
    players = [];
    imgP1.src = "";
    nameP1.innerText = "";
    pointsP1.innerText = "";
    imgP2.src = "";
    nameP2.innerText = "";
    pointsP2.innerText = "";
}
//Function to check if the player's information is correct and complete. If it is, add it to localStorage
function checkPlayer() {
    if (players.length < 2) {
        if (document.getElementById('name').value != "" && document.getElementById('nickname').value != "" && document.getElementById('myImage').classList.contains("loaded")) {
            var player = {
                name: document.getElementById('name').value,
                nickname: document.getElementById('nickname').value,
                img: document.getElementById('myImage').src,
                points: 0,
            };
            players.push(player);
            showPlayersData(players.length);
            myStorage.setItem('Players', JSON.stringify(players));
            if (players.length >= 2) {
                divLinks.classList.remove('dissapear');
            }
        } else {
            console.log("Ingrese bien los datos");
            navigator.notification.alert("Ingrese los datos correctamente", "", "Error", "De acuerdo");
        }
    } else {
        //IF players.length is already 2, then it means user is trying to edit one of them
        console.log("EDITANDO PLAYERS");
        if (editingPlayers) {
            //P1
            console.log("EDITANDO P1");
            players[0].name = document.getElementById('name').value;
            players[0].nickname = document.getElementById('nickname').value;
            players[0].img = document.getElementById('myImage').src;
        } else {
            //P2
            console.log("EDITANDO P2");
            players[1].name = document.getElementById('name').value;
            players[1].nickname = document.getElementById('nickname').value;
            players[1].img = document.getElementById('myImage').src;
        }
        //Update Players in localStorage
        myStorage.setItem('Players', JSON.stringify(players));
        showPlayersData(players.length);
    }

}
//Function to use native camera to take the picture
function takePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        image.classList.replace("not_loaded", "loaded");
    }

    function onFail(message) {
        alert("Error. " + message);
    }
}