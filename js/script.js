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
const historyBtn = document.getElementById('historyBtn');
const historyDiv = document.getElementById('history-div');
let isTrueOutput = true;
let isTrueInput = false;
let memoryArray = [];
let historyArray = [];

MC.disabled = true;
MR.disabled = true;
M.disabled = true;

function clearOutput(x) {
	enableBtns();
	if (outputParagraph.textContent == '0,') {
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
	// // outputParagraph.style.fontSize = '4rem';

	if (outputParagraph.textContent.length > 18) {
		outputParagraph.style.fontSize = '3rem';
		outputParagraph.textContent += '';
	} else if (outputParagraph.textContent.length > 10) {
		outputParagraph.style.fontSize = '3rem';
		outputParagraph.textContent += x;
	} else {
		outputParagraph.style.fontSize = '4rem';
		outputParagraph.textContent += x;
	}

	if (firstValue === undefined) {
		firstValue = outputParagraph.textContent;
	} else {
		secondValue = outputParagraph.textContent;
	}
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

function blockComma() {
	outputParagraph.textContent += '';
}

function containsComma(x) {
	if (x != undefined && x != null) {
		return x.replace(',', '.');
	} else {
		return x;
	}
}

function ce() {
	enableBtns();
	outputParagraph.style.fontSize = '4rem';
	inputParagraph.textContent = '';
	outputParagraph.textContent = '0';
	isTrueOutput = true;

	memoryAdd = [null, null];
}

function commaAfterOperation() {
	inputParagraph.textContent = '';
	outputParagraph.textContent = '0,';
}

ceBtn.addEventListener('click', () => {
	enableBtns();
	outputParagraph.style.fontSize = '4rem';
	outputParagraph.textContent = '0';
	isTrueOutput = true;
	// memoryAdd = [null, null];
});

cBtn.addEventListener('click', () => {
	enableBtns();
	outputParagraph.style.fontSize = '4rem';
	inputParagraph.textContent = '';
	outputParagraph.textContent = '0';
	isTrueOutput = true;

	firstValue = undefined;
	secondValue = undefined;
	memoryAdd = [null, null];
});

deleteBtn.addEventListener('click', () => {
	if (!isTrueOutput && outputParagraph.textContent.length > 1) {
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

comma.addEventListener('click', () => {
	if (outputParagraph.textContent == '0') {
		outputParagraph.textContent = '0,';
	} else if (outputParagraph.textContent.includes(',')) {
		outputParagraph.textContent += '';
	} else {
		outputParagraph.textContent += ',';
	}
	isTrueOutput = false;
});

percentBtn.addEventListener('click', () => {
	if (firstValue !== undefined && secondValue !== undefined) {
		// fetch(`php/percent.php?value1Percent=${secondValue}`).then(
		// 	async (outcome) => {secondValue = outcome.text(); }
		// );
		const result = (parseFloat(firstValue) * parseFloat(secondValue)) / 100;
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
			historyArray.push(
				`${firstValue} + ${secondValue} = ${outputParagraph.innerHTML}`
			);
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
			comma.addEventListener('click', commaAfterOperation);

			firstValue = undefined;
			secondValue = undefined;
		});
	});
	ceBtn.removeEventListener('click', ce);
	comma.removeEventListener('click', commaAfterOperation);
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
			historyArray.push(
				`${firstValue} - ${secondValue} = ${outputParagraph.innerHTML}`
			);
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
			comma.addEventListener('click', commaAfterOperation);
			firstValue = undefined;
			secondValue = undefined;
		});
	});
	ceBtn.removeEventListener('click', ce);
	comma.removeEventListener('click', commaAfterOperation);
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
			historyArray.push(
				`${firstValue} x ${secondValue} = ${outputParagraph.innerHTML}`
			);
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
			comma.addEventListener('click', commaAfterOperation);
			firstValue = undefined;
			secondValue = undefined;
		});
	});
	ceBtn.removeEventListener('click', ce);
	comma.removeEventListener('click', commaAfterOperation);
});

function disableBtns() {
	outputParagraph.style.fontSize = '2.5rem';
	percentBtn.style.backgroundColor = 'rgb(26, 25, 25)';
	percentBtn.disabled = true;
	divide1xBtn.style.backgroundColor = 'rgb(26, 25, 25)';
	divide1xBtn.disabled = true;
	pow.style.backgroundColor = 'rgb(26, 25, 25)';
	pow.disabled = true;
	sqrt.style.backgroundColor = 'rgb(26, 25, 25)';
	sqrt.disabled = true;
	divide.style.backgroundColor = 'rgb(26, 25, 25)';
	divide.disabled = true;
	multiplication.style.backgroundColor = 'rgb(26, 25, 25)';
	multiplication.disabled = true;
	minus.style.backgroundColor = 'rgb(26, 25, 25)';
	minus.disabled = true;
	plus.style.backgroundColor = 'rgb(26, 25, 25)';
	plus.disabled = true;
	plusMinus.style.backgroundColor = 'rgb(26, 25, 25)';
	plusMinus.disabled = true;
	comma.style.backgroundColor = 'rgb(26, 25, 25)';
	comma.disabled = true;
	deleteBtn.style.backgroundColor = 'rgb(26, 25, 25)';
	deleteBtn.disabled = true;
	MC.disabled = true;
	MR.disabled = true;
	MS.disabled = true;
	M.disabled = true;
	MPlus.disabled = true;
	MMinus.disabled = true;
	MC.style.color = 'rgb(95, 95, 95)';
	MR.style.color = 'rgb(95, 95, 95)';
	MS.style.color = 'rgb(95, 95, 95)';
	M.style.color = 'rgb(95, 95, 95)';
	MPlus.style.color = 'rgb(95, 95, 95)';
	MMinus.style.color = 'rgb(95, 95, 95)';
}

function enableBtns() {
	outputParagraph.style.fontSize = '4rem';
	percentBtn.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	percentBtn.disabled = false;
	divide1xBtn.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	divide1xBtn.disabled = false;
	pow.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	pow.disabled = false;
	sqrt.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	sqrt.disabled = false;
	divide.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	divide.disabled = false;
	multiplication.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	multiplication.disabled = false;
	minus.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	minus.disabled = false;
	plus.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	plus.disabled = false;
	plusMinus.style.backgroundColor = 'rgba(59, 59, 59, 255)';
	plusMinus.disabled = false;
	comma.style.backgroundColor = 'rgba(59, 59, 59, 255)';
	comma.disabled = false;
	deleteBtn.style.backgroundColor = 'rgba(50, 50, 50, 255)';
	deleteBtn.disabled = false;
	MS.disabled = false;
	MPlus.disabled = false;
	MMinus.disabled = false;
	MS.style.color = 'rgb(255, 255, 255)';
	MPlus.style.color = 'rgb(255, 255, 255)';
	MMinus.style.color = 'rgb(255, 255, 255)';

	if (memoryArray.length > 0) {
		MC.disabled = false;
		MC.style.color = 'rgb(255, 255, 255)';
		MR.disabled = false;
		MR.style.color = 'rgb(255, 255, 255)';
		M.disabled = false;
		M.style.color = 'rgb(255, 255, 255)';
	}
}

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
		enableBtns();
		firstValue = containsComma(firstValue);
		secondValue = containsComma(secondValue);
		fetch(
			`php/divide.php?value1Divide=${firstValue}&value2Divide=${secondValue}`
		).then(async (result) => {
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
			historyArray.push(
				`${firstValue} ÷ ${secondValue} = ${outputParagraph.innerHTML}`
			);
			if (outputParagraph.innerHTML == 'Error') {
				inputParagraph.innerHTML = '';
				outputParagraph.innerHTML = '0';
			} else if (outputParagraph.innerHTML == 'Nie można dzielić przez 0') {
				inputParagraph.textContent =
					`${firstValue} ÷ ${secondValue} =`.replaceAll('.', ',');
				disableBtns();
			} else {
				inputParagraph.textContent =
					`${firstValue} ÷ ${secondValue} =`.replaceAll('.', ',');
				memoryAdd[0] = outputParagraph.textContent;
			}
			isTrueOutput = true;
			isTrueInput = true;
			ceBtn.addEventListener('click', ce);
			comma.addEventListener('click', commaAfterOperation);
			firstValue = undefined;
			secondValue = undefined;
		});
	});
	ceBtn.removeEventListener('click', ce);
	comma.removeEventListener('click', commaAfterOperation);
});

sqrt.addEventListener('click', () => {
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	let sqrtValue = firstValue;
	inputParagraph.textContent = `√(${firstValue})`;
	firstValue = containsComma(firstValue);
	fetch(`php/sqrt.php?value1Sqrt=${firstValue}`).then(async (result) => {
		outputParagraph.innerHTML = (await result.text()).replace('.', ',');
		historyArray.push(`√(${sqrtValue}) = ${outputParagraph.innerHTML}`);
	});
	isTrueOutput = true;
	firstValue = undefined;
	secondValue = undefined;
});

pow.addEventListener('click', () => {
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	let powValue = firstValue;
	inputParagraph.textContent = `sqr(${firstValue})`;
	firstValue = containsComma(firstValue);
	fetch(`php/pow.php?value1Pow=${firstValue}`).then(async (result) => {
		outputParagraph.innerHTML = (await result.text()).replace('.', ',');
		historyArray.push(`sqr(${powValue}) = ${outputParagraph.innerHTML}`);
	});
	isTrueOutput = true;
	firstValue = undefined;
	secondValue = undefined;
});

divide1xBtn.addEventListener('click', () => {
	isTrueInput = false;
	firstValue = 1;
	secondValue = outputParagraph.textContent;
	let divide1xValue = secondValue;
	inputParagraph.textContent = `1/(${secondValue})`;
	secondValue = containsComma(secondValue);
	fetch(
		`php/divide1x.php?value1Divide1x=${firstValue}&value2Divide1x=${secondValue}`
	).then(async (result) => {
		outputParagraph.innerHTML = (await result.text()).replace('.', ',');
		historyArray.push(`1/(${divide1xValue}) = ${outputParagraph.innerHTML}`);
		if (outputParagraph.innerHTML == 'Error') {
			inputParagraph.innerHTML = '';
			outputParagraph.innerHTML = '0';
		} else if (outputParagraph.innerHTML == 'Nie można dzielić przez 0') {
			disableBtns();
		}
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
	M.disabled = false;
	MC.style.color = 'white';
	MR.style.color = 'white';
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
	M.disabled = false;
	MC.style.color = 'white';
	MR.style.color = 'white';
	M.style.color = 'white';
	isTrueOutput = true;
});

MC.addEventListener('click', () => {
	memoryArray = [];
	MC.disabled = true;
	MR.disabled = true;
	M.disabled = true;
	MC.style.color = 'rgb(95, 95, 95)';
	MR.style.color = 'rgb(95, 95, 95)';
	M.style.color = 'rgb(95, 95, 95)';
	isTrueOutput = true;
});

MR.addEventListener('click', () => {
	outputParagraph.textContent = memoryArray[memoryArray.length - 1];
	isTrueOutput = true;
});

MS.addEventListener('click', () => {
	memoryArray.push(parseFloat(outputParagraph.textContent));
	MC.disabled = false;
	MR.disabled = false;
	M.disabled = false;
	MC.style.color = 'white';
	MR.style.color = 'white';
	M.style.color = 'white';
	isTrueOutput = true;
});

M.addEventListener('click', () => {
	historyDisplay.innerHTML = '';

	historyDisplay.classList.toggle('visible');

	for (let i = memoryArray.length - 1; i >= 0; i--) {
		historyDisplay.appendChild(createMemoryList(memoryArray[i]));
	}
});

historyBtn.addEventListener('click', () => {
	historyDiv.innerHTML = '';
	historyDiv.classList.toggle('visible');

	for (let i = historyArray.length - 1; i >= 0; i--) {
		historyDiv.appendChild(createMemoryList(historyArray[i]));
	}
});

function createMemoryList(number) {
	let li = document.createElement('li');
	li.textContent = number;
	return li;
}
plusMinus.addEventListener('click', () => {
	let minusValue = outputParagraph.textContent;

	if (
		(firstValue != undefined && secondValue != undefined) ||
		inputParagraph.textContent == ''
	) {
		minusValue = parseFloat(outputParagraph.textContent.replace(',', '.')) * -1;
		outputParagraph.textContent = minusValue.toString().replace('.', ',');
	} else {
		inputParagraph.textContent = `negate(${minusValue})`;
		minusValue = parseFloat(outputParagraph.textContent.replace(',', '.')) * -1;
		outputParagraph.textContent = minusValue.toString().replace('.', ',');
	}
});

sum.addEventListener('click', () => {
	enableBtns();
	isTrueInput = false;
	firstValue = outputParagraph.textContent;
	inputParagraph.textContent = `${firstValue} =`;
	outputParagraph.textContent = `${firstValue}`;
	historyArray.push(`${firstValue} = ${firstValue}`);
	isTrueOutput = true;
	firstValue = undefined;
});
