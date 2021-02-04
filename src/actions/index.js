export const getCountryList = () => ({
  type: 'GET_COUNTRY_LIST',
});

export const fetchTime = (country) => ({
  type: 'FETCH_TIME',
  param : country
});

