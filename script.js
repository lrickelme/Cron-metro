const startButton = document.querySelector("[data-start]");
const pauseButton = document.querySelector("[data-pause]");
const stopButton = document.querySelector("[data-stop]");
const timeElement = document.querySelector("[data-time]");
let segundos = 0, minutos = 0, horas = 0;
let intervalo;

const renderTime = (segundos, minutos, horas) => {
    const horasValue = horas < 10 ? "0" + horas : horas;
    const minutosValue = minutos < 10 ? "0" + minutos : minutos;
    const segundosValue = segundos < 10 ? "0" + segundos : segundos;

    timeElement.innerHTML = horasValue + ":" + minutosValue + ":" + segundosValue;
};

const startTime = (startValue) => {
    startButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;

    if (startValue === "start" || startValue === "restart") {
        segundos = 0;
        minutos = 0;
        horas = 0;
        intervalo = setInterval(() => {
            segundos++;
            while (segundos === 60) {
                segundos = 0;
                minutos++;
            }
            while (minutos === 60) {
                minutos = 0;
                horas++;
            }
            renderTime(segundos, minutos, horas);
        }, 1000);
    } else if (startValue === "continue") {
        intervalo = setInterval(() => {
            segundos++;
            while (segundos === 60) {
                segundos = 0;
                minutos++;
            }
            while (minutos === 60) {
                minutos = 0;
                horas++;
            }
            renderTime(segundos, minutos, horas);
        }, 1000);
    }
};

const pauseTime = () => {
    startButton.disabled = false;
    startButton.setAttribute("data-start", "continue");
    startButton.innerHTML = "Continuar";
    pauseButton.disabled = true;

    clearInterval(intervalo);
};

const stopTime = () => {
    startButton.disabled = false;
    startButton.setAttribute("data-start", "restart");
    pauseButton.disabled = true;
    stopButton.disabled = true;
    startButton.innerHTML = "Reiniciar";

    clearInterval(intervalo);
};

startButton.onclick = () => {
    const startValue = startButton.getAttribute("data-start");
    startTime(startValue);
};

pauseButton.onclick = () => {
    pauseTime();
};

stopButton.onclick = () => {
    stopTime();
};
