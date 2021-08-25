// we have created a Context for the api's..
// so we have import all the api's from util/http and make a common function HttpContext
// where this function provides a api's for us whenever we needed... so instead of import a api everytime from different
// component we just created a common function for it. so import this function and call the api from this function as a function

import { createContext, FC, useContext, useMemo } from "react";
import getrecent from "../../utils/http/getrecent";
import search from "../../utils/http/search";

const initialState = {
  getrecent,
  search,
};

export const HttpContext = createContext(initialState);

const HttpProvider: FC = ({ children }) => (
  <HttpContext.Provider value={useMemo(() => initialState, [])}>
    {children}
  </HttpContext.Provider>
);
export default HttpProvider;

export const useHttp = () => useContext(HttpContext);
