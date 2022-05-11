import React, {memo} from 'react'
import styles from './footer.module.css'

const Footer = memo((props) => (
    <footer className={styles.footer}>
        <p className={styles.title}>Code your dream</p>
        <a href="https://make-business-card.netlify.app" target="_blank" rel="noreferrer">
            <i className="fab fa-github-square"></i>
        </a>
    </footer>
))

export default Footer
