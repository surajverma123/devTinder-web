export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  
  return `${formattedHour}:${minutes} ${period}`;
};

export const calculateDaysRemaining = (targetDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const weddingDate = new Date(targetDate);
  weddingDate.setHours(0, 0, 0, 0);
  
  const differenceInTime = weddingDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
  return differenceInDays > 0 ? differenceInDays : 0;
};

export const calculateTimeRemaining = (targetDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const now = new Date().getTime();
  const weddingDate = new Date(targetDate).getTime();
  
  const distance = weddingDate - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
};