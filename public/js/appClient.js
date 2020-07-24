const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.getElementById('one');
const msgTwo = document.getElementById('two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = `/weather?address=${location}`;

    msgOne.textContent = 'Loading Forecast...';
    msgTwo.textContent = '';

    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                msgOne.textContent = data.error;
            } else {
                msgOne.textContent = data.Location;
                msgTwo.textContent = data.Forecast;
            }
        })
    })
})