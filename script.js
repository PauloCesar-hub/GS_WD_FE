const themes = {
  default: {
    '--bg-color': '#ffffff',
    '--text-color': '#333',
    '--primary-color': '#0057b7'
  },
  dark: {
    '--bg-color': '#121212',
    '--text-color': '#f5f5f5',
    '--primary-color': '#bb86fc'
  },
  blue: {
    '--bg-color': '#e0f7fa',
    '--text-color': '#01579b',
    '--primary-color': '#0288d1'
  }
};

function applyTheme(theme) {
  if (!themes[theme]) return;
  Object.entries(themes[theme]).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });

const favicon = document.getElementById("favicon");
const logoIcon = document.querySelector(".logo-icon");

if (favicon) {
  switch (theme) {
    case "dark":
      favicon.href = "images/favicon-dark.png?v=1";
      if (logoIcon) logoIcon.src = "images/favicon-dark.png";
      break;
    case "blue":
      favicon.href = "images/favicon-blue.png?v=1";
      if (logoIcon) logoIcon.src = "images/favicon-blue.png";
      break;
    default:
      favicon.href = "images/favicon-default.png?v=1";
      if (logoIcon) logoIcon.src = "images/favicon-default.png";
  }
}



  localStorage.setItem('selectedTheme', theme);
}

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  applyTheme(savedTheme);
});

let slideIndex = 0;
function showSlides() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;
  slides.forEach(s => s.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}
showSlides();

const quizData = [
  { q: "Enchentes podem ser causadas por?", o: ["Chuvas fortes", "Sol intenso", "Neve", "Ventania"], a: 0 },
  { q: "Sensores IoT ajudam a?", o: ["Detectar níveis de água", "Cozinhar", "Iluminar ruas", "Fazer compras"], a: 0 },
  { q: "Alertas precoces podem?", o: ["Salvar vidas", "Causar pânico", "Ser ignorados", "Aumentar impostos"], a: 0 },
  { q: "Qual público é afetado por enchentes?", o: ["Moradores de áreas de risco", "Pessoas em montanhas", "Aviadores", "Turistas na praia"], a: 0 },
  { q: "Apps contra enchentes fazem o quê?", o: ["Enviam alertas", "Tiram fotos", "Contam piadas", "Vendem dados"], a: 0 },
  { q: "Tecnologia pode?", o: ["Ajudar na prevenção", "Aumentar chuvas", "Substituir rios", "Resolver tudo sozinha"], a: 0 },
  { q: "Enchentes causam?", o: ["Danos", "Economia", "Férias", "Diversão"], a: 0 },
  { q: "Com dados em tempo real é possível?", o: ["Agir rápido", "Prever o passado", "Evitar sol", "Ignorar alertas"], a: 0 },
  { q: "IoT significa?", o: ["Internet das Coisas", "Imagem de Tartaruga", "Início do Trovão", "Interface Objetiva Total"], a: 0 },
  { q: "Prevenção é?", o: ["Importante", "Opcional", "Inútil", "Cara demais"], a: 0 },
  { q: "Medidas preventivas incluem?", o: ["Monitoramento", "Ignorar sinais", "Esperar ajuda", "Orar e torcer"], a: 0 }
];

const quizContainer = document.getElementById("quiz-container");
if (quizContainer) {
  quizData.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${i + 1}. ${q.q}</p>` +
      q.o.map((opt, j) => `<label><input type="radio" name="q${i}" value="${j}"/> ${opt}</label><br>`).join("");
    quizContainer.appendChild(div);
  });

  const submitBtn = document.createElement("button");
  submitBtn.id = "submit-btn";
  submitBtn.textContent = "Enviar Respostas";
  submitBtn.addEventListener("click", submitQuiz);
  quizContainer.appendChild(submitBtn);

  const resultDiv = document.createElement("div");
  resultDiv.id = "quiz-result";
  quizContainer.appendChild(resultDiv);
}

function submitQuiz() {
  let score = 0;
  quizData.forEach((q, i) => {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    if (answer && parseInt(answer.value) === q.a) score++;
  });
  document.getElementById("quiz-result").textContent = `Você acertou ${score} de ${quizData.length} questões.`;
}
