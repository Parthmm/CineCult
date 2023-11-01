import logo from './logo.svg';
import './App.css';

function App() {

  const getMovies = () => {
    // Make an API call to your Flask server using fetch
    fetch('http://localhost:3000/get_movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response here
        console.log('API Response:', data);
      })
      .catch((error) => {
        // Handle API call errors here
        console.error('API Error:', error);
      });
  };

  return (
    <div className="App">
      <button onClick={getMovies}></button>
    </div>
  );
}

export default App;
