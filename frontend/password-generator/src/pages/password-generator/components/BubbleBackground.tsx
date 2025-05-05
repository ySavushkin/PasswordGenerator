import React from 'react';
import styles from './BubbleBackground.module.css';

const BubbleBackground: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bubble}></div>
        </div>
    );
};

export default BubbleBackground;
