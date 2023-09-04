import { SlSpeedometer } from 'react-icons/sl';
import { WiHumidity, WiWindy, WiSleet } from 'react-icons/wi';
import styles from '../css/weather.module.css';
import { useEffect, useState } from 'react'; // Import useState
import Time from './Time';

function Weather() {
  const apiKey = 'bb18298a3fffeae2e5ece277177ed267';

  const [weatherData, setWeatherData] = useState(null); // Add state for weatherData

  async function logWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=40.4165&lon=-3.7026&units=metric&lang=UA&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      if (data.cod !== '200') {
        throw new Error('API response error');
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  useEffect(() => {
    logWeather();
  }, []);
  // const arr = [
  //   '01d',
  //   '01n',
  //   '02d',
  //   '02n',
  //   '03d',
  //   '03n',
  //   '04d',
  //   '04n',
  //   '09d',
  //   '09n',
  //   '10d',
  //   '10n',
  //   '11d',
  //   '11n',
  //   '13d',
  //   '13n',
  //   '50d',
  //   '50n',
  // ];

  // const styl = `container${arr[4] || ''}`;
  const styl = `container${weatherData?.list[0]?.weather[0]?.icon || ''}`;
  console.log('weatherData:', weatherData); // Add this line
  return (
    <>
      <div className={`${styles.container} ${styles[styl]}`}>
        {weatherData && weatherData.list && weatherData.list[0] && (
          <div className={styles.weather}>
            <>
              <span>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                  alt=''
                />{' '}
                {Math.round(weatherData.list[0].main.temp)}°C
                <br />
                Navalafuente <br />
                {weatherData.list[0].weather[0].description}
              </span>
            </>
          </div>
        )}
        {weatherData && weatherData.list && (
          <div className={styles.hour}>
            <Time />
          </div>
        )}
        {weatherData && weatherData.list && (
          <div className={styles.sensors}>
            <span>
              <WiSleet /> {weatherData.list[0].pop * 100}% <br />
              <SlSpeedometer />
              {Math.round(weatherData.list[0].main.grnd_level)} <br />
              <WiHumidity /> {weatherData.list[0].main.humidity} <br />
              <WiWindy /> {weatherData.list[0].wind.speed} <br />
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default Weather;
