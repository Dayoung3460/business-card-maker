import React, {useEffect} from 'react'
import Footer from "../footer/footer"
import Header from "../header/header"
import styles from './login.module.css'
import {useHistory} from 'react-router-dom'

const Login = ({authService}) => {
    const history = useHistory()
    const goToMaker = (userId) => {
        history.push({
            pathname: '/maker',
            state: { id: userId }
        })
    }
    const onLogin = (event) => {
        authService //
            .login(event.currentTarget.textContent)
            .then()
    }

    // 컴포넌트가 마운트나 업데이트가 됐을 때 vue의 라이프사이클 mounted랑 비슷..?
    useEffect(() => {
        authService
            .onAuthChange(user => {
                user && goToMaker(user.uid)
            })
    })

    return (
        <section className={styles.login}>
            <Header/>
            <section>
                <h1>Login</h1>
                    <ul className={styles.list}>
                        <li className={styles.item}><button className={styles.button} onClick={onLogin}>Google</button></li>
                        <li className={styles.item}><button className={styles.button} onClick={onLogin}>Github</button></li>
                    </ul>
            </section>
            <Footer/>
        </section>
    )
}

export default Login
