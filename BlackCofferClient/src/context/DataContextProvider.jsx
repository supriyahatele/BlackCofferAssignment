import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const dataContext=createContext()
const DataContextProvider = ({children}) => {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://blackcoffer-backend-o2nw.onrender.com/api/v1/data');
        setData(response?.data);
        console.log("response",response?.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
    return (
      <dataContext.Provider value={{ data, loading, error }}>
          {children}
      </dataContext.Provider>
    )
  }
export  {DataContextProvider}


