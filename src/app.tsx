import Home from "./pages/home";
import {Router, route} from "preact-router";
import { render } from 'preact';
import ApiDocs from "./pages/CollectionAPI";
import {LanguageProvider} from "./utils/languageProvider";
const App = () => {

  return (
      <LanguageProvider>
          <Router>
              <Home path={"/"}/>
              <ApiDocs path={"/collection-api"}/>
          </Router>
      </LanguageProvider>
  )
}

render(<App />, document.body);