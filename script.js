const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const currentMonthElement = document.getElementById('currentMonth');
const calendarBody = document.getElementById('calendarBody');
//Pet Interactions
const playButton = document.getElementById('playButton');
const feedButton = document.getElementById('feedButton');
const currentImageElement = document.querySelector('.current-box img');

//Pet Interactions
const pets = {
  "dog": {
    "idle": "dog_idle.gif",
    "feed": "dog_feed.gif",
    "play": "dog_play.gif"
  },
  "cat": {
    "idle": "calico_idle.gif",
    "feed": "calico_feed.gif",
    "play": "calico_play.gif"
  },
  "base": {
    "idle": "base_idle.gif",
    "feed": "base_feed.gif",
    "play": "base_play.gif"
  }
};

let currentDate = new Date();
const daysInMonth = 31;

let showMenu = false;
let currentImage = "base_idle.gif";
let feedTimeout = 4200; 
let playTimeout = 2560; 

prevMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

//Pet Interactions
playButton.addEventListener("click", () => {
  setCurrentImage("base_play.gif");
  setTimeout(() => setCurrentImage("base_idle.gif"), playTimeout); 
});

feedButton.addEventListener("click", () => {
  setCurrentImage("base_feed.gif");
  setTimeout(() => setCurrentImage("base_idle.gif"), feedTimeout); 
});

//Pet Interactions
function selectPet(petType) {
  const petData = pets[petType];

  setCurrentImage(petData.idle);

  playButton.addEventListener("click", () => {
    setCurrentImage(petData.play);
    setTimeout(() => setCurrentImage(petData.idle), playTimeout);
  });

  feedButton.addEventListener("click", () => {
    setCurrentImage(petData.feed);
    setTimeout(() => setCurrentImage(petData.idle), feedTimeout);
  });
}


function renderCalendar() {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  currentMonthElement.textContent = `${getMonthName(month)} ${year}`;
  calendarBody.innerHTML = "";

  //Pet Interactions
  if (showMenu) {
    const menuContainer = document.createElement("div");
    menuContainer.style.position = "absolute";
    menuContainer.style.top = "calc(50% - 60px)";
    menuContainer.style.left = "50%";
    menuContainer.style.transform = "translateX(-50%)";
    menuContainer.style.display = "flex";
    menuContainer.style.zIndex = "999";

    const feedButton = document.createElement("a");
    feedButton.href = "#";
    feedButton.style.backgroundColor = "tan";
    feedButton.style.padding = "4px 8px";
    feedButton.style.borderRadius = "4px";
    feedButton.style.margin = "0 10px";
    feedButton.style.textDecoration = "none";
    feedButton.style.color = "#fff";
    feedButton.style.fontSize = "14px";
    feedButton.textContent = "Feed";
    feedButton.addEventListener("click", () => handleOptionClick('Feed'));

    const playButton = document.createElement("a");
    playButton.href = "#";
    playButton.style.backgroundColor = "tan";
    playButton.style.padding = "4px 8px";
    playButton.style.borderRadius = "4px";
    playButton.style.margin = "0 10px";
    playButton.style.textDecoration = "none";
    playButton.style.color = "#fff";
    playButton.style.fontSize = "14px";
    playButton.textContent = "Play";
    playButton.addEventListener("click", () => handleOptionClick('Play'));

    menuContainer.appendChild(feedButton);
    menuContainer.appendChild(playButton);
    document.body.appendChild(menuContainer);
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.className = 'day-name';
    dayElement.textContent = day;
    calendarBody.appendChild(dayElement);
  });

  const firstDay = new Date(year, month, 1);
  const startMonth = firstDay.getDay();

  for (let i = 0; i < startMonth; i++) {
    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    calendarBody.appendChild(dateElement);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    dateElement.textContent = i;
    dateElement.addEventListener("click", () => {
      alert(`Clicked on ${getMonthName(month)} ${i}, ${year}`);
    });
    calendarBody.appendChild(dateElement);
  }

  const dateBoxes = document.querySelectorAll('.date');
  dateBoxes.forEach(box => {
    if (parseInt(box.textContent) === currentDate.getDate()) {
      box.innerHTML = `<img src="${currentImage}" alt="GIF" style="width: 150px; height: 150px;">`;
    }
  });
}

//Pet Interactions
function handleOptionClick(option) {
  console.log(`Selected option: ${option}`);
  showMenu = false;
  renderCalendar();
}

//Pet Interactions
function setCurrentImage(imageSrc) {
  currentImage = imageSrc;
  renderCalendar();
}

function getMonthName(month) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[month];
}

renderCalendar();