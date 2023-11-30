// assertions obj: 3 arrays for the 3 levels
const assertions = {
  basic: [
    "Lorem Basic 1",
    "Lorem Basic 2",
    "Lorem Basic 3",
    "Lorem Basic 4",
    "Lorem Basic 5",
    "Lorem Basic 6",
    "Lorem Basic 7",
    "Lorem Basic 8",
    "Lorem Basic 9",
    "Lorem Basic 10",
  ],
  medium: [
    "Lorem Medium 1",
    "Lorem Medium 2",
    "Lorem Medium 3",
    "Lorem Medium 4",
    "Lorem Medium 5",
    "Lorem Medium 6",
    "Lorem Medium 7",
    "Lorem Medium 8",
    "Lorem Medium 9",
    "Lorem Medium 10",
  ],
  advanced: [
    "Lorem Advanced 1",
    "Lorem Advanced 2",
    "Lorem Advanced 3",
    "Lorem Advanced 4",
    "Lorem Advanced 5",
    "Lorem Advanced 6",
    "Lorem Advanced 7",
    "Lorem Advanced 8",
    "Lorem Advanced 9",
    "Lorem Advanced 10",
  ],
};

//
// 3 sections interchangeable through clicks
// 1 homepage
const homePage = document.querySelector(".total-homepage");
const basicQuizButton = document.querySelector(".level-basic");
const mediumQuizButton = document.querySelector(".level-medium");
const advancedQuizButton = document.querySelector(".level-advanced");
// 2 double-check
const doubleCheck = document.querySelector(".total-double-check");
const buttonStartQuiz = document.querySelector(".double-check-button");
// 3 quiz
const quizPage = document.querySelector(".total-quiz");
const timer = document.querySelector(".timer");
const tracking = document.querySelector(".assertions-tracking");
const eachTrack = document.querySelector(".each-assertion");
const singleAssertion = document.querySelector(".assertion");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const submitButton = document.querySelector(".button-submit-js");
//
// section-info (block)
const sectionInfo = document.querySelector(".info");
//
// header items (two items)
const logo = document.querySelector(".navbar-logo");
const navInfo = document.querySelector(".info-path");
//
// footer item (one item)
const anchorTop = document.querySelector(".anchor-top");

//
//
// functions for handling quiz, changing assertions, keeping track
const confirmTheEndOfTheQuiz = () => {
  singleAssertion.textContent = "done";
  timer.classList.add("invisible");
  tracking.classList.add("invisible");
  submitButton.classList.add("invisible");
  labels.forEach((el) => {
    el.classList.add("invisible");
  });
};

let counter = 1;
const handleQuiz = (arr) => {
  if (!inputs[0].checked && !inputs[1].checked) {
    alert("make a choice!");
  } else {
    inputs.forEach((el) => {
      el.checked = false;
    });

    if (arr.length > 0) {
      counter++;
      eachTrack.textContent = counter;
      singleAssertion.textContent = arr.shift();
    } else {
      confirmTheEndOfTheQuiz();
    }
  }
};

//
//
// function for allowing custom shortcuts when playing the quiz
const shortcut = (ev) => {
  ev.preventDefault();

  if (ev.key === "t" && ev.ctrlKey && ev.altKey) {
    inputs[0].click();
  }
  if (ev.key === "f" && ev.ctrlKey && ev.altKey) {
    inputs[1].click();
  }
  if (ev.key === "s" && ev.ctrlKey && ev.altKey) {
    submitButton.click();
  }
};
// function for the start-button (once chosen the level)
const startQuiz = () => {
  doubleCheck.classList.add("hidden");
  quizPage.classList.remove("hidden");
  document.addEventListener("keydown", shortcut);
};
buttonStartQuiz.addEventListener("click", startQuiz);

//
// function/behaviour of the THREE buttons for the THREE levels
const allowQuiz = () => {
  homePage.classList.add("hidden");
  doubleCheck.classList.remove("hidden");
};
const setSubmitButton = (level) => {
  submitButton.addEventListener("click", () => {
    handleQuiz(level);
  });
};
const prepareFirstAssertion = (assert) => {
  singleAssertion.textContent = assert[0];
  assert.shift();
};

basicQuizButton.addEventListener("click", () => {
  allowQuiz();
  setSubmitButton(assertions.basic);
  prepareFirstAssertion(assertions.basic);
});
mediumQuizButton.addEventListener("click", () => {
  allowQuiz();
  setSubmitButton(assertions.medium);
  prepareFirstAssertion(assertions.medium);
});
advancedQuizButton.addEventListener("click", () => {
  allowQuiz();
  setSubmitButton(assertions.advanced);
  prepareFirstAssertion(assertions.advanced);
});

//
//

//function/behaviour of the logo
const doNotAllowQuiz = () => {
  window.location.reload();
  homePage.classList.remove("hidden");
  doubleCheck.classList.add("hidden");
  quizPage.classList.add("hidden");
  document.removeEventListener("keydown", shortcut);
};
logo.addEventListener("click", doNotAllowQuiz);

// function for anchor-top
const backToTop = () => {
  document.body.scrollIntoView();
};
anchorTop.addEventListener("click", backToTop);

// function for info
const goToInfo = () => {
  sectionInfo.scrollIntoView();
};
navInfo.addEventListener("click", goToInfo);
