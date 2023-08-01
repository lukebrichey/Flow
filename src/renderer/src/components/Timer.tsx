import { useState, useEffect } from 'react';

export default function Timer(): JSX.Element {
  const startTime = Date.now();

  const [passedTime, setPassedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPassedTime(Math.floor((now - startTime) / 1000));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function formatPassedTime(seconds): string {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    seconds %= 3600;
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    seconds = (seconds % 60).toString().padStart(2, '0');

    return `${hrs}:${mins}:${seconds}`;
  }

  return (
    <div>
      <div>
        <p>Focused Time:</p>
        {formatPassedTime(passedTime)}
      </div>
    </div>
  );
}
