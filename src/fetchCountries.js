const countries = 'https://restcountries.com/v3.1';
export function fetchCountries(name) {
  return fetch(
    `${countries}/name/${name}?fields=name,capital,population,flags,languages/`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
