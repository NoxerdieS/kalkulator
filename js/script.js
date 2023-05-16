const inputParagraph = document.getElementById('calculator__content-input-p');
const outputParagraph = document.getElementById('calculator__content-output-p');
const numb7 = document.getElementById('7');
const numb8 = document.getElementById('8');
const numb9 = document.getElementById('9');
const numb4 = document.getElementById('4');
const numb5 = document.getElementById('5');
const numb6 = document.getElementById('6');
const numb1 = document.getElementById('1');
const numb2 = document.getElementById('2');
const numb3 = document.getElementById('3');
const ceBtn = document.getElementById('CE');
const cBtn = document.getElementById('C');
const deleteBtn = document.getElementById('delete');
const divide1xBtn = document.getElementById('divide1x');
const superScript = document.getElementById('superScript');
const sqrt = document.getElementById('sqrt');
const divide = document.getElementById('divide');
const multiplication = document.getElementById('multiplication');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const plusMinus = document.getElementById('plusMinus');
const comma = document.getElementById('comma');
const sum = document.getElementById('sum');
let isTrueOutput = true;
let isTrueInput = false;

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

function blockDelete() {
	outputParagraph.textContent += '';
}

// function containsComma(x) {
//   if (x.includes(",")) {
//     y = x.replace(",", ".");
//   } else {
//     y = x;
//   }
// }

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
	plus.removeEventListener('click', plus);
	isTrueOutput = true;
});

deleteBtn.addEventListener('click', () => {
	if (!isTrueOutput) {
		console.log(isTrueOutput);
		outputParagraph.textContent = outputParagraph.textContent.slice(0, -1);
	}
});

plus.addEventListener('click', () => {
	let value1Plus;
	let value2Plus;
	isTrueInput = false;
	value1Plus = outputParagraph.textContent;
	inputParagraph.textContent = `${value1Plus} +`;
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	sum.addEventListener('click', () => {
		value2Plus = outputParagraph.textContent;
		console.log(isTrueOutput);
		if (!isTrueOutput) {
			fetch(`php/plus.php?value1=${value1Plus}&value2=${value2Plus}`).then(
				async (result) => {
					document.querySelector('.calculator__content-output-p').innerHTML =
						await result.text();
				}
			);
			inputParagraph.textContent = `${value1Plus} + ${value2Plus} =`;
			isTrueOutput = true;
			isTrueInput = true;
			ceBtn.addEventListener('click', ce);
		} else {
			console.log('chuj');
			// inputParagraph.textContent = '';
			isTrueInput = true;
			value1Plus = null;
			value2Plus = null;
		}
	});
});

minus.addEventListener('click', () => {
	let value1Minus;
	let value2Minus;
	isTrueInput = false;
	value1Minus = outputParagraph.textContent;
	inputParagraph.textContent = `${value1Minus} -`;
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	sum.addEventListener('click', () => {
		value2Minus = outputParagraph.textContent;
		fetch(`php/minus.php?value1=${value1Minus}&value2=${value2Minus}`).then(
			async (result) => {
				document.querySelector('.calculator__content-output-p').innerHTML =
					await result.text();
			}
		);
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
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);

	sum.addEventListener('click', () => {
		value2Multiplication = outputParagraph.textContent;
		fetch(
			`php/multiplication.php?value1=${value1Multiplication}&value2=${value2Multiplication}`
		).then(async (result) => {
			document.querySelector('.calculator__content-output-p').innerHTML =
				await result.text();
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
	outputParagraph.textContent = `0`;
	isZero(outputParagraph.textContent);
	sum.addEventListener('click', () => {
		value2Divide = outputParagraph.textContent;
		fetch(`php/divide.php?value1=${value1Divide}&value2=${value2Divide}`).then(
			async (result) => {
				document.querySelector('.calculator__content-output-p').innerHTML =
					await result.text();
			}
		);
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
	fetch(`php/sqrt.php?value1=${value1Sqrt}`).then(async (result) => {
		document.querySelector('.calculator__content-output-p').innerHTML =
			await result.text();
	});
	isTrueOutput = true;
});

comma.addEventListener('click', () => {
	if (outputParagraph.textContent == '') {
		outputParagraph.textContent = '0.';
	} else if (outputParagraph.textContent.includes('.')) {
		outputParagraph.textContent += '';
	} else {
		outputParagraph.textContent += '.';
	}
});

sum.addEventListener('click', () => {
	let value1Sum;
	isTrueInput = false;
	value1Sum = outputParagraph.textContent;
	inputParagraph.textContent = `${value1Sum} =`;
	outputParagraph.textContent = `${value1Sum}`;
	isTrueOutput = true;
});
