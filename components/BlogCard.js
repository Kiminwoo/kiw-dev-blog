import Link from 'next/link';
import styles from '../src/styles/BlogCard.module.css';

export function BlogPost({title,author,coverPhoto,datePublished,slug}){
    return (
        <div className="{styles.card}">
            <Link href={"/posts/"+slug}>
                <div className='{styles.imgContainer}'>
                    <img scr="coverPhoto.url" alt ="" />
                </div>
            </Link>
        </div>
    );
}