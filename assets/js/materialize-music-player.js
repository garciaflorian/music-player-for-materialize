var document = window.document;

window.onload = content;

function content()
{
    
    var music_player = document.getElementById("materialize-music-player");
    
    for(var ite=0;ite<3;ite=ite+1){
        if(music_player.children[ite].tagName === "AUDIO"){
            var audio = music_player.children[ite];
        }else if(music_player.children[ite].tagName === "IMG"){
            var thumbnail = music_player.children[ite];
        }else{
            var title = music_player.children[ite].innerHTML;
        }
    }
    
    var root = music_player.parentElement;
    
    var card_div = createDom("div",{class:"card"},"");
    var cardImage_div = createDom("div",{class:"card-image"},"");
    thumbnail.onclick = togglePlay;
    cardImage_div.append(thumbnail);
    var play_a = createDom("a",{class:"btn-floating btn-large halfway-fab waves-effect waves-light teal"},"");
    play_a.onclick = togglePlay;
    var pausePlay_i = createDom("i",{class:"material-icons",id:"PausePlay"},"play_arrow");
    play_a.append(pausePlay_i);    
    cardImage_div.append(play_a);
    card_div.append(cardImage_div);
    var cardContent_div = createDom("div",{class:"card-content"},"");
    var title_h5 = createDom("h5",{},title);
    cardContent_div.append(title_h5);
    var wrapper_div = createDom("div",{class:"row valign-wrapper"},"");
    var position_div = createDom("div",{class:"col s2",id:"position"},secondsToMs(0));
    wrapper_div.append(position_div);
    var rangeSeekbar_div = createDom("div",{class:"col s6 range-field valign-wrapper"},"");
    var seekbar_input = createDom("input",{id:"seekbar",type:"range",min:"0",max:"0",step:"1"},"");
    seekbar_input.max = audio.duration;
    seekbar_input.oninput = function () {setSeek(this.value);}
    seekbar_input.onchange = function () {setSeek(this.value);}
    rangeSeekbar_div.append(seekbar_input);
    wrapper_div.append(rangeSeekbar_div);
    var total_div = createDom("div",{class:"col s2 center-align",id:"total"},secondsToMs(audio.duration));
    wrapper_div.append(total_div);
    var muted_div = createDom("div",{},"");
    var muted_a = createDom("a",{},"");
    muted_a.onclick = toggleMute;
    var muted_i = createDom("i",{class:"material-icons teal-text lighten-1",id:"Muted"},"volume_up");
    muted_a.append(muted_i);
    muted_div.append(muted_a); 
    wrapper_div.append(muted_div);
    var rangeVol_div = createDom("div",{class:"col s3 range-field valign-wrapper"},"");
    var vol_input = createDom("input",{id:"vol-control",type:"range",min:"0",max:"100",step:"1"},"");
    vol_input.oninput = function () {SetVolume(this.value);}
    vol_input.onchange = function () {SetVolume(this.value);}
    vol_input.value = 100;
    rangeVol_div.append(vol_input);
    wrapper_div.append(rangeVol_div);
    
    cardContent_div.append(wrapper_div);
    card_div.append(cardContent_div);
    root.append(card_div);

    var isPlaying = false;

    audio.onplaying = function () {
        isPlaying = true;
        document.getElementById("PausePlay").innerHTML = "pause";
    }

    audio.onended = function () {
        isPlaying = false;
        document.getElementById("PausePlay").innerHTML = "replay";
    }

    audio.onpause = function () {
        isPlaying = false;
        document.getElementById("PausePlay").innerHTML = "play_arrow";
    }

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        if (audio.ended){
            audio.currentTime = 0;
            audio.play();
        }
    }

    function SetVolume(val) {
        audio.volume = val / 100;
    }

    var isMute = false;

    function toggleMute() {
        isMute = audio.muted;
        if (isMute) {
            audio.muted = false;
            document.getElementById("Muted").innerHTML = "volume_up";
        } else {
            audio.muted = true;
            document.getElementById("Muted").innerHTML = "volume_off";
        }
    }

    function setSeek(val) {
        audio.currentTime = val;
    }

    audio.ontimeupdate = function () {
        document.getElementById("position").innerHTML = secondsToMs(audio.currentTime);
        document.getElementById("seekbar").value = audio.currentTime;

    }

    function secondsToMs(d) {
        d = Number(d);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }

    function createDom(type,dicoAtt,text){
        var dom = document.createElement(type);
        for(var key in Object.keys(dicoAtt)){
            dom.setAttribute(Object.keys(dicoAtt)[key],dicoAtt[Object.keys(dicoAtt)[key]]);
        }
        if(text){
            dom.innerHTML = text;
        }

        return dom;
    }    
    
}