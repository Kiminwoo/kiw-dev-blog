import { MdFiberNew } from 'react-icons/md';

import styles from '../common/BlogCard.module.css?after';

export default function NewIcon() {
  return (
    <div className={styles.newIconArea}>
      <MdFiberNew className={styles.newIcon} />
    </div>
  );
}
