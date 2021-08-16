import React, {useEffect, useState} from 'react'
import styles from './maker.module.css'
import Header from "../header/header"
import Footer from "../footer/footer"
import {useHistory} from "react-router-dom"
import Editor from "../editor/editor"
import Preview from "../preview/preview"

const Maker = ({ authService }) => {
    const [cards, setCards] = useState({
        1: {
            id: '1',
            name: 'Ellie',
            company: 'Samsung',
            theme: 'light',
            title: 'Software Engineer',
            email: 'ellie@gmail.com',
            message: 'go for it',
            fileName: 'ellie',
            fileURL: 'ellie.png'
            },
        2: {
            id: '2',
            name: 'Dayoung',
            company: 'Coinvest',
            theme: 'dark',
            title: 'Front-end Web Developer',
            email: 'dayoung@gmail.com',
            message: 'I need coffee',
            fileName: 'dayoung',
            fileURL: null
            },
        3: {
            id: '3',
            name: 'Clara',
            company: 'LN',
            theme: 'colorful',
            title: 'Junior Developer',
            email: 'clara@gmail.com',
            message: 'I am off',
            fileName: 'clara',
            fileURL: null
            }

    })

    const history = useHistory()
    const onLogout = () => {
        authService.logout()
    }

    useEffect(() => {
        authService.onAuthChange(user => {
            if(!user) {
                history.push('/')
            }
        })
    })

    const deleteCard = (card) => {
        setCards(cards => {
            const updated = { ...cards }
            delete updated[card.id]
            return updated
        })
    }

    const createOrUpdateCard = (card) => {
        setCards(cards => {
            const updated = { ...cards }
            updated[card.id] = card
            return updated
        })
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer/>
        </section>
    )
}

export default Maker
