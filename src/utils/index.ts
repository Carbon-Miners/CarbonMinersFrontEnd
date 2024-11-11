export const SlideUp = (delay: number) => {
  return {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
};
export const SlideLeft = (delay: number) => {
  return {
    initial: {
      x: 50,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
};

export function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}

export function formatHash(hash?: string) {
  if (!hash) return null;
  return `${hash.slice(0, 10)}…${hash.slice(-6)}`;
}


export function calcTime(time: number, formatter: boolean = false) {
  const timeStamp = new Date(time);
  const year = timeStamp.getFullYear();
  const dayOfWeek = timeStamp.getDay();
  const month = timeStamp.getMonth() + 1;
  const day = timeStamp.getDate();
  const hours = timeStamp.getHours();
  const minute = timeStamp.getMinutes();
  const second = timeStamp.getSeconds();

  const monthFormat = month < 10 ? "0" + month : month;
  const dayFormat = day < 10 ? "0" + day : day;
  const hoursFormat = hours < 10 ? "0" + hours : hours;
  const minuteFormat = minute < 10 ? "0" + minute : minute;
  const secondFormat = second < 10 ? "0" + second : second;

  // 返回星期几
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekDay = weekDays[dayOfWeek];

  if (formatter) {
    return `${year}-${monthFormat}-${dayFormat} ${hoursFormat}:${minuteFormat}:${secondFormat}`;
  }

  return `${year}-${monthFormat}-${dayFormat}`;

  // if (formatter) {
  //   // return `${year}-${month}-${day} ${hours}:${minute}:${second}`;
  //   return `${year}-${monthFormat}-${dayFormat}`;
  // } else {
  //   return {
  //     year,
  //     month,
  //     day,
  //     hours,
  //     minute,
  //     second,
  //     weekDay,
  //     time
  //   };
  // }
}