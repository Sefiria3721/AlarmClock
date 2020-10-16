
const alarmAudio = new Audio("audio/Wecker-sound.mp3");

const clock = document.getElementById("clock");

const alarm = document.getElementById("alarm_input");
alarm.addEventListener("input", (event) => onAlarmInput(event), false);

const alarmStop = document.getElementById("alarm_stop");
alarmStop.hidden = true;
alarmStop.addEventListener("click", (event) => onAlarmStopClick(event));

let alarmTime;
const clockTimer = setInterval(refresh, 1000);

function refresh()
{
    currentTime();
    checkAlarm();
}

function currentTime() {
    const mediumTimeFormatter = new Intl.DateTimeFormat("ru-RU" , {timeStyle: "medium"});
 
    clock.innerText = mediumTimeFormatter.format(Date.now());
}

function checkAlarm()
{
    if(alarmTime == null)
        return;

    const currentDate = new Date();

    if(currentDate.getHours() === alarmTime.getUTCHours()
        && currentDate.getMinutes() === alarmTime.getUTCMinutes()
        && currentDate.getSeconds() === alarmTime.getUTCSeconds()
        )
    {
        alarmAudio.play();
        alarmStop.hidden = false;
    }
}

function onAlarmInput(event){
    alarmTime = alarm.valueAsDate;
}

function onAlarmStopClick(event){
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    alarmStop.hidden = true;
}