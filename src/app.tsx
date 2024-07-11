import Home from "./pages/home";
import {Router} from "preact-router";
import { render } from 'preact';
import ApiDocs from "./pages/CollectionAPI";
import {LanguageProvider} from "./utils/languageProvider";
import Error from "./utils/Error";

const App = () => {

  return (
      <LanguageProvider>
          <Router>
              <Home path={"/"}/>
              <Home path={"/:trajectory"}/>
              <ApiDocs path={"/collection-api"}/>
          </Router>
      </LanguageProvider>
  )
}

render(<App />, document.body);