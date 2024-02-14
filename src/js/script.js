// Variáveis das informações da música ------------------------------
const botaoPlayPause = document.getElementById("play-pause");
const audioMusica = document.getElementById("audio-musica");
const botaoAvancar = document.getElementById("proximo");
const botaoVoltar = document.getElementById("anterior");
const nomeMusica = document.getElementById("musica");
const fotoAlbum = document.getElementById("img-album");
const nomeCantor = document.getElementById("nome-cantor");

// Variáveis da barra de progresso ---------------------------------
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress")

// Variáveis com as músicas------------------------------------------
const stickSeason = {
    nome: "Stick Season",
    cantor: "Noah Kahan"
}
const sweetCreature = {
    nome: "Sweet Creature",
    cantor: "Harry Styles"
};
const youth = {
    nome: "Youth(feat. Khalid)",
    cantor: "Shawn Mendes, Khalid"
};
const soSick = {
    nome:"So Sick",
    cantor:"Ne-Yo"
};
const iris = {
    nome:"Iris",
    cantor:"The Goo Goo Dools"
};
const unwritten = {
    nome:"Unwritten",
    cantor:"Natasha Bedingfield"
};
const musicas = [stickSeason, sweetCreature, youth, soSick, iris, unwritten]

// Variáveis de controle ---------------------------------------------
const numeroMusicas = 6;
let taTocando = 0;
let musicaAtual = 0;

// Funções para a barra de progresso ------------------------------------------
audioMusica.ontimeupdate = () => updateTime();
const updateTime = () =>{
    const currentMinutes = Math.floor(audioMusica.currentTime / 60);
    const currentSeconds = Math.floor(audioMusica.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    const durationFormatted = isNaN(audioMusica.duration) ? 0 : audioMusica.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidth = durationFormatted ? (audioMusica.currentTime / durationFormatted) * 100 : 0;

    progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n:n);

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * audioMusica.duration;
    audioMusica.currentTime = newTime;
}

// Trocando os nomes de musica, cantor e foto respectivamente ----------------------
function trocarNomeMusica(){
    nomeMusica.innerText = musicas[musicaAtual].nome;
}
function trocarNomeArtista(){
    nomeCantor.innerText = musicas[musicaAtual].cantor;
}
function trocarFoto(){
    fotoAlbum.src = "./src/images/imagem_"+ musicaAtual +".jpg";
}

//  Funções para pausar e dar play na música ---------------------------------------
function tocarMusica(){
    botaoPlayPause.classList.remove("bi-play-circle-fill");
    botaoPlayPause.classList.add("bi-pause-circle-fill");
    audioMusica.play();
    taTocando = 1;
}

function pausarMusica(){
    botaoPlayPause.classList.remove("bi-pause-circle-fill");
    botaoPlayPause.classList.add("bi-play-circle-fill");
    audioMusica.pause();
    taTocando = 0;
}

function tocarOuPausar(){
    if(taTocando === 0){
        tocarMusica();
    }
    else{
        pausarMusica();
    }
updateTime();
}

// Funções para avançar ou voltar a música--------------------------------------------

function proximaMusica(){
    if(musicaAtual === numeroMusicas){
        musicaAtual = 0;
    }
    else{
        musicaAtual = musicaAtual + 1;
    }
    audioMusica.src = "./src/audio/playlistGUI_"+ musicaAtual +".mp3";
    tocarMusica();
    trocarNomeMusica();
    trocarFoto();
    trocarNomeArtista();
    updateTime();
}

function voltarMusica(){
    if(musicaAtual === 0){
        musicaAtual = numeroMusicas;
    }
    else{
        musicaAtual = musicaAtual - 1;
    }
    audioMusica.src = "./src/audio/playlistGUI_"+ musicaAtual +".mp3";
    tocarMusica();
    trocarNomeMusica();
    trocarFoto();
    trocarNomeArtista();
    updateTime();
}

// Adicionando eventos ao click ----------------------------------------------
botaoPlayPause.addEventListener('click', tocarOuPausar);
botaoAvancar.addEventListener('click', proximaMusica);
botaoVoltar.addEventListener('click', voltarMusica);