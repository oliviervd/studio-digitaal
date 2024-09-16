import React, { createContext, useContext, useState, useEffect } from 'react'
import serialize from "../utils/serialize";
import {fetchPayload} from "../utils/fetchPayload";
import {sort} from "semver";
import glossary from "../pages/glossary";

interface DataCache {
    trajectories: any[];
    projects: any[];
    about: string;
    glossary: any[];
    agents: any[];
}

interface DataContextType extends DataCache {
    fetchData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(null);

export const DataProvider: React.FC<{baseURI: string, language:string}> =
    ({children, baseURI, language}) => {
        const [trajectories, setTrajectories] = useState<string[]>([]);
        const [projects, setProjects] = useState<DataContextType[]>([]);
        const [about, setAbout] = useState<DataContextType[]>([]);
        const [glossary, setGlossary] = useState<DataContextType[]>([]);
        const [agents, setAgents] = useState<DataContextType[]>([]);

        const fetchData = async () => {
            Promise.all([
                fetchPayload(baseURI, "trajectory", 100, language).then((data)=>setTrajectories(data.docs)),
                fetchPayload(baseURI, "StudioDigitalProject", 100, language).then((data)=>setProjects(data.docs)),
                fetchPayload(baseURI, "studios", 100, language).then((data)=>setAbout(serialize(data.docs[3].description))),
                fetchPayload(baseURI, "agents", 100, language).then((data)=>setAgents(data.docs)),
                fetchPayload(baseURI, "Glossary", 100, language).then((data)=> {
                    const sortedData = data.docs.sort((a, b) => a.concept.localeCompare(b.concept));
                    setGlossary(sortedData)
                })
            ])
        }

        useEffect(()=>{
            fetchData()
        }, [language])

        const contextValue = {
            trajectories,
            projects,
            about,
            glossary,
            agents,
            fetchData
        }

        return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
    }

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
};

