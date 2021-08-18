import React, {useEffect, useState} from 'react'
import styles from './maker.module.css'
import Header from "../header/header"
import Footer from "../footer/footer"
import {useHistory} from "react-router-dom"
import Editor from "../editor/editor"
import Preview from "../preview/preview"

const Maker = ({ FileInput, authService, cardRepository }) => {
    const historyState = useHistory().state
    const [cards, setCards] = useState({})
    const [userId, setUserId]
        = useState(historyState && historyState.id)

    const history = useHistory()
    const onLogout = () => {
        authService.logout()
    }

    useEffect(() => {
        if(!userId) {
            return
        }
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCards(cards)
        })
        // 컴포넌트가 unmount 되었을 때 (컴포넌트가 더이상 안보일 때) 리턴함수 실행
        // 메모리 정리 시 사용
        return () => stopSync()
    }, [userId, cardRepository])

    useEffect(() => {
        authService.onAuthChange(user => {
            if(user) {
                setUserId(user.uid)
            } else {
                history.push('/')
            }
        })
    }, [userId, history, authService])

    const deleteCard = (card) => {
        setCards(cards => {
            const updated = { ...cards }
            delete updated[card.id]
            return updated
        })
        cardRepository.removeCard(userId, card)
    }

    const createOrUpdateCard = (card) => {
        setCards(cards => {
            const updated = { ...cards }
            updated[card.id] = card
            return updated
        })
        cardRepository.saveCard(userId, card)
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor FileInput={FileInput} cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer/>
        </section>
    )
}

export default Maker
