const removeClassAfterDelay = function (obj, delay, classNames) {
  setTimeout(() => {
    obj.classList.remove(...classNames);
  }, delay);
};

const display = document.querySelector(".screen span");

const updateDisplay = (value) => {
  display.innerHTML = value;
};

// A PROBLEM YOU ENCOUNTERED:
// Before the way buttons were set they had a mousedown and mouseup event
// if a user puts mouse down on a button and they move cursor to another button the original button will not be removed
// to fix this a timeout is added in the mousedown which automatically removes the class after a delay
// better than button:active since you can still move cursor and button stays active

// DIGITS
// TODO account for decimal
for (let dig of document.querySelectorAll(".dig")) {
  dig.addEventListener("mousedown", function () {
    this.classList.add("click", "dig-click");
    let dig = this.innerHTML;
    let display = document.querySelector(".screen span");

    if (display.innerHTML === "0") display.innerHTML = dig;
    else if (display.innerText.length < 11) display.innerHTML += dig;
    removeClassAfterDelay(this, 120, ["click", "dig-click"]);
  });
}

// PRIMARY OPERATORS
const [div, mult, sub, add, equal] = document.querySelectorAll(".op");

const operatorStyle = function (op) {
  op.classList.add("click", "op-click");
};

for (let op2 of [div, mult, sub, add, equal])
  op2.addEventListener("mousedown", function () {
    this.classList.add("click", "op-click");
    removeClassAfterDelay(this, 120, ["click", "op-click"]);
  });

// SECONDARY OPERATORS

const [clr, pm, percent, del] = document.querySelectorAll(".sec-op");

const removeSecOpStyle = (obj) =>
  removeClassAfterDelay(obj, 120, ["click", "sec-op-click"]);

const secondaryOpStyle = function (obj) {
  obj.classList.add("click", "sec-op-click");
};

clr.addEventListener("mousedown", function () {
  secondaryOpStyle(this);
  let display = document.querySelector(".screen span");
  display.innerHTML = "0";
  removeSecOpStyle(this);
});

pm.addEventListener("mousedown", function () {
  secondaryOpStyle(this);
  let display = document.querySelector(".screen span");
  let num = display.innerHTML;
  display.innerHTML =
    num[0] === "-" ? num.slice(1) : !parseInt(num) ? num : "-" + num;
  removeSecOpStyle(this);
});

// select button with id percent and add eventListener for mouse down, which is given the callback secondaryOpStyle

percent.addEventListener("mousedown", function () {
  secondaryOpStyle(this);
  removeSecOpStyle(this);
});

del.addEventListener("mousedown", function () {
  secondaryOpStyle(this);
  updateDisplay(display.innerHTML.length === 1 ? "0" : display.innerHTML.slice(0, -1));
  removeSecOpStyle(this);
});
