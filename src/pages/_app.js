import '@styles/globals.css?after'
import { Fragment } from 'react'
import React, { useEffect, useState } from 'react';
import InApp from './InApp';
import { inject }from '@vercel/analytics';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faGithub)

export const gViewMode = React.createContext();
export const setGViewMode = React.createContext();

export default function App({ Component, pageProps }) {

  const [viewMode, setViewMode] = useState(false);
  
  useEffect(() => {

    // 윈도우 타입이 언디파인드가 아닐때 실행
    if (typeof window !== "undefined") { 

        // 현재 다크모드 여부 ( true : 다크모드 , false : 라이트모드 )
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // viewMode : true : 다크모드 , false : 라이트모드
        prefersDark ? setViewMode(true) : setViewMode(false);

      inject();
    } else {
      return;
    }

  },[])


  return (
    <Fragment>
      <InApp />
      <setGViewMode.Provider value = {setViewMode} >
        <gViewMode.Provider value={viewMode} >

          <Component {...pageProps} />

        </gViewMode.Provider>
        </setGViewMode.Provider>
    </Fragment>
  )
}
