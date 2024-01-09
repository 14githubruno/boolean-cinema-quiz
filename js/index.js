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

// navbar items
const logo = document.querySelector(".navbar-logo");
const navInfo = document.querySelector(".info-path");
// 1 homepage
const homePage = document.querySelector(".total-homepage");
const headings = document.querySelector(".heading");
const containerResult = document.querySelector(".result");
const resultUser = document.querySelector(".result-user");
const basicQuizButton = document.querySelector(".level-basic");
const mediumQuizButton = document.querySelector(".level-medium");
const advancedQuizButton = document.querySelector(".level-advanced");
// 2 quiz
const quizPage = document.querySelector(".total-quiz");
const timer = document.querySelector(".timer");
const secondsTimer = document.querySelector(".timer-item-seconds");
const eachTrack = document.querySelector(".each-assertion");
const singleAssertion = document.querySelector(".assertion");
const inputs = document.querySelectorAll("input");
const submitButton = document.querySelector(".button-submit-js");
// 3 info
const infoModal = document.querySelector(".info");
const tooltipAboutContainer = document.querySelector(
  ".tooltip-about-container"
);
const closeButton = document.querySelector(".close-btn");

//
// function for allowing custom keyboard shortcuts
const shortcuts = (ev) => {
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

// show quiz
const showQuiz = () => {
  document.addEventListener("keydown", shortcuts);
  homePage.classList.add("hidden");
  quizPage.classList.remove("hidden");
};

// hide quiz
const hideQuiz = () => {
  document.removeEventListener("keydown", shortcuts);
  quizPage.classList.add("hidden");
  homePage.classList.remove("hidden");
};

// end quiz
const confirmTheEndOfTheQuiz = () => {
  index = 1;
  eachTrack.textContent = 1;
  resultUser.textContent = `The result is ${finalResult.length}/10`;
  headings.classList.add("hidden");
  containerResult.classList.remove("hidden");
};

// arrays to grab data to check user's answers
let finalResult = [];
let assertionsValues = [];
let userValues = [];
//
const restoreArrays = () => {
  assertionsValues = [];
  userValues = [];
  finalResult = [];
};

// func to calculate user's correct answers
const checkResult = (arr1, arr2) => {
  arr1.forEach((el, index) => {
    if (el === arr2[index]) {
      finalResult.push("correct answer");
    }
  });
};

// function for counting down (timer)
let interval;
let timeout;
const handleTimerCountDown = (levelSec) => {
  interval = setInterval(() => {
    levelSec--;
    secondsTimer.textContent = levelSec;
  }, 1000);

  let rightTime = levelSec * 1000;
  timeout = setTimeout(() => {
    if (finalResult.length === 0) {
      checkResult(userValues, assertionsValues);
    }
    confirmTheEndOfTheQuiz();
    restoreArrays();
    hideQuiz();
    clearInterval(interval);
  }, rightTime);
};

// functions for handling the entire quiz (end it if needed), changing assertions and keeping track of them, storing user's answers
let index = 1;
const handleQuiz = (arr) => {
  if (!inputs[0].checked && !inputs[1].checked) {
    return;
  } else {
    inputs.forEach((input) => {
      if (input.checked) {
        if (input.value === "true") {
          userValues.push(true);
        } else {
          userValues.push(false);
        }
        input.checked = false;
      }
    });

    if (userValues.length === arr.length) {
      checkResult(userValues, assertionsValues);
      confirmTheEndOfTheQuiz();
      restoreArrays();
      hideQuiz();
      clearInterval(interval);
      clearTimeout(timeout);
    } else {
      let currentItem = arr[index];
      singleAssertion.textContent = currentItem?.assertion;
      index++;
      eachTrack.textContent = index;
    }
  }
};
submitButton.addEventListener("click", () => {
  handleQuiz(array);
});

// function allowing the setup and grabbing the boolean values of each assertion
let array;
const prepareArrayForTheQuiz = (arrOfAssertions) => {
  arrOfAssertions.forEach((assert) => {
    assertionsValues.push(assert?.value);
  });
  array = [...arrOfAssertions];
  singleAssertion.textContent = array[0]?.assertion;
};

// function for starting the right quiz with the right number of seconds;
const startQuiz = (levelSec) => {
  showQuiz();
  secondsTimer.textContent = levelSec;
  handleTimerCountDown(levelSec);
};

// THREE buttons for the THREE levels
// basic-button
basicQuizButton.addEventListener("click", () => {
  startQuiz(seconds.basic);
  prepareArrayForTheQuiz(basic);
});
// medium-button
mediumQuizButton.addEventListener("click", () => {
  startQuiz(seconds.medium);
  prepareArrayForTheQuiz(medium);
});
// advanced-button
advancedQuizButton.addEventListener("click", () => {
  startQuiz(seconds.advanced);
  prepareArrayForTheQuiz(advanced);
});

//
//function/behaviour of the logo
const doNotAllowQuiz = () => {
  hideQuiz();
  window.location.reload();
};
logo.addEventListener("click", doNotAllowQuiz);

// function for info (modal)
const showInfoModal = (e) => {
  e.stopPropagation();
  infoModal.classList.remove("hidden");
  window.addEventListener("click", hideInfoModal);
};
navInfo.addEventListener("click", showInfoModal);

const hideInfoModal = (e) => {
  let areaOfModal = tooltipAboutContainer.contains(e.target);
  let areaCloseButton = closeButton.contains(e.target);
  if (!areaOfModal || areaCloseButton) {
    infoModal.classList.add("hidden");
    window.removeEventListener("click", hideInfoModal);
  }
};
