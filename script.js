const images = [
    "https://picsum.photos/id/1015/800/500", 
    "https://picsum.photos/id/1016/800/500", 
    "https://picsum.photos/id/1018/800/500"
];
let currentIndex = 0;

function showImage() { 
    document.getElementById("slider").src = images[currentIndex]; 
}

function nextImage() { 
    currentIndex = (currentIndex + 1) % images.length; 
    showImage(); 
}

function prevImage() { 
    currentIndex = (currentIndex - 1 + images.length) % images.length; 
    showImage(); 
}


document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('citySelectTrigger');
    const optionsList = document.getElementById('cityOptionsList');
    const nativeSelect = document.getElementById('city');

   
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsList.classList.toggle('show');
    });

    
    Array.from(nativeSelect.options).forEach(opt => {
        const div = document.createElement('div');
        div.textContent = opt.textContent;
        div.className = 'option-item';
        div.onclick = () => {
            nativeSelect.value = opt.value;
            trigger.querySelector('span').textContent = opt.textContent;
            optionsList.classList.remove('show');
        };
        optionsList.appendChild(div);
    });

    
    document.addEventListener('click', () => {
        optionsList.classList.remove('show');
    });
});

// Weather API Logic
function getWeather(){
    const city = document.getElementById("city").value;
    const apiKey = "4c5608abe4e87c7ccaf72509235f7a97";
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        if(data.cod === 200) {
            document.getElementById("weather").innerHTML = `
                <h3>${data.name}</h3>
                <p>Temperature: <strong>${data.main.temp}°C</strong></p>
                
                <p>🤗 Feels Like: ${data.main.feels_like} °C</p>
                <p>☁ Weather: ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            document.getElementById("weather").innerHTML = "Data not found.";
        }
    })
    .catch(() => {
        document.getElementById("weather").innerHTML = "Error fetching data.";
    });
}
