import Head from 'next/head';

const HeadMeta = ({ title, description, image, curPath }) => {
  return (
    <Head>
      <title>{title || 'ITgrow'}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="shortcut icon"
        href="https://tistory1.daumcdn.net/tistory/2899385/attach/8fd0a3a1510240589fa281426f2ba218"
      />

      {/*  google */}
      <meta property="og:title" content={title || 'ITgrow'} />
      <meta property="og:description" content={description}></meta>
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="inwookim" />
      <meta property="og:url" content={curPath} />
      <meta property="og:site_name" content="ITgrow" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default HeadMeta;
