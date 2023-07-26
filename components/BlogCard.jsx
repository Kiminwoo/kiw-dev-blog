import Link from 'next/link';
import styles from '../src/styles/BlogCard.module.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';


export default function BlogPost({ title, author, coverPhoto, dataPublished, slug, postChk }) {
   
    if(postChk == "none"){
        return(
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
                        image={coverPhoto.url}
                        alt=""
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