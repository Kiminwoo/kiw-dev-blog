import styles from '@/styles/Slug.module.css'

import { GraphQLClient , gql } from 'graphql-request'
import { Fragment, useEffect , useState } from 'react';
import HeadMeta from '../../../components/HeadMeta.jsx';

const graphcms = new GraphQLClient("https://api-us-west-2.hygraph.com/v2/clfp7z09m0wx401t9998xduvp/master");

const QUERY = gql`

  query Post($slug: String!){
      post(where: {slug: $slug}){
        id,
        title,
        slug,
        dataPublished,
        author{
          id,
          name,
          avatar{
            url
          }
        }
        content{
          html
        }
        coverPhoto{
          id
          url
        }
      }
  }
`;

const SLUGLIST = gql`

  {
    posts {
      slug
    }
  }

`;

export async function getStaticPaths(){
  const {posts} = await graphcms.request(SLUGLIST);
  return{
    paths : posts.map((post) => ({ params: {slug : post.slug}})),
    fallback: false,
  };
}

export async function getStaticProps({params}){
  console.log("params ", params)

  
  const slug = params.slug;
  const data = await graphcms.request(QUERY,{slug});
  const post = data.post;
  return {

    props: {
      post,
    },

    revalidate : 10,

  };
}

// export async function getServerSideProps({params}) {

//   const slug = params.slug;
//   const data = await graphcms.request(QUERY,{slug});
//   const post = data.post;
//   console.log("post" + post)
//   return {

//     props: {
//       post,
//     },

//   };

// }

export default function BlogPost({post}){

  // const [mounted,setMounted] = useState(false)
  // const isServerSide = typeof window === "undefined";

  // useEffect(()=>{
  //   setMounted(true);
  // },[])

    return (
      <Fragment>
        <div>
          <HeadMeta title={post.title} description= {post.content.html.replaceAll("<p></p>","<br/>")} image={post.coverPhoto.url}></HeadMeta>
        </div>
        <main className={styles.blogContainer}>
    
            <div className={styles.inner_blogContainer}>
              <div className={styles.mainTitleArea}>
                <h1 className={styles.mainTitle}>{post.title}</h1>
              </div>
              <div className={styles.content} dangerouslySetInnerHTML={ {__html:post.content.html.replaceAll("<p></p>","<br/>")}}></div>
            </div>
    
            <div className={styles.authorArea}>
                <img className={styles.avatarImg}   src = {post.author.avatar.url} alt="" />
                <div className={styles.authtext}>
                  <span className={styles.byText}> By </span>
                  <span> {post.author.name}</span>
                </div>
                <h6 className={styles.date}>{post.dataPublished}</h6>
            </div>
        </main>
      </Fragment>
    )
  
}
