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

        /* for (let i = 0; i < n; i++) {
            var player = {
                name: null,
                nickname: null,
                img: null,
                points: 0,
            };
            players[i].push(player);
        } */
        let btnPhoto = document.getElementById("myImage");
        btnPhoto.onclick = takePicture;
        let btnCheck = document.getElementById("checkPlayer");
        btnCheck.onclick = checkPlayer;

    }
};

var divPlayers = document.getElementById('players');
var divP1 = document.getElementById('div_p1');
var divP2 = document.getElementById('div_p2');
var imgP1 = document.getElementById('img_p1');
var imgP2 = document.getElementById('img_p2');
var nameP1 = document.getElementById('name_p1');
var nameP2 = document.getElementById('name_p2');
var pointsP1 = document.getElementById('points_p1');
var pointsP2 = document.getElementById('points_p2');

var divData = document.getElementById('player-data');
var players = [];
myStorage = window.localStorage;
if (typeof myStorage !== 'undefined') {
    if (myStorage.getItem('Players') === null) {} else {
        players = JSON.parse(myStorage.getItem('Players'));
        if (players.length >= 2) {
            showPlayersData(players.length);
            document.getElementById('a_tateti').classList.remove("dissapear");
            document.getElementById('a_memotest').classList.remove("dissapear");
            /* divData.classList.add("dissapear"); */
        } else {
            showPlayersData(players.length);
        }
        /* document.getElementById('player-data').className = "dissapear"; */
    }
} else {
    // localStorage not defined
}

app.initialize();

function showPlayersData(n) {
    if (n != 0) {
        divPlayers.classList.remove('dissapear');
        divP1.classList.remove('dissapear');
        imgP1.src = players[0].img;
        console.log(players[0].img);
        nameP1.innerText = "Nombre: " + players[0].name;
        console.log(players[0].name);
        pointsP1.innerText = "Puntos: " + players[0].points;
        console.log(players[0].points);
        if (n > 1) {
            divData.classList.add('dissapear');
            divP2.classList.remove('dissapear');
            imgP2.src = players[1].img;
            console.log(players[1].img);
            nameP2.innerText = "Nombre: " + players[1].name;
            console.log(players[1].name);
            pointsP2.innerText = "Puntos :" + players[1].points;
            console.log(players[1].points);
        }
    }
}

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
            console.log(players);
        } else {
            console.log("Ingrese bien los datos");
            navigator.notification.alert("Ingrese los datos correctamente", "", "Error", "De acuerdo");
        }
    } else {
        document.getElementById('a_tateti').classList.remove("dissapear");
        document.getElementById('a_memotest').classList.remove("dissapear");

    }

}

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
        alert("Error" + message);
    }
}