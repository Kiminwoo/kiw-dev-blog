import styles from '@/styles/Home.module.css?after';
import Head from 'next/head';

import SpringScrollbars from '@/SpringScrollbars.js';
import { GraphQLClient, gql } from 'graphql-request';
import { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard.jsx';
import HeaderBar from '../../components/HeaderBar.jsx';
import { getWindowSize } from '../getWindowSize.js';

const graphcms = new GraphQLClient("https://api-us-west-2.hygraph.com/v2/clfp7z09m0wx401t9998xduvp/master");

const QUERY = gql`

  {
    posts{
      id,
      title,
      dataPublished,
      slug,
      content {
        html
      }
      author {
        name,
        avatar{
          url
        }
      }
      coverPhoto{
          url
      }
    }  
  }

`;

export async function getStaticProps(){
  const { posts } = await graphcms.request(QUERY);
  
  // 최신 내용 정렬
  posts.sort(function(a,b){
    return new Date(b.dataPublished) - new Date(a.dataPublished);
  })

  return {

    props: {
      posts,
    },

    revalidate : 10,

  };
}

export default function Home({posts}) {

  const [postState,setPostState] = useState({posts});

  useEffect(()=>{
    getPostDate(postState);
  })
  
  const getPostDate = (postState) =>{
    setPostState(postState);
  }

  const { width , height} = getWindowSize(); 

  return (
    <div className={styles.grid}>

      <Head>
        <title>daliyBug</title>
        <meta name="description" content="postMainPage" />
        <meta name="author" content="inwookim" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content= "https://img1.daumcdn.net/thumb/C428x428/?scode=mtistory2&fname=https%3A%2F%2Ftistory2.daumcdn.net%2Ftistory%2F2899385%2Fattach%2F3c560e9b7b7c4d6fb3eefa0a05a944fb"/>
        <meta property="og:title" content={"버그 없는 세상에서 살고 싶다."} />
        <link rel="shortcut icon" href="https://img1.daumcdn.net/thumb/C428x428/?scode=mtistory2&fname=https%3A%2F%2Ftistory3.daumcdn.net%2Ftistory%2F2899385%2Fattach%2F3c560e9b7b7c4d6fb3eefa0a05a944fb" />

      </Head>

      <HeaderBar postList = {{posts}} getPostDate = {getPostDate}/>

      <SpringScrollbars style={{ height: height}}>

      <main className={styles.main}> 

        {     
              postState.posts.length != 0 ? 
              postState.posts.map((post)=>(

                <BlogCard
                  title = {post.title}
                  author = {post.author}
                  coverPhoto = {post.coverPhoto}
                  key ={post.id}
                  dataPublished = {post.dataPublished}
                  slug = {post.slug}
                  postChk = {"show"}
                />
              )) :
                <BlogCard
                  postChk = {"none"}
                />
        }

      </main>
      </SpringScrollbars>

    </div>
  );
}
