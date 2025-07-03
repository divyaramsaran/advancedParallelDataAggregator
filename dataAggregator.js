const configuration = {
  retryCount: 3,
  retryDelay: 1000,
  retry: true,
};

const apis = [
  "https://restcountries.com/v3.1/all",
  "https://api.example.com/data",
];

const fetchData = (url, { retryCount, retryDelay, retry }) => {
  return new Promise((resolve, reject) => {
    url.forEach((api) => {
      fetch(api)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (retry && retryCount > 0) {
            console.warn(
              `Fetch failed for ${api}, retrying... (${retryCount} retries left)`
            );
            setTimeout(() => {
              fetchData([api], {
                retryCount: retryCount - 1,
                retryDelay,
                retry,
              })
                .then(resolve)
                .catch(reject);
            }, retryDelay);
          } else {
            reject(`Failed to fetch data from ${api}: ${error.message}`);
          }
        });
    });
  });
};
fetchData(apis, configuration)
  .then((data) => {
    console.log("Data fetched successfully:", data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
