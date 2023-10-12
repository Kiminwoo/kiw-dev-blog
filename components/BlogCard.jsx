import Link from 'next/link';
import styles from '../src/styles/BlogCard.module.css?after';

import { gViewMode } from '@/pages/_app';
import { Avatar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Fragment, useContext } from "react";
import Image from 'next/image';

export default function BlogPost({ title, author, coverPhoto, coverPhotoLight, dataPublished, slug, postChk}) {

    let viewMode = useContext(gViewMode);

    const cardImg = {
        objectFit:"cover",
        borderRadius : "5px",
        width:"20%",
        height:"150px"
    }
    if (postChk == "none") {
        return (

                <div className={styles.noShow} key={myKey}>
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

                        {/* <Image
                            width="100"
                            height="100"
                            src={viewMode ? coverPhoto.url : coverPhotoLight.url}
                            alt={title}
                            style={cardImg}
                            sizes='500px'
                        /> */}

                        
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