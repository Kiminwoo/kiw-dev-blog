import Link from 'next/link';
import styles from '../src/styles/BlogCard.module.css?after';

import { Avatar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";


export default function BlogPost({ title, author, coverPhoto, coverPhotoLight, dataPublished, slug, postChk , viewMode }) {

    // const [mounted, setMounted] = useState(false);
    // const [viewMode, setViewMode] = useState(false);

    // useEffect(() => {
    //     if (typeof window !== "undefined") { // 윈도우 타입이 언디파인드가 아닐때 실행

    //         // 현재 다크모드 여부 ( true : 다크모드 , false : 라이트모드 )
    //         prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    //         // viewMode : true : 다크모드 , false : 라이트모드
    //         prefersDark ? setViewMode(true) : setViewMode(false);

    //         setMounted(true);

    //     } else {
    //         return;
    //     }
    // }, []);

    // if (mounted) {
        if (postChk == "none") {
            return (
                <div className={styles.noShow}>
                    <h1>no results were found for your search.</h1>
                </div>
            )
        } else {
            return (

                <div className={styles.card}>
                    <Link href={"/posts/" + slug}>
                        <CardMedia
                            component="img"
                            height="20%"
                            width="150px"
                            image={viewMode ? coverPhoto.url : coverPhotoLight.url }
                            alt={title}
                            className={styles.cardImg}
                        />
                    </Link>

                    <CardContent>
                        <Typography gutterBottom variant='h4' component="div">
                            <div className={styles.cardContentText}>
                                {title}
                            </div>
                        </Typography>
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
    // }
}