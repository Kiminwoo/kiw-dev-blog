import DOMPurify from 'dompurify';
import { GraphQLClient, gql } from 'graphql-request';
import { JSDOM } from 'jsdom';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import parse from 'node-html-parser';
import { Fragment, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import SpringScrollbars from '@components/common/SpringScrollbars.jsx';
const CodeBlock = dynamic(() => import('@components/common/CodeBlock.jsx'));
const HeadMeta = dynamic(() => import('@components/common/HeadMeta.jsx'));
import Comment from '@components/feature/Comments.jsx';

import { useWindowSize } from '@hooks/useWindowSize'; // Hook을 가져오는 경로에 맞게 수정

import styles from './Slug.module.css?after';

const graphcms = new GraphQLClient(
  'https://api-us-west-2.hygraph.com/v2/clfp7z09m0wx401t9998xduvp/master'
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      tags
      dataPublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
      coverPhotoLight {
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

const repo = process.env.COMMENTS_REPO;
const repoId = process.env.COMMENTS_REPO_ID;
const category = process.env.COMMENTS_CATEGORY;
const categoryId = process.env.COMMENT_CATEGORY_ID;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log('params ', params);

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

  let parserHtmlArr;
  let curPath;
  function parseHtml(htmlStr) {
    let root = parse(htmlStr);
    parserHtmlArr = [...root.childNodes];
  }

  parseHtml(post.content.html);

  const { width, height } = useWindowSize();

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const avatarImg = {
    height: '36px',
    width: '36px',
  };

  const imgLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality}`;
  };

  return (
    <Fragment>
      <div>
        <HeadMeta
          title={post.title}
          description={post.content.html
            .replaceAll('<p></p>', '<br/>')
            .replaceAll(/<[^>]*>?/g, '')}
          image={post.coverPhoto.url}
          curPath={'https://itgrow.vercel.app/posts/' + post.slug}
        ></HeadMeta>
      </div>

      <SpringScrollbars style={{ height: height }}>
        <main className={styles.blogContainer}>
          <div className={styles.inner_blogContainer}>
            <div className={styles.mainTitleArea}>
              <h1 className={styles.mainTitle}>
                {post.title
                  .replaceAll('[ react ]', '')
                  .replaceAll('[ next ]', '')
                  .replaceAll('[ js ]', '')
                  .substring(1)}
              </h1>
            </div>
            {parserHtmlArr.map((childHtml, idx) => {
              // img 태그의 Image 컴포넌트의 style
              const contentImg = {
                width: '100%',
                height: '100%',
              };

              // image 태그일 경우 next/Image 를 통한 이미지 최적화
              if (childHtml.tagName == 'IMG') {
                return (
                  <Fragment key={'imageContent' + idx}>
                    <div>
                      <Image
                        width={childHtml.rawAttributes.width}
                        height={childHtml.rawAttributes.height}
                        src={childHtml.rawAttributes.src}
                        alt={childHtml.rawAttributes.alt}
                        style={contentImg}
                        sizes="1200px"
                        loader={imgLoader}
                        quality={75}
                      />
                    </div>
                  </Fragment>
                );
              }

              // !tag : img , code 일 경우
              else if (childHtml.tagName != 'PRE') {
                return (
                  <Fragment key={'content' + idx}>
                    <div
                      key={'content' + idx}
                      className={styles.content}
                      dangerouslySetInnerHTML={{
                        __html: domPurify.sanitize(childHtml.outerHTML),
                      }}
                    ></div>
                  </Fragment>
                );
              }

              // 코드 블럭일 경우
              else {
                return (
                  <Fragment key={'codeBlock' + idx}>
                    <CodeBlock
                      code={childHtml.outerHTML
                        .replaceAll('<em>', '')
                        .replaceAll('</em>', '')}
                      language="javascript"
                    />
                  </Fragment>
                );
              }
            })}
          </div>

          <div className={styles.authorArea}>
            <Image
              width={100}
              height={100}
              src={post.author.avatar.url}
              alt={'avatar'}
              style={avatarImg}
              sizes="36px"
              loader={imgLoader}
              quality={75}
            />

            <div className={styles.authtext}>
              <span className={styles.byText}> By </span>
              <span> {post.author.name}</span>
            </div>
            <h6 className={styles.date}>{post.dataPublished}</h6>
          </div>

          <Comment
            repo={repo}
            repoId={repoId}
            category={category}
            categoryId={categoryId}
          />
        </main>
      </SpringScrollbars>
    </Fragment>
  );
}
