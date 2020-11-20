console.log('Client side javascript is loaded');

// Select html element
const weatherForm = document.querySelector('form');
const search = weatherForm.firstElementChild;
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const joke1 = document.getElementById('joke1');
const joke2 = document.getElementById('joke2');
const cat0 = document.getElementById('cat0');
const cat1 = document.getElementById('cat1');

/* URL location
* * For uploading to heroku, remove http://localhost:3000 from /weather....
* * For development, add http://localhost:<port> before /weather....
*/
const weatherUrl = `http://localhost:3000/weather?address=${search.value}`;

weatherForm.addEventListener('submit', (e) => {
    // initial loading
    e.preventDefault();
    message1.textContent = '-----Now loading-----';

    // get the weather
    fetch(weatherUrl)
    .then ( res => return res.json() )
    .then ( data => {
        if (data.error) {
            return {
                message1.textContent = data.error;
                joke1.textContent = 'Sorry, joke is not available for the moment';
                cat1.textContent = 'Sorry, the cat is not in its place. Please come again later';
            }; 
        };
        message1.textContent = data.location;
        message2.textContent = data.weather;

        joke1.textContent = data.line1;
        joke2.textContent = data.line2;

        cat1.textContent = 'The cat will come in a moment';
        const src = data.catImageUrl;
        const pict = document.createElement("IMG");
        pict.setAttribute("src", src);
        pict.setAttribute("width", "304");
        pict.setAttribute("height", "228");
        pict.setAttribute("alt", "a cat");
        cat0.appendChild(pict);
    });
    
} );