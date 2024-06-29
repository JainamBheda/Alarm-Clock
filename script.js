const currentTime = document.querySelector("h1"),
select = document.querySelectorAll("select"),
content = document.querySelector(".content"),
button = document.querySelector("button");

let Alarm;
let isAlarmSet = false;

let audio = new Audio("ringtone.mp3");


for (let i = 12; i > 0; i--) {
    let formattedHour = i < 10 ? "0" + i : i;
    let option = `<option value="${formattedHour}">${formattedHour}</option>`;
    select[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    let formattedMinute = i < 10 ? "0" + i : i;
    let option = `<option value="${formattedMinute}">${formattedMinute}</option>`;
    select[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    select[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


setInterval(() => {
    let date = new Date();
    let h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (Alarm == `${h}:${m} ${ampm}`) {
        audio.play();
        audio.loop = true;
    }
}, 1000);


button.addEventListener("click", () => {
    if (isAlarmSet) {
        clearAlarm();
    } else {
        setAlarm();
    }
});

function setAlarm() {
    let time = `${select[0].value}:${select[1].value} ${select[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("You selected an invalid time.");
    }
    content.classList.add("disable");
    button.innerText = "Clear Alarm";
    Alarm = time;
    isAlarmSet = true;
}

function clearAlarm() {
    Alarm = "";
    audio.pause();
    content.classList.remove("disable");
    button.innerText = "Set Alarm";
    isAlarmSet = false;
}
