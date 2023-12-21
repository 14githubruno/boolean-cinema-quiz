// seconds-timer obj: 3 arrays for the 3 levels
const seconds = {
  basic: 30,
  medium: 25,
  advanced: 20,
};

// three arrays of ten objects each
const basic = [
  {
    assertion: "Lorem Basic 1",
    value: true,
  },
  {
    assertion: "Lorem Basic 2",
    value: true,
  },
  {
    assertion: "Lorem Basic 3",
    value: false,
  },
  {
    assertion: "Lorem Basic 4",
    value: true,
  },
  {
    assertion: "Lorem Basic 5",
    value: false,
  },
  {
    assertion: "Lorem Basic 6",
    value: false,
  },
  {
    assertion: "Lorem Basic 7",
    value: false,
  },
  {
    assertion: "Lorem Basic 8",
    value: true,
  },
  {
    assertion: "Lorem Basic 9",
    value: false,
  },
  {
    assertion: "Lorem Basic 10",
    value: true,
  },
];

const medium = [
  {
    assertion: "Lorem Medium 1",
    value: false,
  },
  {
    assertion: "Lorem Medium 2",
    value: true,
  },
  {
    assertion: "Lorem Medium 3",
    value: false,
  },
  {
    assertion: "Lorem Medium 4",
    value: true,
  },
  {
    assertion: "Lorem Medium 5",
    value: false,
  },
  {
    assertion: "Lorem Medium 6",
    value: false,
  },
  {
    assertion: "Lorem Medium 7",
    value: false,
  },
  {
    assertion: "Lorem Medium 8",
    value: true,
  },
  {
    assertion: "Lorem Medium 9",
    value: false,
  },
  {
    assertion: "Lorem Medium 10",
    value: true,
  },
];

const advanced = [
  {
    assertion: "Lorem Advanced 1",
    value: false,
  },
  {
    assertion: "Lorem Advanced 2",
    value: true,
  },
  {
    assertion: "Lorem Advanced 3",
    value: false,
  },
  {
    assertion: "Lorem Advanced 4",
    value: true,
  },
  {
    assertion: "Lorem Advanced 5",
    value: false,
  },
  {
    assertion: "Lorem Advanced 6",
    value: false,
  },
  {
    assertion: "Lorem Advanced 7",
    value: false,
  },
  {
    assertion: "Lorem Advanced 8",
    value: true,
  },
  {
    assertion: "Lorem Advanced 9",
    value: false,
  },
  {
    assertion: "Lorem Advanced 10",
    value: true,
  },
];

//
// 2 sections interchangeable through clicks
// 1 homepage
const homePage = document.querySelector(".total-homepage");
const basicQuizButton = document.querySelector(".level-basic");
const mediumQuizButton = document.querySelector(".level-medium");
const advancedQuizButton = document.querySelector(".level-advanced");
// 2 quiz
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
// function for allowing custom keyboard shortcuts when playing the quiz
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

//
// functions for handling quiz (end it if needed), changing assertions, keeping track, counting the number of correct answers
let finalResult = [];
const checkResult = (arr1, arr2) => {
  arr1.forEach((el, index) => {
    if (el === arr2[index]) {
      finalResult.push("correct answer");
    }
  });
};

const confirmTheEndOfTheQuiz = () => {
  document.removeEventListener("keydown", shortcut);
  singleAssertion.textContent = `the result is ${finalResult.length}/10`;
  timer.classList.add("invisible");
  tracking.classList.add("invisible");
  submitButton.classList.add("invisible");
  labels.forEach((el) => {
    el.classList.add("invisible");
  });
};

let counter = 1;
let assertionsValues = [];
let userValues = [];
const handleQuiz = (arr) => {
  if (!inputs[0].checked && !inputs[1].checked) {
    alert("You should make a choice");
  } else {
    inputs.forEach((el) => {
      if (el.checked) {
        if (el.value === "true") {
          userValues.push(true);
        } else {
          userValues.push(false);
        }
        el.checked = false;
      }
    });

    if (arr.length > 0) {
      counter++;
      eachTrack.textContent = counter;
      let currentAssertion = arr.shift();
      singleAssertion.textContent = currentAssertion.assertion;
    } else {
      checkResult(userValues, assertionsValues);
      confirmTheEndOfTheQuiz();
    }
  }
};

//
// function for counting down (timer)
let secondsTimer = document.querySelector(".timer-item-seconds");
const countDown = (levelSec) => {
  let interval = setInterval(() => {
    levelSec--;
    secondsTimer.textContent = levelSec;
  }, 1000);

  let rightTime = levelSec * 1000;
  setTimeout(() => {
    if (finalResult.length === 0) {
      checkResult(userValues, assertionsValues);
    }
    confirmTheEndOfTheQuiz();
    clearInterval(interval);
  }, rightTime);
};

// function for handling the amount of seconds (timer)
const handleTimer = (levelSec) => {
  secondsTimer.textContent = levelSec;
  countDown(levelSec);
};

// THREE behaviours of the THREE buttons:
// function for starting the right quiz with the right number of seconds;
const startQuiz = (levelSec) => {
  homePage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  document.addEventListener("keydown", shortcut);
  handleTimer(levelSec);
};

// function for setting the right package of assertions and enabling the submit button
const setSubmitButton = (level) => {
  submitButton.addEventListener("click", () => {
    handleQuiz(level);
  });
};

// function allowing the setup and grabbing the boolean values of each assertion
const prepareFirstAssertion = (arrOfAssertions) => {
  arrOfAssertions.forEach((assert) => {
    assertionsValues.push(assert.value);
  });
  singleAssertion.textContent = arrOfAssertions[0].assertion;
  arrOfAssertions.shift();
};

// THREE buttons for the THREE levels
// basic-button
basicQuizButton.addEventListener("click", () => {
  startQuiz(seconds.basic);
  setSubmitButton(basic);
  prepareFirstAssertion(basic);
});
// medium-button
mediumQuizButton.addEventListener("click", () => {
  startQuiz(seconds.medium);
  setSubmitButton(medium);
  prepareFirstAssertion(medium);
});
// advanced-button
advancedQuizButton.addEventListener("click", () => {
  startQuiz(seconds.advanced);
  setSubmitButton(advanced);
  prepareFirstAssertion(advanced);
});

//
//function/behaviour of the logo
const doNotAllowQuiz = () => {
  window.location.reload();
  homePage.classList.remove("hidden");
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
