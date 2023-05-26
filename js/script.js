const inputParagraph = document.getElementById('calculator__content-input-p');
const outputParagraph = document.getElementById('calculator__content-output-p');
/** @var {HTMLElement} Memory C button */
const MC = document.getElementById('MC');
/** @var {HTMLElement} Memory R button */
const MR = document.getElementById('MR');
/** @var {HTMLElement} Memory S button */
const MS = document.getElementById('MS');
/** @var {HTMLElement} Memory + button */
const MPlus = document.getElementById('Mplus');
/** @var {HTMLElement} Memory down arrow button */
const M = document.getElementById('M');
/** @var {HTMLElement} Memory - button */
const MMinus = document.getElementById('Mminus');
const percentBtn = document.getElementById('percent');
const ceBtn = document.getElementById('CE');
const cBtn = document.getElementById('C');
const deleteBtn = document.getElementById('delete');
const divide1xBtn = document.getElementById('divide1x');
const pow = document.getElementById('superScript');
const sqrt = document.getElementById('sqrt');
const divide = document.getElementById('divide');
const multiplication = document.getElementById('multiplication');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const plusMinus = document.getElementById('plusMinus');
const comma = document.getElementById('comma');
let sum = document.getElementById('sum');
/** @var {HTMLElement} History panel, associated with memory down arrow button */
const historyDisplay = document.getElementById('history-display');
let isTrueOutput = true;
let isTrueInput = false;
// let isTrueC = false;
let memoryArray = [];

MC.disabled = true;
MR.disabled = true;
MS.disabled = true;
M.disabled = true;

function clearOutput(x) {
	if (outputParagraph.textContent == '0.') {
		isTrueOutput = false;
	}
	if (isTrueOutput) {
		outputParagraph.textContent = '';
		isTrueOutput = false;
	}
	if (isTrueInput) {
		inputParagraph.textContent = '';
		isTrueInput = false;
	}
	outputParagraph.textContent += x;

	if (firstValue === undefined) firstValue = outputParagraph.textContent;
	else secondValue = outputParagraph.textContent;
}

function isZero(x) {
	if (x == '0') {
		isTrueOutput = true;
	} else {
		isTrueOutput = false;
	}
}

function blockDelete() {
	outputParagraph.textContent += '';
}

function containsComma(x) {
	if (x != undefined && x != null) {
		return x.replace(',', '.');
	} else {
		return x;
	}
}

// function addSpace(x) {
// 	if (outputParagraph.textContent > 3) {
// 		outputParagraph.textContent += ' ';
// 	}
// }
// addSpace();

function ce() {
	inputParagraph.textContent = '';
	outputParagraph.textContent = '0';
	isTrueOutput = true;

	memoryAdd = [null, null];
}

ceBtn.addEventListener('click', () => {
	outputParagraph.textContent = '0';
	isTrueOutput = true;
});

cBtn.addEventListener('click', () => {
	inputParagraph.textContent = '';
	outputParagraph.textContent = '0';
	isTrueOutput = true;

	firstValue = undefined;
	secondValue = undefined;
	memoryAdd = [null, null];
});

deleteBtn.addEventListener('click', () => {
	if (!isTrueOutput) {
		console.log(isTrueOutput);
		outputParagraph.textContent = outputParagraph.textContent.slice(0, -1);
	}
});

/**
 * Function for unbugging sum button.
 */
const resetSumButton = () => {
	const newSumButton = sum.cloneNode(true);
	sum.replaceWith(newSumButton);
	sum = newSumButton;
};

function memoryOperation() {
	if (memoryAdd[0] !== null && memoryAdd[1] !== null) {
		secondValue = memoryAdd[1];
		firstValue = memoryAdd[0];
	} else {
		secondValue = outputParagraph.textContent;
		memoryAdd[1] = secondValue;
	}
}

let firstValue;
let secondValue;

let memoryAdd = [null, null];

percentBtn.addEventListener('click', () => {
	if (firstValue !== undefined && secondValue !== undefined) {
		const result = parseFloat(firstValue) * (parseFloat(secondValue) / 100);
		inputParagraph.innerHTML += ` ${result.toString().replace('.', ',')}`;
		outputParagraph.innerHTML = result.toString().replace('.', ',');
	} else if (firstValue !== undefined && secondValue === undefined) {
		inputParagraph.innerHTML = '0';
		outputParagraph.innerHTML = '0';
	}
});

plus.addEventListener('click', () => {
	memoryAdd = [null, null];
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	inputParagraph.textContent = `${firstValue} +`;
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	resetSumButton();
	sum.addEventListener('click', () => {
		memoryOperation();
		firstValue = containsComma(firstValue);
		secondValue = containsComma(secondValue);
		fetch(
			`php/plus.php?value1Plus=${firstValue}&value2Plus=${secondValue}`
		).then(async (result) => {
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
			if (outputParagraph.innerHTML == 'Error') {
				inputParagraph.innerHTML = '';
				outputParagraph.innerHTML = '0';
			} else {
				inputParagraph.textContent =
					`${firstValue} + ${secondValue} =`.replaceAll('.', ',');
				memoryAdd[0] = outputParagraph.textContent;
			}
			isTrueOutput = true;
			isTrueInput = true;
			ceBtn.addEventListener('click', ce);
			firstValue = undefined;
			secondValue = undefined;
		});
	});
});

minus.addEventListener('click', () => {
	memoryAdd = [null, null];
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	inputParagraph.textContent = `${firstValue} -`;
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	resetSumButton();
	sum.addEventListener('click', () => {
		memoryOperation();
		firstValue = containsComma(firstValue);
		secondValue = containsComma(secondValue);
		fetch(
			`php/minus.php?value1Minus=${firstValue}&value2Minus=${secondValue}`
		).then(async (result) => {
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
			if (outputParagraph.innerHTML == 'Error') {
				inputParagraph.innerHTML = '';
				outputParagraph.innerHTML = '0';
			} else {
				inputParagraph.textContent =
					`${firstValue} - ${secondValue} =`.replaceAll('.', ',');
				memoryAdd[0] = outputParagraph.textContent;
			}
			isTrueOutput = true;
			isTrueInput = true;
			ceBtn.addEventListener('click', ce);
			firstValue = undefined;
			secondValue = undefined;
		});
	});
});
multiplication.addEventListener('click', () => {
	memoryAdd = [null, null];
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	inputParagraph.textContent = `${firstValue} x`;
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	resetSumButton();
	sum.addEventListener('click', () => {
		memoryOperation();
		firstValue = containsComma(firstValue);
		secondValue = containsComma(secondValue);
		fetch(
			`php/multiplication.php?value1Multiplication=${firstValue}&value2Multiplication=${secondValue}`
		).then(async (result) => {
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
			if (outputParagraph.innerHTML == 'Error') {
				inputParagraph.innerHTML = '';
				outputParagraph.innerHTML = '0';
			} else {
				inputParagraph.textContent =
					`${firstValue} x ${secondValue} =`.replaceAll('.', ',');
				memoryAdd[0] = outputParagraph.textContent;
			}
			isTrueOutput = true;
			isTrueInput = true;
			ceBtn.addEventListener('click', ce);
			firstValue = undefined;
			secondValue = undefined;
		});
	});
});

divide.addEventListener('click', () => {
	memoryAdd = [null, null];
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	inputParagraph.textContent = `${firstValue} ÷`;
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	resetSumButton();
	sum.addEventListener('click', () => {
		memoryOperation();
		firstValue = containsComma(firstValue);
		secondValue = containsComma(secondValue);
		fetch(
			`php/divide.php?value1Divide=${firstValue}&value2Divide=${secondValue}`
		).then(async (result) => {
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
			if (outputParagraph.innerHTML == 'Error') {
				inputParagraph.innerHTML = '';
				outputParagraph.innerHTML = '0';
			} else {
				inputParagraph.textContent =
					`${firstValue} ÷ ${secondValue} =`.replaceAll('.', ',');
				memoryAdd[0] = outputParagraph.textContent;
			}
			isTrueOutput = true;
			isTrueInput = true;
			ceBtn.addEventListener('click', ce);
			firstValue = undefined;
			secondValue = undefined;
		});
	});
});

sqrt.addEventListener('click', () => {
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	inputParagraph.textContent = `√(${firstValue})`;
	firstValue = containsComma(firstValue);
	fetch(`php/sqrt.php?value1Sqrt=${firstValue}`).then(async (result) => {
		outputParagraph.innerHTML = (await result.text()).replace('.', ',');
	});
	isTrueOutput = true;
	firstValue = undefined;
	secondValue = undefined;
});

pow.addEventListener('click', () => {
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	inputParagraph.textContent = `sqr(${firstValue})`;
	firstValue = containsComma(firstValue);
	fetch(`php/pow.php?value1Pow=${firstValue}`).then(async (result) => {
		outputParagraph.innerHTML = (await result.text()).replace('.', ',');
	});
	isTrueOutput = true;
	firstValue = undefined;
	secondValue = undefined;
});

divide1xBtn.addEventListener('click', () => {
	isTrueInput = false;
	firstValue = 1;
	inputParagraph.textContent = `1/(${outputParagraph.textContent})`;
	secondValue = outputParagraph.textContent;
	secondValue = containsComma(secondValue);
	fetch(
		`php/divide1x.php?value1Divide1x=${firstValue}&value2Divide1x=${secondValue}`
	).then(async (result) => {
		outputParagraph.innerHTML = (await result.text()).replace('.', ',');
	});
	isTrueOutput = true;
	firstValue = undefined;
	secondValue = undefined;
});

MPlus.addEventListener('click', () => {
	if (memoryArray.length === 0) {
		memoryArray.push(parseFloat(outputParagraph.textContent));
	} else {
		memoryArray[memoryArray.length - 1] += parseFloat(
			outputParagraph.textContent
		);
	}
	MC.disabled = false;
	MR.disabled = false;
	MS.disabled = false;
	M.disabled = false;
	MC.style.color = 'white';
	MR.style.color = 'white';
	MS.style.color = 'white';
	M.style.color = 'white';
	isTrueOutput = true;
});

MMinus.addEventListener('click', () => {
	if (memoryArray.length === 0) {
		memoryArray.push(parseFloat(outputParagraph.textContent));
	} else {
		memoryArray[memoryArray.length - 1] -= parseFloat(
			outputParagraph.textContent
		);
	}
	MC.disabled = false;
	MR.disabled = false;
	MS.disabled = false;
	M.disabled = false;
	MC.style.color = 'white';
	MR.style.color = 'white';
	MS.style.color = 'white';
	M.style.color = 'white';
	isTrueOutput = true;
});

MC.addEventListener('click', () => {
	memoryArray = [];
	MC.disabled = true;
	MR.disabled = true;
	MS.disabled = true;
	M.disabled = true;
	MC.style.color = 'rgb(95, 95, 95)';
	MR.style.color = 'rgb(95, 95, 95)';
	MS.style.color = 'rgb(95, 95, 95)';
	M.style.color = 'rgb(95, 95, 95)';
	isTrueOutput = true;
});

MR.addEventListener('click', () => {
	outputParagraph.textContent = memoryArray[memoryArray.length - 1];
	isTrueOutput = true;
});

MS.addEventListener('click', () => {
	memoryArray.push(parseFloat(outputParagraph.textContent));
	isTrueOutput = true;
});

M.addEventListener('click', () => {
	historyDisplay.innerHTML = '';

	historyDisplay.classList.toggle('visible');

	for (let i = memoryArray.length - 1; i >= 0; i--) {
		// console.log(memoryArray[i - 1]);
		historyDisplay.appendChild(createMemoryList(memoryArray[i]));
	}
});

function createMemoryList(number) {
	let li = document.createElement('li');
	li.textContent = number;
	return li;
}

plusMinus.addEventListener('click', () => {
	outputParagraph.textContent = parseFloat(outputParagraph.textContent) * -1;
});

comma.addEventListener('click', () => {
	if (outputParagraph.textContent == '') {
		outputParagraph.textContent = '0,';
	} else if (outputParagraph.textContent.includes(',')) {
		outputParagraph.textContent += '';
	} else {
		outputParagraph.textContent += ',';
	}
	isTrueOutput = false;
});

sum.addEventListener('click', () => {
	let value1Sum;
	isTrueInput = false;
	value1Sum = outputParagraph.textContent;
	inputParagraph.textContent = `${value1Sum} =`;
	outputParagraph.textContent = `${value1Sum}`;
	isTrueOutput = true;
});
