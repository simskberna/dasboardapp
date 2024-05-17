import React from 'react';
import { createContext, useContext ,useState } from 'react';
export const PageTitleContext = createContext(); 

export const usePageTitle = () => useContext(PageTitleContext);

export const PageTitleProvider = ({ children }) => {
    const [pageTitle,setPageTitle] = useState('');

    const setTitle = (title) => {
        setPageTitle(title);
        document.title = title;
    }
    return(
        <PageTitleContext.Provider value={{pageTitle,setTitle}}>
            {children}
        </PageTitleContext.Provider>
    )
}