import Home from "./pages/home";
import {Router, route} from "preact-router";
import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import ApiDoc from "./components/apiDoc";



const App = () => {

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === '/') {
            route('/en', true); // Redirect to '/en'
        }
    }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Router>
        <Home path={"/:lang"}/>
        <ApiDoc path={"/:lang/api-docs"}/>
    </Router>
  )
}

render(<App />, document.body);