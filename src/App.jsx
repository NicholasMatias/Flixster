import './App.css';
import MovieList from './MovieList';
import ToTop from './ToTop';
const App = () => {



  return (
    <div className="App">
      <header className='App-header'>
        <h1 className='site-title'>Flixster</h1>
      </header>
      <main>
        <MovieList />
      </main>
      <footer className='App-footer'>
        <ToTop/>
      </footer>
    </div>
  );
}

export default App
