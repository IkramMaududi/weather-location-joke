console.log('Client side javascript is loaded');

// Select html element
const weatherForm = document.querySelector('form');
const search = weatherForm.firstElementChild;
const lokasi = document.getElementById('location');
const weather = document.getElementById('weather');
const joke1 = document.getElementById('joke1');
const joke2 = document.getElementById('joke2');
const cat0 = document.getElementById('cat0');
const cat1 = document.getElementById('cat1');

/* URL location
* * For uploading to heroku, remove http://localhost:3000 from fetch()
* * For development, add http://localhost:<port> from fetch()
*/

weatherForm.addEventListener('submit', (e) => {
    // initial loading
    e.preventDefault();
    lokasi.textContent = '-----Now loading-----';
    
    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    // get the location, weather, joke, and cat in order
    fetch(`http://localhost:3000/weather?address=${search.value}`)
    .then(handleErrors)
    .then ( res => res.json() 
        .then ( data => {
            if (data.error1) { 
                 lokasi.textContent = data.error1;
            } else if (data.error2) {
                lokasi.textContent = data.location;
                weather.textContent = data.error2;
            } else if (data.error3) {
                lokasi.textContent = data.location;
                weather.textContent = data.weather;
                joke1.textContent = data.error3;
            } else if (data.error4) {
                lokasi.textContent = data.location;
                weather.textContent = data.weather;
                joke1.textContent = data.line1;
                joke2.textContent = data.line2; 
                cat1.textContent = data.error4;
            } else {
                lokasi.textContent = data.location;
                weather.textContent = data.weather;
                joke1.textContent = data.line1;
                joke2.textContent = data.line2; 
                //get the cat
                const src = data.catImageUrl;
                const pict = document.createElement("IMG");
                pict.setAttribute("src", src);
                pict.setAttribute("width", "304");
                pict.setAttribute("height", "228");
                pict.setAttribute("alt", "a cat");
                cat0.appendChild(pict);
            };
        })
    )
    .catch(err => lokasi.textContent = err);
} );