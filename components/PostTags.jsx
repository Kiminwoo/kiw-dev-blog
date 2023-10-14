import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import styles from '../src/styles/BlogCard.module.css?after';

export default function PostTags({tags}){

    return(
        <div className={styles.tags}>
            <Stack direction="row" spacing={1}>
                {
                    tags.length != 0 &&
                    tags[0].split(',').map((tag)=>{
                        return(
                            <Chip label={tag} variant='outlined'/>
                        )
                    })
                }
            </Stack>
        </div>
    )
}