import React, {useCallback, useEffect, useState} from 'react'
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

    // 함수가 계속 호출이 되어도 동일한 데이터를 사용하기 위해 useCallback
    // Maker 컴포넌트 안의 지역변수이기 때문에 Maker가 랜더링 될 때마다
    // onLogout도 계속 새롭게 생성이 되겠지
    // 이걸 막는게 useCallback
    // but 주의할 점: Maker의 props들이 변경되어도 얘한테는 아무런 영향 안끼침
    // 그래서 useEffect처럼 dependency 배열에 값 넣어주면
    // 그 값이 변할 때 onLogout 실행됨.
    const onLogout = useCallback(() => {
        authService.logout()
    }, [authService])

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
