console.log("Welcome to Spotify");

let songIndex=0;
let audioElement= new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");


let songs=[
    {songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/coover1.png"},
    {songName: "Baby", filePath: "songs/2.mp3", coverPath: "covers/coover2.png"},
    {songName: "Peaches", filePath: "songs/3.mp3", coverPath: "covers/coover3.png"},
    {songName: "SORRY", filePath: "songs/4.mp3", coverPath: "covers/coover4.png"},
    {songName: "Yummy", filePath: "songs/5.mp3", coverPath: "covers/coover5.png"},
]

// audioElement.play();

//handle play/pause click
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity=0;
    }    
})


//listen to  events
audioElement.addEventListener("timeupdate", ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value= progress;
})

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
        Element.classList.add("fa-play");
    })
}


Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
    Element.addEventListener("click",(e)=>{
        makeAllPlays();
        // console.log(e.target);
        songIndex=parseInt(e.target.id);
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    })
})


document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=4){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})


document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})