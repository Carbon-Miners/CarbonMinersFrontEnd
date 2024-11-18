import CryptoJs from "crypto-js";

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


export function calcTime(time: number | string, formatter: boolean = false) {
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

const normalizePassword = (password: string): string => {
  const encoder = new TextEncoder();
  const passwordArray = encoder.encode(password);
  let key = new Uint8Array(16); // 创建一个固定16字节的数组

  // 复制密码到key数组，如果密码长度小于16，剩余部分用0填充
  for (let i = 0; i < passwordArray.length; i++) {
    key[i] = passwordArray[i];
  }

  // 如果密码数组长度小于16，填充剩余部分
  if (passwordArray.length < 16) {
    const filler = new Uint8Array(16 - passwordArray.length).fill(0);
    key.set(filler, passwordArray.length);
  }

  // 将Uint8Array转换为字符串
  return String.fromCharCode.apply(null, key as any);
}

export const encrypt = (word: string, password: string) => {
  const key = CryptoJs.enc.Utf8.parse(normalizePassword(password));
  const srcs = CryptoJs.enc.Utf8.parse(word);
  const encrypted = CryptoJs.AES.encrypt(srcs, key, { mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7 });
  return encrypted.toString();
};

export const decrypt = (word: string, password: string) => {
  const key = CryptoJs.enc.Utf8.parse(normalizePassword(password));
  const decrypt = CryptoJs.AES.decrypt(word, key, { mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7 });
  return CryptoJs.enc.Utf8.stringify(decrypt).toString();
}