import Head from "next/head";

const HeadMeta = ({ title, description, image,curPath }) => {
    
    console.log(curPath);
    return (
        <Head>
            <title>{title || "dailyBug"}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="shortcut icon" href="https://img1.daumcdn.net/thumb/C428x428/?scode=mtistory2&fname=https%3A%2F%2Ftistory3.daumcdn.net%2Ftistory%2F2899385%2Fattach%2F3c560e9b7b7c4d6fb3eefa0a05a944fb" />

            {/*  google */}
            <meta property="og:title" content={title || "dailyBug"} />
            <meta property="og:description" content={description}></meta>
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />
            <meta property="og:article:author" content="inwookim" />
            <meta property="og:site_name" content="dailyBug" />
            <meta property="og:locale" content="ko_KR"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
            
            {/* twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

        </Head>
    );
};

export default HeadMeta;