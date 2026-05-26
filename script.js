// ================= VARIABLES =================
const functionSelect = document.getElementById("functionSelect");
const coefficientSlider = document.getElementById("coefficientSlider");
const coefficientValue = document.getElementById("coefficientValue");
const rangeSlider = document.getElementById("rangeSlider");
const rangeValue = document.getElementById("rangeValue");

let score = 0;


// ================= GRÁFICA =================
const ctx = document.getElementById("expoChart");

const expoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Función Exponencial',
            data: [],
            borderColor: '#0072ff',
            backgroundColor: 'rgba(0,114,255,0.2)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'f(x)'
                }
            }
        }
    }
});


// ================= ACTUALIZAR GRÁFICA =================
function updateChart() {

    const base = parseFloat(functionSelect.value);
    const coefficient = parseFloat(coefficientSlider.value);
    const range = parseInt(rangeSlider.value);

    let labels = [];
    let data = [];

    for(let x = -range; x <= range; x++) {

        labels.push(x);

        const y = coefficient * Math.pow(base, x);

        data.push(y);
    }

    expoChart.data.labels = labels;
    expoChart.data.datasets[0].data = data;

    expoChart.update();
}


// ================= EVENTOS =================
functionSelect.addEventListener("change", updateChart);

coefficientSlider.addEventListener("input", () => {

    coefficientValue.textContent = coefficientSlider.value;

    updateChart();
updateVisitCounter();
});

rangeSlider.addEventListener("input", () => {

    rangeValue.textContent = rangeSlider.value;

    updateChart();
});


// ================= MODO OSCURO =================
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});


// ================= CALCULADORA =================
function calculatePower() {

    const base = parseFloat(document.getElementById("baseInput").value);
    const exponent = parseFloat(document.getElementById("exponentInput").value);

    if(isNaN(base) || isNaN(exponent)) {

        alert("Ingresa valores válidos");
        return;
    }

    const result = Math.pow(base, exponent);

    document.getElementById("calcResult").textContent =
        `Resultado: ${result}`;
}


// ================= QUIZ =================
function checkAnswer(button, correct) {

    if(correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("incorrect");
    }

    document.getElementById("scoreText").textContent =
        `Puntaje: ${score}`;
}


// ================= GENERADOR DE EJERCICIOS =================
function generateExercise() {

    const randomBase = Math.floor(Math.random() * 9) + 2;
    const randomExponent = Math.floor(Math.random() * 5) + 1;

    alert(`Resuelve: ${randomBase}^${randomExponent}`);
}


// ================= EXPORTAR RESULTADOS =================
function exportResults() {

    const content = "Resultados exportados desde la plataforma educativa.";

    const blob = new Blob([content], {type: 'text/plain'});

    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = 'resultados.txt';

    link.click();
}


// ================= IA BÁSICA =================
function aiSuggestion() {

    const suggestions = [
        "Las funciones exponenciales crecen rápidamente.",
        "Si la base es menor que 1, la función decrece.",
        "La función exponencial nunca toca el eje X.",
        "El interés compuesto es un ejemplo exponencial."
    ];

    const random = Math.floor(Math.random() * suggestions.length);

    alert(suggestions[random]);
}


// ================= CONTADOR DE VISITAS =================
function updateVisitCounter() {

    let visits = localStorage.getItem("page_visits");

    if(visits === null) {
        visits = 0;
    }

    visits++;

    localStorage.setItem("page_visits", visits);

    document.getElementById("visitCounter").textContent = visits;
}


// ================= INICIALIZAR =================
updateChart();