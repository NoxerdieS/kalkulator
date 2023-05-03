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
const ceBtn = document.getElementById('CE'); // const CE
const cBtn = document.getElementById('C'); // const C
const deleteBtn = document.getElementById('delete'); // const delete
const divide1xBtn = document.getElementById('divide1x'); // const divide1x

numb7.addEventListener('click', () => {
	outputParagraph.textContent += '7';
});
numb8.addEventListener('click', () => {
	outputParagraph.textContent += '8';
});
numb9.addEventListener('click', () => {
	outputParagraph.textContent += '9';
});
numb4.addEventListener('click', () => {
	outputParagraph.textContent += '4';
});
numb5.addEventListener('click', () => {
	outputParagraph.textContent += '5';
});
numb6.addEventListener('click', () => {
	outputParagraph.textContent += '6';
});
numb1.addEventListener('click', () => {
	outputParagraph.textContent += '1';
});
numb2.addEventListener('click', () => {
	outputParagraph.textContent += '2';
});
numb3.addEventListener('click', () => {
	outputParagraph.textContent += '3';
});

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

divide1xBtn.addEventListener('click', () => {
	outputParagraph.textContent = 1 / outputParagraph.textContent;
});
