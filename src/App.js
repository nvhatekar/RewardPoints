import MainPage from './app/MainPage';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ErrorBoundry from './ErrorBoundry';

function App() {
  return (
    <ErrorBoundry>
      <h1 style={{marginLeft:20}}>Welcome To Reward Point Application</h1>
      <BrowserRouter>
      <Switch>
        <Route path="/">
          <MainPage/>
        </Route>
      </Switch>
      </BrowserRouter>
    </ErrorBoundry>
  );
}

export default App;
