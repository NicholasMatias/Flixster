import './App.css';
import MovieList from './MovieList';
import ToTop from './ToTop';
// import Sidebar from './Sidebar';
const App = () => {



  return (
    <div className="App">
      <header className='App-header'>
        <h1 className='site-title'>Flixster</h1>
        {/* <Sidebar/> Didn't quite finish the css for this but was close. */}
      </header>
      <main>
        <MovieList /> {/* Component that will display all of the movies.  */}
      </main>
      <footer className='App-footer'>
        <ToTop/> {/* This component allows the user to go back to the top of the screen */}
      </footer>
    </div>
  );
}

export default App
