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
let isTrue = true;

function clearOutput(x) {
	if (isTrue) {
		outputParagraph.textContent = '';
		inputParagraph.textContent = '';
		isTrue = false;
	}
	outputParagraph.textContent += x;
}

function containsComma(x) {
	let y;
	if (x.includes(',')) {
		y = x.replace(',', '.');
	} else {
		y = x;
	}
}

ceBtn.addEventListener('click', () => {
	outputParagraph.textContent = '';
});

cBtn.addEventListener('click', () => {
	inputParagraph.textContent = '';
	outputParagraph.textContent = '';
});

deleteBtn.addEventListener('click', () => {
	outputParagraph.textContent = outputParagraph.textContent.slice(0, -1);
});

plus.addEventListener('click', () => {
	const value1 = outputParagraph.textContent;
	inputParagraph.textContent = `${value1} +`;
	outputParagraph.textContent = ``;

	sum.addEventListener('click', () => {
		const value2 = outputParagraph.textContent;
		fetch(`php/plus.php?value1=${value1}&value2=${value2}`).then(
			async (result) => {
				document.querySelector('.calculator__content-output-p').innerHTML =
					await result.text();
			}
		);
		inputParagraph.textContent = `${value1} + ${value2} =`;
		isTrue = true;
	});
});

minus.addEventListener('click', () => {
	const value1 = outputParagraph.textContent;
	inputParagraph.textContent = `${value1} -`;
	outputParagraph.textContent = ``;

	sum.addEventListener('click', () => {
		const value2 = outputParagraph.textContent;
		fetch(`php/minus.php?value1=${value1}&value2=${value2}`).then(
			async (result) => {
				document.querySelector('.calculator__content-output-p').innerHTML =
					await result.text();
			}
		);
		inputParagraph.textContent = `${value1} - ${value2} =`;
		isTrue = true;
	});
});

comma.addEventListener('click', () => {
	outputParagraph.textContent += '.';
});
