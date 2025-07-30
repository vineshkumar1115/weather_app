const apiKey = 'c4fac34e59cc62db47c62352fd12c922'; // ✅ Your API key

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();

  if (city === '') {
    alert('Please enter a city name!');
    return;
  }

  getWeather(city);
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found!');
      }
      return response.json();
    })
    .then(data => {
      showWeather(data);
    })
    .catch(error => {
      alert(error.message);
    });
}

function showWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.querySelector('.icon').innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
  document.querySelector('.weather').textContent = data.weather[0].main;
  document.querySelector('.temperature').textContent = `${data.main.temp}°C`;
  document.querySelector('.description').textContent = data.weather[0].description;
}
