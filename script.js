const numbers = document.querySelectorAll(".number1");
const operators1 = document.querySelectorAll(".operator1");
const clean = document.querySelector(".clean");
const delete1 = document.querySelector(".delete0");
const equal = document.querySelector(".equal");
const resultPrevious = document.querySelector(".PreviousAction");
const resultCurrent  = document.querySelector(".CurrentAction");


let CurrentAction = "";
let operation = undefined;
let PreviousAction = "";

const calculate = () => {
    let Action
    if(!PreviousAction || !CurrentAction) {
        return;
    }

    const Previous = parseFloat(PreviousAction);
    const Current  = parseFloat(CurrentAction);

    if(isNaN(Previous) || isNaN(Current )) {
        return;
    }

    switch (operation) {
        case "+":
            Action = Previous + Current;
            break;
        case "-":
            Action = Previous - Current;
            break;
        case "×":
            Action = Previous * Current; 
            break;
        case "÷":
            if(Current  === 0)
        {
            cleanResult();
            return;
        }
            Action = Previous / Current; 
            break;
        case "^":
            Action = Math.pow(Previous, Current );
            break;
        case "%":
            Action = Previous / 100 * Current;
            break;
        case "√":
            Action = Math.pow(Previous, 1 / Current );
            break;
        case "log":
            Action = Math.log(Previous) / Math.log(Current );
            break;
    default:
        return;
    }
    CurrentAction = Action;
    operation = undefined;
    PreviousAction = "";

}

const selectOperations = (operator1) => {
    if(CurrentAction === "") {
        return;
    }
    if(PreviousAction !== "") {
        const Previous = resultPrevious.innerText
        if(CurrentAction.toString() === "0" &&  Previous[Previous.length - 1] === "÷") {
            cleanResult()
            return;
        }
        calculate();
    }

    operation = operator1;
    PreviousAction = CurrentAction;
    CurrentAction = "";
}

const addNumber = (number1) => {
    if(number1 === ".") {
        if(CurrentAction.includes(".")) {
        return;
        }
    }
    CurrentAction = CurrentAction.toString() + number1.toString();
}

const delete1Number = () => {
    CurrentAction = CurrentAction.toString().slice(0, -1);
}

const updateResult = () => {
    resultCurrent .innerText = CurrentAction;

    if(operation != null) {
    resultPrevious.innerText = PreviousAction + operation;
    } else {
        resultPrevious.innerText = "";
    }
}

const cleanResult = () => {
    CurrentAction = "";
    operation = undefined;
    PreviousAction = "";
}

numbers.forEach((number1) => {
    number1.addEventListener("click", () => {
        addNumber(number1.innerText);
        updateResult();
    })
})

operators1.forEach((operator1) => {
    operator1.addEventListener("click", () => {
        selectOperations(operator1.innerText);
        updateResult();
    })
})

equal.addEventListener("click", () => {
    calculate();
    updateResult();
})

delete1.addEventListener("click", () => {
    delete1Number();
    updateResult();
})

clean.addEventListener("click", () => {
    cleanResult();
    updateResult();
})