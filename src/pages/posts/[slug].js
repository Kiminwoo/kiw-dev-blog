import styles from '@/styles/Slug.module.css';

import { GraphQLClient, gql } from 'graphql-request';
import { Fragment } from 'react';
import HeadMeta from '../../../components/HeadMeta.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { FaCopy } from 'react-icons/fa';
import CodeBlock from '../../../components/CodeBlock.jsx';

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
  // let cnt = post.content.html.match(/<pre>/g).filter(function(item) { return item !== ''; }).length;
  
  // let codeArr = [];
  // let textArr = [];

  // let textSidx = 0;
  // let textEidx = 0;
  // let copyCodeHtml = post.content.html.replaceAll("<p></p>", "<br/>");

  // for(let i = 0 ; i < cnt ; i++){
  //   console.log(`html 길이 : ${copyCodeHtml.length}`)

  //   let findSidx = copyCodeHtml.indexOf('<pre>');
  //   let findEidx = Number(copyCodeHtml.indexOf('</pre>'))+6;
    
  //   if(i==0){
  //     textSidx = 0 ;
  //     textEidx = findSidx -13;
  //   } else if (i == cnt-1){
  //     textSidx = textEidx ;
  //     textEidx = post.content.html.length+1;
  //   }
  //   else {
  //     // textSidx += 1;
  //     textEidx = findSidx ;
  //   }

  //   let textAre = copyCodeHtml.substring(textSidx,textEidx);
  //   let preCode = copyCodeHtml.substring(findSidx,findEidx);
  //   // let afterCode = copyCodeHtml.substring(findContentSidx,findContentEidx);

  //   // 복사된 html 내에서 pre 코드 제거
  //   copyCodeHtml = copyCodeHtml.replace(preCode,'');
  //   console.log(`html 길이 : ${copyCodeHtml.length}`)
  //   codeArr.push(preCode);
  //   textArr.push(textAre);
    
  //   // textSidx = findEidx;
  //   // if(i != 0){
  //   textSidx = findEidx - preCode.length
  //   // }
  // }

  // for(let i =0 ; i < codeArr.length ; i++){
  //   console.log(`${i} 번째 : ${codeArr[i]}`);
  // }

  // console.log(` 텍스트 배열 : ${textArr}`);

  return (
    <Fragment>

      <div>
        <HeadMeta title={post.title} description={post.content.html.replaceAll("<p></p>", "<br/>")} image={post.coverPhoto.url}></HeadMeta>
      </div>

      <main className={styles.blogContainer}>

        <div className={styles.inner_blogContainer}>
          <div className={styles.mainTitleArea}>
            <h1 className={styles.mainTitle}>
              {post.title.replaceAll("[react]", "").replaceAll("[next.js]", "").substring(1)}
            </h1>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{

              __html: makeHtmlContent(post.content.html)

            }}>
            
          </div>
          
          {/* <div className={styles.content}>

            { 
              textArr.map((text,idx)=>{

                let code = codeArr[idx].replaceAll("<pre>","")
                .replaceAll("</pre>","")
                .replaceAll("<code>","")
                .replaceAll("</code>","")
                .replaceAll(/<br\/>/ig,"\n")
                .replaceAll(/&lt;/g,'<')
                .replaceAll(/&gt;/g,'>')
                .replaceAll(/&amp;/g, '&')
                .replaceAll(/&quot;/g, '"')
                .replaceAll(/&#039;/g, "'")
                .replaceAll(/&#39;/g, "'");

                return (

                  <fragment>
                    <div dangerouslySetInnerHTML={{
                      __html : makeHtmlContent(text)
                    }}>                  
                    </div>
                    <CodeBlock blockCode={code} language='javascript' />
                  </fragment>

                )
              })
            }
            
          </div> */}

          {/* {
            codeArr.map((code)=>{

            code = code.replaceAll("<pre>","")
              .replaceAll("</pre>","")
              .replaceAll("<code>","")
              .replaceAll("</code>","")
              .replaceAll(/<br\/>/ig,"\n")
              .replaceAll(/&lt;/g,'<')
              .replaceAll(/&gt;/g,'>')
              .replaceAll(/&amp;/g, '&')
              .replaceAll(/&quot;/g, '"')
              .replaceAll(/&#039;/g, "'")
              .replaceAll(/&#39;/g, "'");

            return <CodeBlock blockCode={code} language='javascript' />

            })
          } */}

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
    </Fragment>
  )

}

function makeHtmlContent(postHtml){

  postHtml = postHtml.replaceAll("<p></p>", "<br/>")

  return postHtml;
}