import Link from 'next/link';
import styles from '../src/styles/BlogCard.module.css?after';

import { Avatar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState, useContext } from "react";
import { gViewMode } from '@/pages/_app';

export default function BlogPost({ title, author, coverPhoto, coverPhotoLight, dataPublished, slug, postChk }) {
    let viewMode = useContext(gViewMode);

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
                        image={viewMode ? coverPhoto.url : coverPhotoLight.url}
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
}