import Home from "./pages/home";
import {Router, route} from "preact-router";
import { render } from 'preact';
import ApiDocs from "./pages/CollectionAPI";
import {LanguageProvider} from "./utils/languageProvider";
import Glossary from "./pages/glossary";
import Permacomputing from "./pages/Permacomputing";
const App = () => {

  return (
      <LanguageProvider>
          <Router>
              <Home path={"/"}/>
              <ApiDocs path={"/collection-api"}/>
              <Glossary path={"/glossary"}/>
              <Permacomputing path={"/permacomputing"}/>
          </Router>
      </LanguageProvider>
  )
}

render(<App />, document.body);