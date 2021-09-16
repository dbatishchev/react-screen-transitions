import React from 'react';
import PropTypes from 'prop-types';
import styles from './Content.module.css';

export default function Content({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};
