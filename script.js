// API URL: Studio Ghibli API (no API key required)
const API_URL = 'https://ghibliapi.vercel.app/films';

let films = [];

// Fetch films data from the API
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    films = data;
  })
  .catch(error => console.error('Error:', error));

// Function to search films based on the input query
function searchFilms(query) {
  return films.filter(film => film.title.toLowerCase().includes(query.toLowerCase()));
}

// Function to display the search results on the page
function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(film => {
    const filmDiv = document.createElement('div');
    filmDiv.classList.add('film');
    filmDiv.innerHTML = `
      <h3>${film.title}</h3>
      <p>${film.description.substring(0, 150)}...</p>
    `;
    resultsDiv.appendChild(filmDiv);
  });
}

// Add event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  const results = searchFilms(query);
  displayResults(results);
});

// Allow search on pressing the Enter key
document.getElementById('searchInput').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('searchButton').click();
  }
});
