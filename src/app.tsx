import Home from "./pages/home";
import {Router} from "preact-router";
import { render } from 'preact';
import ApiDocs from "./pages/CollectionAPI";
import {LanguageProvider} from "./utils/languageProvider";
import Error from "./utils/Error";
import Collection from "./pages/Collection";

const App = () => {

  return (
      <LanguageProvider>
          <Router>
              <Home path={"/"}/>
              <Home path={"/:trajectory"}/>
              <Home path={"/:trajectory/:subpage"}/>
              <ApiDocs path={"/api-documentation/"}/>
              <Collection path={"/collection/:type"}/>
              <Error path={"/error"} />
          </Router>
      </LanguageProvider>
  )
}

render(<App />, document.body);