import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from '../src/styles/BlogCard.module.css?after';

import { gViewMode } from '@/pages/_app';
import { Avatar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useContext } from "react";

const NewIcon = dynamic(()=>import('./NewIcon.jsx'));
const PostTags = dynamic(()=>import('./PostTags.jsx'));

/**
 * 포스팅된 날짜와 현재 날짜를 구별하여 최신 포스트 여부 판단 (3일이상 지난 포스팅은 최신 포스트로 간주하지 않음)
 * @param {string} dataPublished - 포스트된 날짜 
 * @return {boolean} - true : 최신 포스트 , false : 최신이 아닌 포스트
 */
function checkCurPost(dataPublished){
    
    let publishedDay = dataPublished.split("-");
    
    const today = new Date();
    // 현재 날짜를 가져옵니다.

    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    // 원하는 형식으로 날짜를 설정합니다.

    if(String(today.getFullYear()) === publishedDay[0] && 
        String(today.getMonth() + 1) === publishedDay[1] &&
        Number(today.getDate()) - Number(publishedDay[2]) < 4
        ){
            return true
    } else {
        return false
    }

}

export default function BlogPost({ title, author, coverPhoto, coverPhotoLight, dataPublished, slug, tags,postChk}) {

    let viewMode = useContext(gViewMode);

    if (postChk == "none") {
        return (

                <div className={styles.noShow}>
                    <h1>no results were found for your search.</h1>
                </div>

        )
    } else {
        return (
                <div className={styles.card} >

                    <Link href={"/posts/" + slug}>

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
                        {
                            checkCurPost(dataPublished) && <NewIcon/>
                        }
                        
                        <Typography gutterBottom variant='h4' component="div">
                            <div className={styles.cardContentText}>
                                {title}
                            </div>
                        </Typography>

                        <PostTags tags={tags} />
                        
                        <div className={styles.cardContentBottom}>

                            <div className={styles.cardContentBottomArea}>
                                <div className={styles.cardContentBottomLeft}>
                                    <Avatar alt="Cindy Baker" src={author.avatar.url} />
                                    <div className={styles.cardContentBottomAuthorName}>{author.name}</div>
                                </div>

                                <div className={styles.cardContentBottomRight}>
                                    {dataPublished}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>
        )
    }
}