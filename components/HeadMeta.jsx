import Head from "next/head";

const HeadMeta = ({ title, description, image }) => {
    return (
        <Head>
            <title>{title || "dailyBug"}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:title" content={title || "dailyBug"} />
            <meta property="og:description" content={description}></meta>
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />
            <meta property="og:article:author" content="inwookim" />
            <meta property="og:site_name" content="dailyBug" />

            {/* twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
};

export default HeadMeta;