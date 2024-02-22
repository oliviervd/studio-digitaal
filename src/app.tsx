import Home from "./pages/home";
import Router from "preact-router";
import { render } from 'preact';

const App = () => {

  return (
    <Router>
      <Home path={"/:lang"}/>
    </Router>
  )
}

render(<App />, document.body);