import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import MoviesList from './components/moviesList/MoviesList';
import MoviePage from './components/MoviePage/MoviePage';
import Missing from './pages/missing/Missing';


function App() {

  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="/movies/:type" element={<MoviesList />} />
           <Route path="*" element={<Missing />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
