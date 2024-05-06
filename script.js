const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const currentMonthElement = document.getElementById('currentMonth');
const calendarBody = document.getElementById('calendarBody');
const playButton = document.getElementById('playButton');
const feedButton = document.getElementById('feedButton');
const addEventButton = document.getElementById('addEventButton');
const eventList = document.getElementById('eventList');

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

playButton.addEventListener("click", () => {
  setCurrentImage("base_play.gif");
  setTimeout(() => setCurrentImage("base_idle.gif"), playTimeout); 
});

feedButton.addEventListener("click", () => {
  setCurrentImage("base_feed.gif");
  setTimeout(() => setCurrentImage("base_idle.gif"), feedTimeout); 
});

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

addEventButton.addEventListener('click', toggleEventMenu);

function toggleEventMenu() {
  const eventMenu = document.getElementById('eventMenu');
  eventMenu.classList.toggle('hidden');
}

const confirmEventButton = document.getElementById('confirmEventButton');
confirmEventButton.addEventListener('click', addEvent);

function addEvent() {
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;

  const eventList = document.getElementById('eventList');
  const eventItem = document.createElement('div');
  eventItem.textContent = `${eventName} - ${eventDate}`;
  eventItem.classList.add('event-item');
  eventList.appendChild(eventItem);

  const dateBox = document.querySelector(`.date[data-day="${eventDate}"]`);
  if (dateBox) {
    const dot = document.createElement('div');
    dot.classList.add('event-dot');
    dateBox.appendChild(dot); 
  }

  document.getElementById('eventName').value = '';
  document.getElementById('eventDate').value = '';

  toggleEventMenu();
}

function setCurrentImage(imageSrc) {
  currentImage = imageSrc;
  renderCalendar();
}

function getMonthName(month) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[month];
}

renderCalendar();