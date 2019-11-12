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

var players = [];
var n = 2;
var qPlayers = 0;
myStorage = window.localStorage;
if (typeof myStorage !== 'undefined') {
    if (myStorage.getItem('Players') === null) {

    } else {
        players = JSON.parse(myStorage.getItem('Players'));
        if (players.length >= 2) {
            document.getElementById('a_tateti').classList.remove("dissapear");
            document.getElementById('a_memotest').classList.remove("dissapear");
        }
        /* document.getElementById('player-data').className = "dissapear"; */
    }
} else {
    // localStorage not defined
}

app.initialize();

function checkPlayer() {
    console.log(document.getElementById('myImage').src);
    if (players.length < 2) {
        if (document.getElementById('name').value != "" && document.getElementById('nickname').value != "" && document.getElementById('myImage').classList.contains("loaded")) {
            var player = {
                name: document.getElementById('name').value,
                nickname: document.getElementById('nickname').value,
                img: document.getElementById('myImage').src,
                points: 0,
            };
            players.push(player);
            myStorage.setItem('Players', JSON.stringify(players));
            console.log(players);
            qPlayers++;
        } else {
            console.log("Ingrese bien los datos");
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