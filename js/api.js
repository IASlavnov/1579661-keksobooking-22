const getData = () => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json());
};

const sendData = (body) => {
  return fetch('https://22.javascript.pages.academy/keksobooking',
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
