import { useContext, useState} from "preact/hooks";
import { createContext } from 'preact/compat';

// create a context and set default language
const LanguageContext = createContext({
    language: "en",
    setLanguage: () => {},
});

// create provider component
export function LanguageProvider({ children })  {
    const [language, setLanguage] = useState("en");
    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
}

// hook to use the context
export function useLanguage() {
    return useContext(LanguageContext)
}