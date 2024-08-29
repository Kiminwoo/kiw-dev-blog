// BlogPost 컴포넌트 파일
import { Avatar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useContext } from 'react';

// 커스텀 Hook import
import { gViewMode } from '@pages/_app';

import useCheckCurPost from '@hooks/useCheckCurPost'; // hooks 폴더의 경로에 맞게 import

import styles from './BlogCard.module.css?after';

const NewIcon = dynamic(() => import('../ui/NewIcon.jsx'));
const PostTags = dynamic(() => import('../ui/PostTags.jsx'));

export default function BlogPost({
  title,
  author,
  coverPhoto,
  coverPhotoLight,
  dataPublished,
  slug,
  tags,
  postChk,
}) {
  const viewMode = useContext(gViewMode);
  const isRecentPost = useCheckCurPost(dataPublished); // 커스텀 Hook 호출

  if (postChk == 'none') {
    return (
      <div className={styles.noShow}>
        <h1>no results were found for your search.</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <Link href={'/posts/' + slug}>
          <CardMedia
            component="img"
            height="20%"
            width="150px"
            image={viewMode ? coverPhoto.url : coverPhotoLight.url}
            alt={title}
            className={styles.cardImg}
          />
        </Link>

        <CardContent>
          {isRecentPost && <NewIcon />}{' '}
          {/* 최신 포스트 여부에 따라 NewIcon 렌더링 */}
          <Typography gutterBottom variant="h4" component="div">
            <div className={styles.cardContentText}>{title}</div>
          </Typography>
          <PostTags tags={tags} />
          <div className={styles.cardContentBottom}>
            <div className={styles.cardContentBottomArea}>
              <div className={styles.cardContentBottomLeft}>
                <Avatar alt="Cindy Baker" src={author.avatar.url} />
                <div className={styles.cardContentBottomAuthorName}>
                  {author.name}
                </div>
              </div>

              <div className={styles.cardContentBottomRight}>
                {dataPublished}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    );
  }
}
