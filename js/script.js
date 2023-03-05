import playList from "../js/playList.js";

// 1. Часы и календарь +15
const getDate = setInterval(() => {
  const currDate = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const localTime = currDate.toLocaleTimeString("ru-RU");
  const localDate = currDate.toLocaleDateString(undefined, options);
  document.querySelector(".time").textContent = localTime;
  document.querySelector(".date").textContent = localDate;
}, 1000);

// 2. Приветствие +10
const en = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  night: "Good night",
};

const ru = {
  morning: "Доброе утро",
  afternoon: "Добрый день",
  evening: "Добрый вечер",
  night: "Доброй ночи",
};

const by = {
  morning: "Добрай раніцы",
  afternoon: "Добры дзень",
  evening: "Добры вечар",
  night: "Дабранач",
};

const lang = window.navigator.language;
const hours = new Date().getHours();

function getTimeOfDay(hours) {
  if (12 > hours && hours >= 6) {
    return "morning";
  } else if (18 > hours && hours >= 12) {
    return "afternoon";
  } else if (0 > hours && hours >= 18) {
    return "evening";
  } else {
    return "night";
  }
}

const timeOfDay = getTimeOfDay(hours);

if (lang === "ru") {
  if (timeOfDay === "morning") {
    document.querySelector(".greeting").textContent = ru.morning;
  } else if (timeOfDay === "afternoon") {
    document.querySelector(".greeting").textContent = ru.afternoon;
  } else if (timeOfDay === "evening") {
    document.querySelector(".greeting").textContent = ru.evening;
  } else {
    document.querySelector(".greeting").textContent = ru.night;
  }
} else if (lang === "by") {
  if (timeOfDay === "morning") {
    document.querySelector(".greeting").textContent = by.morning;
  } else if (timeOfDay === "afternoon") {
    document.querySelector(".greeting").textContent = by.afternoon;
  } else if (timeOfDay === "evening") {
    document.querySelector(".greeting").textContent = by.evening;
  } else {
    document.querySelector(".greeting").textContent = by.night;
  }
} else {
  if (timeOfDay === "morning") {
    document.querySelector(".greeting").textContent = en.morning;
  } else if (timeOfDay === "afternoon") {
    document.querySelector(".greeting").textContent = en.afternoon;
  } else if (timeOfDay === "evening") {
    document.querySelector(".greeting").textContent = en.evening;
  } else {
    document.querySelector(".greeting").textContent = en.night;
  }
}

const nameValidationInput = document.querySelector(".name");
nameValidationInput.onchange = getUserName;

function getUserName() {
  const userName = nameValidationInput.value;
  localStorage.setItem("userName", userName);
}

// Перенёс функцию в раздел цитата дня.
// window.onload = function () {
//   console.log(2);
//   if (localStorage) {
//     console.log(1);
//     const userName = localStorage.getItem("userName");
//     document.querySelector(".name").value = userName;
//   }
// };

// 3. Смена фонового изображения +20
function getRandomInt() {
  return Math.floor(Math.random() * 20) + 1;
}

let randomInt = getRandomInt();

function transformInt(n) {
  return n.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function increaseInt(n) {
  randomInt += 1;
  return (n + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function reduceInt(n) {
  randomInt -= 1;
  return (n - 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

document.body.style.background = `url("https://raw.githubusercontent.com/evgageev/stage1-tasks/assets/images/${timeOfDay}/${transformInt(
  randomInt
)}.jpg")`;

const slideNext = document.querySelector(".slide-next");
slideNext.addEventListener("click", () => {
  if (randomInt === 20) {
    randomInt = 0;
  }

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/evgageev/stage1-tasks/assets/images/${timeOfDay}/${increaseInt(
    randomInt
  )}.jpg`;
  img.onload = () => {
    document.body.style.background = `url(${img.src})`;
  };
});

const slidePrev = document.querySelector(".slide-prev");
slidePrev.addEventListener("click", () => {
  if (randomInt === 1) {
    randomInt = 21;
  }

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/evgageev/stage1-tasks/assets/images/${timeOfDay}/${reduceInt(
    randomInt
  )}.jpg`;
  img.onload = () => {
    document.body.style.background = `url(${img.src})`;
  };
});

// 4. Виджет погоды +15

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
const cityInput = document.querySelector(".city");

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=en&appid=6f4f88fb201a74f66b7c9c6572e86397&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    weatherError.textContent = "";

    const cityValue = cityInput.value;
    localStorage.setItem("userCity", cityValue);
  } catch (error) {
    weatherError.textContent = "Error! city not found!";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }
}

cityInput.addEventListener("change", () => {
  getWeather();
});

window.onload = function () {
  const userCity = localStorage.getItem("userCity");
  if (localStorage.length === 0) {
    cityInput.value = "Minsk";
    getWeather();
  } else {
    const userName = localStorage.getItem("userName");
    document.querySelector(".name").value = userName;
    document.querySelector(".city").value = userCity;
    getWeather();
  }
};

// 5. Виджет цитата дня +10

const changQuote = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

async function getQuotes() {
  const quotes = "quotes.json";
  const res = await fetch(quotes);
  const data = await res.json();

  const randIndex = Math.floor(Math.random() * data.length);

  quote.textContent = data[randIndex].text;
  author.textContent = data[randIndex].author;
}

changQuote.addEventListener("click", () => {
  getQuotes();
});

getQuotes();

// 6. Аудиоплеер +15
let playNum = 0;
let isPlay = false;

const audio = new Audio();
const playBtn = document.querySelector(".play");
const playPrevBtn = document.querySelector(".play-prev");
const playNextBtn = document.querySelector(".play-next");

function playAudio() {
  playBtn.classList.toggle("pause");

  if (!isPlay) {
    isPlay = true;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();

    playItems[playNum].classList.add("item-active");
  } else {
    isPlay = false;
    audio.pause();
  }
}

function playNext() {
  const prevNum = playNum;
  if (playNum >= playList.length - 1) {
    playNum = -1;
  }
  playNum += 1;
  playItems[prevNum].classList.remove("item-active");
  isPlay = false;
  playAudio();
  playBtn.classList.add("pause");
}

function playPrev() {
  const prevNum = playNum;
  if (playNum <= 0) {
    playNum = playList.length;
  }
  playNum -= 1;
  playItems[prevNum].classList.remove("item-active");
  isPlay = false;
  playAudio();
  playBtn.classList.add("pause");
}

const playListContainer = document.querySelector(".play-list");

playList.forEach((el) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = el.title;
  playListContainer.append(li);
});

const playItems = document.querySelectorAll(".play-item");

audio.addEventListener("ended", playNext);
playBtn.addEventListener("click", playAudio);
playNextBtn.addEventListener("click", playNext);
playPrevBtn.addEventListener("click", playPrev);
console.log("Выполнено 6 пунктов");
