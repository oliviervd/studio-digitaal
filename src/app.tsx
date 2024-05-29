import Home from "./pages/home";
import {Router, route} from "preact-router";
import { render } from 'preact';
import ApiDocs from "./pages/CollectionAPI";
import {LanguageProvider} from "./utils/languageProvider";
import Glossary from "./pages/glossary";
import Open from "./pages/L2Container";

const App = () => {

  return (
      <LanguageProvider>
          <Router>
              <Home path={"/"}/>
              <Home path={"/research"}/>
              <Home path={"/glossary"}/>
              <ApiDocs path={"/collection-api"}/>
          </Router>
      </LanguageProvider>
  )
}

render(<App />, document.body);