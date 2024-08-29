import {MdFiberNew} from"react-icons/md";
import styles from './BlogCard.module.css?after';

export default function NewIcon(){

    return(
        <div className={styles.newIconArea}>
            <MdFiberNew className={styles.newIcon}/>
        </div>
    )
}