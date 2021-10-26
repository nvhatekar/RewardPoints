import MainPage from './app/MainPage';
import DetailPage from './app/DetailPage';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ErrorBoundry from './ErrorBoundry';

function App() {
  return (
    <ErrorBoundry>
      <h1 style={{marginLeft:20}}>Welcome To Reward Point Application</h1>
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage/>
        </Route>
        <Route path="/details">
          <DetailPage/>
        </Route>
      </Switch>
      </BrowserRouter>
    </ErrorBoundry>
  );
}

export default App;
