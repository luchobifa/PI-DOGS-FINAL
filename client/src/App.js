import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Nav from './components/Nav'
import LandingPage from './components/LandingPage';
import CreateDog from './components/CreateDog';
// import Favorites from './components/Favorites';
import DogDetail from './components/DogDetail';

function App() {
  return (
    <div>
      <div className="App">
        <Route
          exact path='/'
          render={() => <LandingPage/>}
        />
        <Route
          path='/home'
          render={() => <Nav/>}
        />
        <Route
          exact path = '/home'
          render={() => <Home/> }
        />
        <Route
          exact path = '/home/createDog'
          render={() => <CreateDog/> }
        />
        {/* <Route
          exact path = '/home/favorites'
          render={() => <Favorites/> }
        /> */}
        <Route
          exact path = '/home/detail/:id'
          component={DogDetail}
        />
    </div>
  </div>
  );
}

export default App;
