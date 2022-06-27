const display = document.querySelector(".screen span");
const displayText = () => display.innerHTML;
const updateDisplay = (value) => {
  if (value.endsWith("Error")) display.classList.add("err");
  display.innerHTML = value;
};

const removeStyles = (obj, list) => {
  obj.addEventListener("mouseup", function () {
    this.classList.remove(...list);
  });
  obj.addEventListener("mouseleave", function () {
    this.classList.remove(...list);
  });
};

let firstNum = (operator = secondNum = null);

for (let dig of document.querySelectorAll(".dig")) {
  dig.addEventListener("mousedown", function () {
    this.classList.add("click", "dig-click");
    if (displayText().endsWith("Error")) return;
    let dig = this.value ? this.value : this.innerHTML;
    if (displayText() === "0" && !(dig === ".")) display.innerHTML = dig;
    else if (displayText().length < 10)
      display.innerHTML +=
        displayText().includes(".") && dig === "." ? "" : dig;
  });
  removeStyles(dig, ["click", "dig-click"]);
}

// PRIMARY OPERATORS
const [div, mult, sub, equal, add] = document.querySelectorAll(".op");

const operatorStyle = (op) => op.classList.add("click", "op-click");

const beforeOp = () => {
  if (firstNum && operator && displayText()) {
    console.log(displayText());
    secondNum = parseFloat(displayText());
    firstNum = operator(firstNum, secondNum);
    secondNum = null;
  } else if (firstNum && operator && !displayText()) {
    void 0;
  } else {
    firstNum = parseFloat(displayText());
  }
  updateDisplay("");
};

for (let op of [div, mult, sub, add, equal]) {
  op.addEventListener("mousedown", function () {
    operatorStyle(this);
    if (displayText().endsWith("Error")) return;
    switch (op) {
      case div:
        beforeOp();
        operator = (a, b) => a / b;
        break;
      case mult:
        beforeOp();
        operator = (a, b) => a * b;
        break;
      case sub:
        beforeOp();
        operator = (a, b) => a - b;
        break;
      case add:
        beforeOp();
        operator = (a, b) => a + b;
        break;
      case equal:
        console.log(displayText());

        if (firstNum && operator && displayText()) {
          secondNum = secondNum ? secondNum : parseFloat(displayText());
          const res = operator(firstNum, secondNum);
          const resStr = res.toString();
          updateDisplay(
            isNaN(res)
              ? "Math Error"
              : resStr.length < 10
              ? resStr
              : resStr.includes("e")
              ? "Floating Error"
              : resStr.slice(0, 11)
          );
          firstNum = res;
          console.log(secondNum);
        } else if (!displayText()) {
          updateDisplay("Error");
        } else {
          firstNum = parseFloat(displayText());
          updateDisplay(firstNum.toString());
        }
        secondNum = null;
        operator = null;
        break;
    }
  });
  removeStyles(op, ["click", "op-click"]);
}
// SECONDARY OPERATORS

const [clr, del, pm, percent] = document.querySelectorAll(".sec-op");

const secondaryOpStyle = function (obj) {
  obj.classList.add("click", "sec-op-click");
};

const clrCallback = () => {
  display.innerHTML = "0";
  display.classList.remove("err");
  firstNum = secondNum = operator = null;
};

const pmCallback = () => {
  let num = displayText();
  display.innerHTML =
    num[0] === "-" ? num.slice(1) : !parseInt(num) ? num : "-" + num;
};
const percentCallback = () =>
  updateDisplay((parseFloat(displayText()) / 100).toString());

const delCallback = () => {
  updateDisplay(displayText().length === 1 ? "0" : displayText().slice(0, -1));
};
const secOpcallBacks = [clrCallback, delCallback, pmCallback, percentCallback];
const secOps = [clr, del, pm, percent];
for (let i = 0; i < secOps.length; i++) {
  secOps[i].addEventListener("mousedown", function () {
    secondaryOpStyle(this);
    if (displayText().endsWith("Error") && secOps[i] != clr) return;
    secOpcallBacks[i]();
  });
  removeStyles(secOps[i], ["click", "sec-op-click"]);
}

// A PROBLEM YOU ENCOUNTERED:
// Before the way buttons were set they had a mousedown and mouseup event
// if a user puts mouse down on a button and they move cursor to another button the original button will not be removed
// to fix this a timeout is added in the mousedown which automatically removes the class after a delay
// better than button:active since you can still move cursor and button stays active

// DIGITS
