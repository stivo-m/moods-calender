//initializing dom elements
const calendar = document.getElementById('calender');
const moods = document.querySelectorAll('.mood');
const randomize = document.querySelector('.random');
const clear = document.querySelector('.clear');
//other variables
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octomber',
    'November',
    'December'
];

const weekDays = ['Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

const currentYear = 2020;

const defaultColor = '#888';
let activeColor = '';

const colors = [
    'rgb(9, 168, 9)',
    '#039BE5',
    '#00897B',
    '#D81B60',
    '#E53935'
];


//getCurrently selected mood item
moods.forEach(
    mood => {
        mood.addEventListener('click', () => {
            if (mood.classList.contains('selected')) {
                //if a mood has been selected, remove selected class
                mood.classList.remove('selected');
                activeColor = defaultColor;
            } else {
                moods.forEach(newMood => {
                    newMood.classList.remove('selected');
                });

                //add selected class to the mood that was selected
                mood.classList.add('selected');
                activeColor = getComputedStyle(mood).getPropertyValue('color');

            }
        }
        );
    }
);


//get all the days within an year
//the year should start from jan date one
//the year should end at december thirty one
const getAllDays = year => {
    // First day of the year - 1st January
    const firstDay = new Date(`January 1 ${year}`);
    // Last day of the year - 31th December - used to stop adding days to the array
    const lastDay = new Date(`December 31 ${year}`);

    // Add first day
    const days = [firstDay];

    // Used to keep track of the day
    let lastDayInArray = firstDay;

    // Loop while there are new days to be added in the current year
    while (lastDayInArray.getTime() !== lastDay.getTime()) {
        days.push(addDays(lastDayInArray, 1));
        lastDayInArray = days[days.length - 1];
    }

    return days;
};




const dates = getAllDays(currentYear);

let monthsHTML = '';

// Loop over the months and create a div for each month
months.forEach((month, idx) => {
    monthsHTML += `
        <div class="months_container"> 
            <div class="months month_${idx}">
                <h3>${month}</h3>
                <div class="week_days_container">
                    ${weekDays
            .map(day => `<div class="week_days">${day}</div>`)
            .join('')}
                </div>
                <div class="days_container"></div>
            </div>
        </div>
    `;
});

calendar.innerHTML = monthsHTML;

// Loop over each day and
dates.forEach(date => {
    const month = date.getMonth();
    const monthEl = document.querySelector(`.month_${month} .days_container`);

    // create extra day slots if needed before day 1
    if (date.getDate() === 1 && date.getDay() !== 0) {
        for (let i = 0; i < date.getDay(); i++) {
            const emptySpot = createEmptySpot();

            monthEl.appendChild(emptySpot);
        }
    }

    const dateEl = createDateEl(date);

    monthEl.appendChild(dateEl);
});


const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    circle.addEventListener('click', () => {
        circle.style.backgroundColor = activeColor;
    });
});

// Randomize functionality
randomize.addEventListener('click', () => {
    circles.forEach(circle => {
        circle.style.backgroundColor = getRandomColor();
    });
});

// Clear functionality
clear.addEventListener('click', () => {
    circles.forEach(circle => {
        circle.style.backgroundColor = defaultColor;
    });
});

function getRandomColor() {
    return colors[Math.floor(Math.random() * 5)];
}

function createDateEl(date) {
    const day = date.getDate();
    const dateEl = document.createElement('div');
    dateEl.classList.add('days');
    dateEl.innerHTML = `<span class="circle">${day}</span>`;

    return dateEl;
}

function createEmptySpot() {
    const emptyEl = document.createElement('div');
    emptyEl.classList.add('days');

    return emptyEl;
}

// function from StackOverflow: https://stackoverflow.com/questions/563406/add-days-to-javascript-date
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}



