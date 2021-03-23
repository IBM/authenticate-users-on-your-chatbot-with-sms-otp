import logo from './logo.svg';
import './App.css';
import './App.scss';
import './app2.scss';
import { Button, Content } from 'carbon-components-react';
import HeaderC from './components/Header';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage/LandingPage';
// import DisplayPage from './content/DisplayPage/DisplayPage';


function App() {
  return (
    <>
        <HeaderC />
        {/* <Content> */}
        <div style={{marginTop:"3rem"}}>
          <Switch>
            {/* <Route exact path="/display" component={DisplayPage} /> */}
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </div>
        {/* </Content> */}
      </>
  );
}

export default App;
