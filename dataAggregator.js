const configuration = {
  retryCount: 3,
  retryDelay: 1000,
  retry: true,
};

const apis = [
  "https://restcountries.com/v3.1/all",
  "https://api.example.com/data",
  "https://api.example.com/more-data",
];

const fetchData = (url, { retryCount, retryDelay, retry }) => {
  return new Promise((resolve, reject) => {
    url.forEach((api) => {
      fetch(api).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
    });
  });
};
