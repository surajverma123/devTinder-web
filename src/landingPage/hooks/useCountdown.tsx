import { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../utils/date';

export const useCountdown = (targetDate: string) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(remaining);
      
      // Check if countdown has expired
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      if (now >= target) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return { ...timeRemaining, isExpired };
};

export default useCountdown;