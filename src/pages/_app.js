import '@/styles/globals.css?after'
import { Fragment } from 'react'
import GlobalStyles from '../../components/GlobalStyles';
import React, { useEffect, useState } from 'react';


// 사용자의 다크모드 or 라이트모드 확인 여부
export const gViewMode = React.createContext();
export const setGViewMode = React.createContext();

export default function App({ Component, pageProps }) {

  const [viewMode, setViewMode] = useState(false);
  
  useEffect(() => {

    // 윈도우 타입이 언디파인드가 아닐때 실행
    if (typeof window !== "undefined") { 

      // let localViewMode = localStorage.getItem('viewMode');

      // 사용자가 다크모드 or 라이트모드를 하지 않은 경우  
      // if(localViewMode === null){
  
        // 현재 다크모드 여부 ( true : 다크모드 , false : 라이트모드 )
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // viewMode : true : 다크모드 , false : 라이트모드
        prefersDark ? setViewMode(true) : setViewMode(false);

      // } 
      
      // else {
      //   setViewMode(localViewMode);
      // } 

    } else {
      return;
    }

  },[])


  return (
    <Fragment>
      <setGViewMode.Provider value = {setViewMode} >
        <gViewMode.Provider value={viewMode} >

          <GlobalStyles />
          <Component {...pageProps} />

        </gViewMode.Provider>
        </setGViewMode.Provider>
    </Fragment>
  )
}
