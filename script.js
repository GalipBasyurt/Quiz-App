const quiz = new Quiz(sorular);
const btnStart = document.querySelector(".btn_start");
const quizBox = document.querySelector(".quiz_box");
const questionQuiz = document.querySelector(".question_quiz");
const optionList = document.querySelector(".option-list");
const btnNext = document.querySelector(".btn-next");
const correctIcon = `<i class="fa-solid fa-check"></i>`;
const incorrectIcon = `<i class="fa-solid fa-times"></i>`;
const scoreBox = document.querySelector(".score-box");
const btnReplay = document.querySelector(".btn-replay");
const btnQuit = document.querySelector(".btn-quit");
const timeText = document.querySelector(".time-text");
const timeSecond = document.querySelector(".time-second");
const timeLine = document.querySelector(".time-line");

//* ilk soru
btnStart.addEventListener("click", () => {
  quizBox.classList.add("active");
  startTimer(10);
  startTimerLine();
  soruGoster(quiz.soruGetir());
  btnNext.classList.remove("show");
  soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
});

//* soru geçme
btnNext.addEventListener("click", () => {
  if (quiz.sorular.length != quiz.soruIndex + 1) {
    quiz.soruIndex++;
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(10);
    startTimerLine();
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    btnNext.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Quiz Bitti");
    quizBox.classList.remove("active");
    scoreBox.classList.add("active");
    skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
  }
});

//* soru göster
function soruGoster(soru) {
  let question = `<span>${soru.soruMetni}</span>`;
  let options = "";

  for (let cevap in soru.cevapSecenekleri) {
    options += `
                <div class="option">
                <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
                </div>
    
    `;
  }

  questionQuiz.innerHTML = question;
  optionList.innerHTML = options;

  let option = optionList.querySelectorAll(".option");

  for (let opt of option) {
    opt.setAttribute("onclick", "optionSelected(this)");
  }
}

//* doğru yanlış
function optionSelected(option) {
  clearInterval(counter);
  clearInterval(counterLine);
  let cevap = option.querySelector("span b").textContent;
  let soru = quiz.soruGetir();

  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi++;
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeEnd", correctIcon);
  } else {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeEnd", incorrectIcon);
  }

  for (let i = 0; i < optionList.children.length; i++) {
    optionList.children[i].classList.add("disable");
  }

  btnNext.classList.add("show");
}

//* Soru sayısı
function soruSayisiniGoster(soruSirasi, toplamSoru) {
  let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
  document.querySelector(".question-index").innerHTML = tag;
}

//* skor gösterme
function skoruGoster(soruSayisi, dogruSayisi) {
  let tag = `Toplam ${soruSayisi} sorudan ${dogruSayisi} doğru cevap verdiniz`;
  document.querySelector(".score-text").innerHTML = tag;
}

//* testi bitir
btnQuit.addEventListener("click", () => {
  window.location.reload();
});

//* testi tekrarla
btnReplay.addEventListener("click", () => {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  btnStart.click();
  scoreBox.classList.remove("active");
});

//* time

let counter;
function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeSecond.textContent = time;
    time--;

    if (time < 0) {
      clearInterval(counter);

      timeText.textContent = "Süre Bitti";

      let cevap = quiz.soruGetir().dogruCevap;

      for (let option of optionList.children) {
        if (option.querySelector("span b").textContent == cevap) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeEnd", correctIcon);
        }
        option.classList.add("disable");
      }
      btnNext.classList.add("show");
    }
  }
}

//* time line

let counterLine;
function startTimerLine() {
  lineWidth = 0;

  counterLine = setInterval(timer, 100);

  function timer() {
    lineWidth += 5;
    timeLine.style.width = lineWidth + "px";

    if (lineWidth > 549) {
      clearInterval(counterLine);
    }
  }
}
