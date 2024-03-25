import Home from "./pages/home";
import {Router, route} from "preact-router";
import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import ApiDocs from "./pages/CollectionAPI";


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
        <ApiDocs path={"/:lang/collection-api"}/>
    </Router>
  )
}

render(<App />, document.body);