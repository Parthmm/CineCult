import logo from './logo.svg';
import './App.css';

function App() {

  const getMovies = () => {
    fetch("config.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch config.json');
        }
        return response.json();
      })
      .then(config => {
        const PORT = config.PORT;
        return fetch("http://localhost:" + PORT + "/get_movies");
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
};

return (
  <div className="App">
    <button onClick={getMovies}>Get Movies</button>
  </div>
);
}

export default App;
