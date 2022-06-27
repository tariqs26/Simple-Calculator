// DISPLAY RELATED FUNCTIONS AND VARIABLES

// TODO Clean up code and document
const display = document.querySelector(".screen span");
const displayText = () => display.innerHTML;
const updateDisplay = (value) => {
  if (value.endsWith("Error")) display.classList.add("err");
  display.innerHTML = value;
};

const validateResult = (val) => {
  const valStr = val.toString();
  return isNaN(val)
    ? "Math Error"
    : valStr.length < 10
    ? valStr
    : valStr.includes("e")
    ? "Floating Error"
    : valStr.slice(0, 11);
};

let firstNum = (operator = secondNum = null);
let opEnter = false;

const addStyle = (obj, style) => obj.classList.add("click", style);

const removeStyle = (obj, style) => {
  obj.addEventListener("mouseup", function () {
    this.classList.remove("click", style);
  });
  obj.addEventListener("mouseleave", function () {
    this.classList.remove("click", style);
  });
};

// DIGITS
for (let dig of document.querySelectorAll(".dig")) {
  dig.addEventListener("mousedown", function () {
    addStyle(this, "dig-click");
    if (displayText().endsWith("Error")) return;
    let dig = this.value ? this.value : this.innerHTML;
    if ((displayText() === "0" && !(dig === ".")) || opEnter) {
      display.innerHTML = dig;
      opEnter = false;
    } else if (displayText().length < 10) display.innerHTML += displayText().includes(".") && dig === "." ? "" : dig;
  });
  removeStyle(dig, "dig-click");
}

// PRIMARY OPERATORS
const [div, mult, sub, equal, add] = document.querySelectorAll(".op");

const beforeOp = () => {
  if (firstNum && operator && displayText() && !opEnter) {
    secondNum = parseFloat(displayText());
    firstNum = operator(firstNum, secondNum);
    updateDisplay(validateResult(firstNum));
    secondNum = null;
    opEnter = true;
  } else if (firstNum && operator && !displayText() || opEnter) {
    void 0;
  } else {
    firstNum = parseFloat(displayText());
    opEnter = true;
  }
};
for (let op of [div, mult, sub, add, equal]) {
  op.addEventListener("mousedown", function () {
    addStyle(op, "op-click");
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
        if (firstNum && operator && displayText() && !opEnter) {
          secondNum = secondNum ? secondNum : parseFloat(displayText());
          const res = operator(firstNum, secondNum);
          updateDisplay(validateResult(res));
          firstNum = res;
        } else if (!displayText() || opEnter) updateDisplay("Error");
        else {
          firstNum = parseFloat(displayText());
          updateDisplay(validateResult(firstNum));
        }
        secondNum = operator = null;
        opEnter = false;
    }
  });
  removeStyle(op, "op-click");
}
// SECONDARY OPERATORS

const [clr, del, pm, percent] = document.querySelectorAll(".sec-op");

const clrCallback = () => {
  display.innerHTML = "0";
  display.classList.remove("err");
  firstNum = secondNum = operator = null;
  opEnter = false;
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
    addStyle(this, "sec-op-click");
    if (displayText().endsWith("Error") && secOps[i] != clr) return;
    secOpcallBacks[i]();
  });
  removeStyle(secOps[i], "sec-op-click");
}



// A PROBLEM YOU ENCOUNTERED:
// Before the way buttons were set they had a mousedown and mouseup event
// if a user puts mouse down on a button and they move cursor to another button the original button will not be removed
// to fix this a timeout is added in the mousedown which automatically removes the class after a delay
// better than button:active since you can still move cursor and button stays active
