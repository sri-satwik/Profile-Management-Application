import React from 'react';
import styles from './NotFound.module.css';  // Import CSS module

const NotFound: React.FC = () => {
  return (
    <div className={styles['not-found']}>
      <h1 className={styles['not-found__text']}>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFound;
