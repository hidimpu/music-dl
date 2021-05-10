const apiURL = "https://www.yt-download.org/api/button/";
const qrURL =
  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=232533&color=fafafa&data=";

const switcher = document.querySelector("#switcher");

const search = document.querySelector("#search");
const download = document.querySelector("#download");

const searchCard = document.querySelector(".card-search");
const loadingCard = document.querySelector(".card-loading");
const downloadCard = document.querySelector(".card-download");

const inputField = document.querySelector(".input-field");
const form = document.querySelector("form");

let fetched = false;

switcher.addEventListener("click", () => {
  if (document.body.classList.contains("dark-theme")) {
    // console.log('control');
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  }
});

search.addEventListener("click", () => {
  searchCard.classList.remove("hidden");
  loadingCard.classList.add("hidden");
  downloadCard.classList.add("hidden");
});

download.addEventListener("click", () => {
  if (fetched) {
    searchCard.classList.add("hidden");
    loadingCard.classList.add("hidden");
    downloadCard.classList.remove("hidden");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  searchCard.classList.toggle("hidden");
  loadingCard.classList.toggle("hidden");
  setVideo(inputField.value);
});

const setVideo = async (query) => {
  const data = await fetchVideo(query);
  const { video } = data;

  if (data.error) {
    const toast = document.querySelector(".toast");
    toast.classList.add("toast-show");

    setTimeout(() => toast.classList.remove("toast-show"), 3000);
    searchCard.classList.toggle("hidden");
    loadingCard.classList.toggle("hidden");
  } else {
    const songTitle = document.querySelector(".song-title");
    const qrCode = document.querySelector("#qr-code");
    const mp3Btns = document.querySelector("#mp3");
    const mp4Btns = document.querySelector("#mp4");
    const thumbnail = document.querySelector("#thumbnail");
    const ytLink = document.querySelector("#yt-link");

    songTitle.innerText = video.title;
    qrCode.setAttribute("src", qrURL + apiURL + "mp3/" + video.id);
    mp3Btns.setAttribute("src", apiURL + "mp3/" + video.id);
    mp4Btns.setAttribute("src", apiURL + "videos/" + video.id);
    thumbnail.setAttribute("src", video.thumbnails.high.url);
    ytLink.setAttribute("href", video.link);

    fetched = true;
    loadingCard.classList.toggle("hidden");
    downloadCard.classList.toggle("hidden");
  }
};

const fetchVideo = async (q) => {
  const { data } = await axios.get("/api/search", {
    params: { q },
  });

  return data;
};
