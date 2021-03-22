const URL_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://22.javascript.pages.academy/keksobooking';

const getData = () => {
  return fetch(URL_GET)
    .then((response) => response.json());
};

const sendData = (body) => {
  return fetch(URL_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
};

export { getData, sendData };
