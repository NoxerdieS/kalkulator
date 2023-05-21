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
let memory = 0;
let memoryMS = 0;

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
}

function isZero(x) {
	if (x == '0') {
		isTrueOutput = true;
	} else {
		isTrueOutput = false;
	}
}

function percent(x) {
	percentBtn.addEventListener('click', () => {
		return (x = x / 100);
	});
}

function blockDelete() {
	outputParagraph.textContent += '';
}

function containsComma(x) {
	return x.replace(',', '.');
}

function ce() {
	inputParagraph.textContent = '';
	outputParagraph.textContent = '0';
	isTrueOutput = true;
}

ceBtn.addEventListener('click', () => {
	outputParagraph.textContent = '0';
	isTrueOutput = true;
});

cBtn.addEventListener('click', () => {
	inputParagraph.textContent = '';
	outputParagraph.textContent = '0';
	isTrueOutput = true;
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
}

let value1Plus;
let value2Plus;
plus.addEventListener('click', () => {
	sum.removeEventListener('click', () => {});
	isTrueInput = false;
	value1Plus = outputParagraph.textContent;
	percent(value1Plus);
	inputParagraph.textContent = `${value1Plus} +`;
	value1Plus = containsComma(value1Plus);
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	resetSumButton()
	sum.addEventListener('click', () => {
		value2Plus = outputParagraph.textContent;
		inputParagraph.textContent = `${value1Plus} + ${value2Plus} =`;
		value2Plus = containsComma(value2Plus);

		fetch(
			`php/plus.php?value1Plus=${value1Plus}&value2Plus=${value2Plus}`
		).then(async (result) => {
			// document.querySelector('.calculator__content-output-p').innerHTML = (
			// 	await result.text()
			// ).replace('.', ',');
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
		});
		isTrueOutput = true;
		isTrueInput = true;
		ceBtn.addEventListener('click', ce);
	});
});

let value1Minus;
let value2Minus;
minus.addEventListener('click', () => {
	isTrueInput = false;
	value1Minus = outputParagraph.textContent;
	inputParagraph.textContent = `${value1Minus} -`;
	value1Minus = containsComma(value1Minus);
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);
	resetSumButton()
	sum.addEventListener('click', () => {
		value2Minus = outputParagraph.textContent;
		value2Minus = containsComma(value2Minus);
		fetch(
			`php/minus.php?value1Minus=${value1Minus}&value2Minus=${value2Minus}`
		).then(async (result) => {
			// document.querySelector('.calculator__content-output-p').innerHTML = (
			// 	await result.text()
			// ).replace('.', ',');
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
		});
		inputParagraph.textContent = `${value1Minus} - ${value2Minus} =`;
		isTrueOutput = true;
		isTrueInput = true;
		ceBtn.addEventListener('click', ce);
	});
});

multiplication.addEventListener('click', () => {
	let value1Multiplication;
	let value2Multiplication;
	isTrueInput = false;
	value1Multiplication = outputParagraph.textContent;
	inputParagraph.textContent = `${value1Multiplication} x`;
	value1Multiplication = containsComma(value1Multiplication);
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	resetSumButton()
	sum.addEventListener('click', () => {
		value2Multiplication = outputParagraph.textContent;
		value2Multiplication = containsComma(value2Multiplication);
		fetch(
			`php/multiplication.php?value1Multiplication=${value1Multiplication}&value2Multiplication=${value2Multiplication}`
		).then(async (result) => {
			// document.querySelector('.calculator__content-output-p').innerHTML = (
			// 	await result.text()
			// ).replace('.', ',');
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
		});
		inputParagraph.textContent = `${value1Multiplication} x ${value2Multiplication} =`;
		isTrueOutput = true;
		isTrueInput = true;
		ceBtn.addEventListener('click', ce);
	});
});

divide.addEventListener('click', () => {
	let value1Divide;
	let value2Divide;
	isTrueInput = false;
	value1Divide = outputParagraph.textContent;
	inputParagraph.textContent = `${value1Divide} ÷`;
	value1Divide = containsComma(value1Divide);
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	resetSumButton()
	sum.addEventListener('click', () => {
		value2Divide = outputParagraph.textContent;
		value2Divide = containsComma(value2Divide);
		fetch(
			`php/divide.php?value1Divide=${value1Divide}&value2Divide=${value2Divide}`
		).then(async (result) => {
			// document.querySelector('.calculator__content-output-p').innerHTML = (
			// 	await result.text()
			// ).replace('.', ',');
			outputParagraph.innerHTML = (await result.text()).replace('.', ',');
		});
		inputParagraph.textContent = `${value1Divide} ÷ ${value2Divide} =`;
		isTrueOutput = true;
		isTrueInput = true;
		ceBtn.addEventListener('click', ce);
	});
});

sqrt.addEventListener('click', () => {
	let value1Sqrt;
	isTrueInput = false;
	value1Sqrt = outputParagraph.textContent;
	inputParagraph.textContent = `√(${value1Sqrt})`;
	value1Sqrt = containsComma(value1Sqrt);
	fetch(`php/sqrt.php?value1Sqrt=${value1Sqrt}`).then(async (result) => {
		document.querySelector('.calculator__content-output-p').innerHTML = (
			await result.text()
		).replace('.', ',');
	});
	isTrueOutput = true;
});

pow.addEventListener('click', () => {
	let value1Pow;
	isTrueInput = false;
	value1Pow = outputParagraph.textContent;
	inputParagraph.textContent = `sqr(${value1Pow})`;
	value1Pow = containsComma(value1Pow);
	fetch(`php/pow.php?value1Pow=${value1Pow}`).then(async (result) => {
		document.querySelector('.calculator__content-output-p').innerHTML = (
			await result.text()
		).replace('.', ',');
	});
	isTrueOutput = true;
});

divide1xBtn.addEventListener('click', () => {
	let value1Divide1x;
	let value2Divide1x;
	isTrueInput = false;
	value1Divide1x = 1;
	inputParagraph.textContent = `1/(${outputParagraph.textContent})`;
	value2Divide1x = outputParagraph.textContent;
	fetch(
		`php/divide1x.php?value1Divide1x=${value1Divide1x}&value2Divide1x=${value2Divide1x}`
	).then(async (result) => {
		document.querySelector('.calculator__content-output-p').innerHTML = (
			await result.text()
		).replace('.', ',');
	});
	isTrueOutput = true;
});

MPlus.addEventListener('click', () => {
	memory += parseFloat(outputParagraph.textContent);
	MC.disabled = false;
	MR.disabled = false;
	MS.disabled = false;
	M.disabled = false;
	MC.style.color = 'white';
	MR.style.color = 'white';
	MS.style.color = 'white';
	M.style.color = 'white';
});

MMinus.addEventListener('click', () => {
	memory -= parseFloat(outputParagraph.textContent);
	MC.disabled = false;
	MR.disabled = false;
	MS.disabled = false;
	M.disabled = false;
	MC.style.color = 'white';
	MR.style.color = 'white';
	MS.style.color = 'white';
	M.style.color = 'white';
});

MC.addEventListener('click', () => {
	memory = 0;
	MC.disabled = true;
	MR.disabled = true;
	MS.disabled = true;
	M.disabled = true;
	MC.style.color = 'rgb(95, 95, 95)';
	MR.style.color = 'rgb(95, 95, 95)';
	MS.style.color = 'rgb(95, 95, 95)';
	M.style.color = 'rgb(95, 95, 95)';
});

MR.addEventListener('click', () => {
	outputParagraph.textContent = memory;
});

MS.addEventListener('click', () => {
	memoryMS = parseFloat(outputParagraph.textContent);
});

M.addEventListener('click', () => {
	historyDisplay.classList.toggle('visible');
	// historyDisplay.style.opacity = '1';
	// historyDisplay.style.transition = 'all 0.5s ease-in-out';
});

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
