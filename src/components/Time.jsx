import React, { useState, useEffect } from 'react';

function Time() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Оновлювати час і дату кожну секунду

    return () => {
      clearInterval(intervalId); // Очистити інтервал при виході з компонента
    };
  }, []);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDateTime = currentDateTime.toLocaleDateString(
    undefined,
    options
  );

  return (
    <div>
      <p>{formattedDateTime}</p>
    </div>
  );
}

export default Time;
