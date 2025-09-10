import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const today = dayjs();
console.log(today)


const dateDisplay = document.querySelector('.date-display');

const date = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const dateFormat = date.toLocaleDateString('en-US', options);
// Output: "Sunday, May 18, 2025"


dateDisplay.textContent = dateFormat




