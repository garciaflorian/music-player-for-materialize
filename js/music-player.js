var myAudio = document.getElementById("myAudio");

window.onload = function () {
    document.getElementById("seekbar").max = myAudio.duration;
    document.getElementById("total").innerHTML = secondsToMs(myAudio.duration);
    document.getElementById("position").innerHTML = secondsToMs(0);
    document.getElementById("seekbar").value = 0;
    document.getElementById("vol-control").value = 100;
    document.getElementById("seekbar").max = myAudio.duration;
};

/*-------------------------------------------------------------------------------------*/

var isPlaying = false;

myAudio.onplaying = function () {
    isPlaying = true;
    document.getElementById("PausePlay").innerHTML = "pause";
};

myAudio.onended = function () {
    isPlaying = false;
    document.getElementById("PausePlay").innerHTML = "replay";
};

myAudio.onpause = function () {
    isPlaying = false;
    document.getElementById("PausePlay").innerHTML = "play_arrow";
};

function togglePlay() {
    if (isPlaying) {
        myAudio.pause();
    } else {
        myAudio.play();
    }
    if (myAudio.ended){
        myAudio.currentTime = 0;
        myAudio.play();
    }
};

/*-------------------------------------------------------------------------------------*/

function SetVolume(val) {
    myAudio.volume = val / 100;
};

var isMute = false;

function toggleMute() {
    isMute = myAudio.muted;
    if (isMute) {
        myAudio.muted = false;
        document.getElementById("Muted").innerHTML = "volume_up";
    } else {
        myAudio.muted = true;
        document.getElementById("Muted").innerHTML = "volume_off";
    }
};

/*-------------------------------------------------------------------------------------*/

function setSeek(val) {
    myAudio.currentTime = val;
};

myAudio.ontimeupdate = function () {
    document.getElementById("position").innerHTML = secondsToMs(myAudio.currentTime);
    document.getElementById("seekbar").value = myAudio.currentTime;

};

/*-------------------------------------------------------------------------------------*/

function secondsToMs(d) {
    d = Number(d);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
};