const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

// Playlist (replace with your own songs)
const songs = [
  {
    name: "song1.mp3",
    title: "Track One",
    artist: "Artist One",
  },
  {
    name: "song2.mp3",
    title: "Track Two",
    artist: "Artist Two",
  },
  {
    name: "song3.mp3",
    title: "Track Three",
    artist: "Artist Three",
  },
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}`;
}

// Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

// Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Previous song
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  highlightPlaying();
});

// Next song
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  highlightPlaying();
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

// Seek
progress.addEventListener("input", () => {
  const seekTime = (progress.value * audio.duration) / 100;
  audio.currentTime = seekTime;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Auto play next
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Load playlist
function loadPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(song);
      playSong();
      highlightPlaying();
    });
    playlistEl.appendChild(li);
  });
}

function highlightPlaying() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === songIndex);
  });
}

loadSong(songs[songIndex]);
loadPlaylist();
highlightPlaying();
