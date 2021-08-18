import React, {memo} from 'react';
import styles from './card.module.css'

const DEFAULT_IMG = '/images/default_logo.png'

// memo: 메모로 감싸면, 리턴값을 memory 기억해놓고 다음에 이 함수가 또 실행됐을 때 이전 리턴 값과 값이 같으면 또 랜더링 안함.
// 즉 props가 변하지 않으면(리턴값도 변할리가 없지) 랜더링 안됨.
const Card = memo(({ card }) => {
    const {name, company, title, email, message, theme, fileURL} = card
    const url = fileURL || DEFAULT_IMG

    return (
        <li className={`${styles.card} ${getStyles(theme)}`}>
            <img className={styles.avatar} src={url} alt='profile'/>
            <div className={styles.info}>
                <h1 className={styles.name}>{ name }</h1>
                <p className={styles.company}>{ company }</p>
                <p className={styles.title}>{ title }</p>
                <p className={styles.email}>{ email }</p>
                <p className={styles.message}>{ message }</p>
            </div>
        </li>
    )
})

function getStyles(theme) {
    switch(theme) {
        case 'dark':
            return styles.dark
        case 'light':
            return styles.light
        case 'colorful':
            return styles.colorful
        default:
            throw new Error(`unknown theme :${theme}`)
    }
}

export default Card;
