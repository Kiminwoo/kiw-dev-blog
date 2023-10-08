import styles from '@/styles/Slug.module.css?after';
import SpringScrollbars from '@/SpringScrollbars.js';
import DOMPurify from "dompurify";
import { GraphQLClient, gql } from 'graphql-request';
import { JSDOM } from 'jsdom';
import parse from 'node-html-parser';
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import CodeBlock from '../../../components/CodeBlock.jsx';
import HeadMeta from '../../../components/HeadMeta.jsx';
import { getWindowSize } from '../../getWindowSize.js';

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
        coverPhotoLight{
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

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log("params ", params)


  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {

    props: {
      post,
    },

    revalidate: 10,

  };
}

export default function BlogPost({ post }) {

  const { window } = new JSDOM('<!DOCTYPE html>');
  const domPurify = DOMPurify(window);

  let parserHtmlArr ;

  function parseHtml(htmlStr) { 
    let root = parse(htmlStr);
    parserHtmlArr = [...root.childNodes]
  }

  parseHtml(post.content.html)

  const { width , height} = getWindowSize(); 

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <Fragment>

      <div>
        <HeadMeta title={post.title} description={post.content.html.replaceAll("<p></p>", "<br/>")} image={post.coverPhoto.url}></HeadMeta>
      </div>
      
      
      <SpringScrollbars style={{ height: height}}> 
      
      <main className={styles.blogContainer}>


        <div className={styles.inner_blogContainer}>
          <div className={styles.mainTitleArea}>
            <h1 className={styles.mainTitle}>
              {post.title.replaceAll("[ react ]", "").replaceAll("[ next ]", "").replaceAll("[ js ]","").substring(1)}
            </h1>
          </div>

          {

            parserHtmlArr.map((childHtml,idx)=>{
              
              // 코드 블럭이 아닐 경우 
              if(childHtml.tagName != "PRE"){
                return(
                <div key={idx}
                  className={styles.content}
                  dangerouslySetInnerHTML={{
      
                    __html: domPurify.sanitize(childHtml.outerHTML)
      
                  }}>
                </div>
                )
              } else { // 코드 블럭일 경우
              
                return (

                <CodeBlock code ={childHtml.outerHTML} language ="javascript" key={idx} />
                
                )

              }
            })


          }

        </div>

        <div className={styles.authorArea}>
          <img className={styles.avatarImg} src={post.author.avatar.url} alt="" />
          <div className={styles.authtext}>
            <span className={styles.byText}> By </span>
            <span> {post.author.name}</span>
          </div>
          <h6 className={styles.date}>{post.dataPublished}</h6>
        </div>
      </main>

      </SpringScrollbars>

    </Fragment>
  )

}



