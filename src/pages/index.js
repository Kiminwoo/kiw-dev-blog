import { GraphQLClient, gql } from 'graphql-request';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment, useEffect, useState, useRef } from 'react';

import { useWindowSize } from '@hooks/useWindowSize'; // Hook을 가져오는 경로에 맞게 수정

import styles from './index.module.css?after';

const BlogCard = dynamic(() => import('@components/common/BlogCard.jsx'));
const HeaderBar = dynamic(() => import('@components/common/HeaderBar.jsx'));
const SpringScrollbars = dynamic(
  () => import('@components/common/SpringScrollbars.jsx')
);

const graphcms = new GraphQLClient(
  'https://api-us-west-2.hygraph.com/v2/clfp7z09m0wx401t9998xduvp/master'
);

const QUERY = gql`
  {
    posts(orderBy: publishedAt_DESC) {
      id
      title
      dataPublished
      slug
      subject
      tags
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
      coverPhotoLight {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);

  // 최신 내용 정렬
  posts.sort(function (a, b) {
    return new Date(b.dataPublished) - new Date(a.dataPublished);
  });

  return {
    props: {
      posts,
    },

    revalidate: 10,
  };
}

export default function Home({ posts }) {
  // 현재 페이지
  let currentPage = 1;
  // 페이지당 포스트 개수
  const postsPerPage = 9;
  // 마지막 포스트 인덱스 주소
  let indexOfLastPost = currentPage * postsPerPage;
  // 처음 포스트 인덱스 주소
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  // 포스트 페이징 배열
  let postsObjArr = { posts: posts.slice(indexOfFirstPost, indexOfLastPost) };
  // 포스트 총 개수
  const totalPosts = posts.length;
  const [postState, setPostState] = useState(postsObjArr);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const bottom = useRef(null);
  const delay = 10000;

  useEffect(() => {
    getPostDate(postState);

    const observer = new IntersectionObserver((entries) => {
      // 사용자가 마우스 드래그를 맨 밑으로 내렸을 경우
      if (entries[0].isIntersecting) {
        async function fetchMorePosts() {
          setLoading(true);
          setTimeout(() => setShowLoading(true), delay);

          setLoading(false);
          setShowLoading(false);

          // 현재 가지고 있는 포스트의 총 개수가 더 클 경우
          if (totalPosts >= indexOfLastPost) {
            ++currentPage;
            indexOfLastPost = currentPage * postsPerPage;
            indexOfFirstPost = indexOfLastPost - postsPerPage;

            let pagingPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

            pagingPosts.map((postItem) => {
              setPostState({ posts: [...postState.posts, postItem] });
            });
          } else {
            // 현재 가지고 있는 포스트의 총 개수가 더 작을 경우
          }
        }
        fetchMorePosts();
      }
    });
    observer.observe(bottom.current);
  }, []);

  const getPostDate = (postState) => {
    setPostState(postState);
  };

  let { width, height } = useWindowSize();

  return (
    <SpringScrollbars style={{ height: height }}>
      <div className={styles.grid}>
        <Head>
          <title>ITgrow</title>
          <meta name="description" content="버그 없는 세상에서 살고 싶다." />
          <meta name="author" content="inwookim" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            property="og:image"
            content="https://tistory1.daumcdn.net/tistory/2899385/attach/8fd0a3a1510240589fa281426f2ba218"
          />
          <meta property="og:title" content="버그 없는 세상에서 살고 싶다." />
          <link
            rel="shortcut icon"
            href="https://tistory1.daumcdn.net/tistory/2899385/attach/8fd0a3a1510240589fa281426f2ba218"
          />
        </Head>

        <HeaderBar postList={{ posts }} getPostDate={getPostDate} />

        {/* 게시물의 갯수가 3개보다 작을 경우 or 게시물의 개수가 3개 이상일 경우 */}
        <main
          className={`${styles.main} ${postState.posts.length < 3 ? `${styles.small_main}` : ''}`}
        >
          {postState.posts.length != 0 ? (
            postState.posts.map((post) => (
              // 컴포넌트를 감싼 형태에서 Fragment 에 key 값을 줌으로써 BlogCard 컴포넌트의 unique key 값 유지
              <Fragment key={post.id}>
                <BlogCard
                  title={post.title}
                  author={post.author}
                  coverPhoto={post.coverPhoto}
                  coverPhotoLight={post.coverPhotoLight}
                  dataPublished={post.dataPublished}
                  slug={post.slug}
                  tags={post.tags}
                  postChk={'show'}
                />
              </Fragment>
            ))
          ) : (
            <Fragment key="noneContent">
              <BlogCard postChk={'none'} />
            </Fragment>
          )}
          {loading && (
            <div style={{ opacity: showLoading ? 1 : 0 }}>Loading ...</div>
          )}
          <div ref={bottom} />
        </main>
      </div>
    </SpringScrollbars>
  );
}
