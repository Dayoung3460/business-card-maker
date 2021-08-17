import React from 'react';
import Button from "../button/button";
import styles from "./card_edit_form.module.css";


const CardEditForm = ({ FileInput, card, updateCard, deleteCard }) => {
    const {name, company, title, email, message, theme, fileName } = card

    const onSubmit = () => {
        deleteCard(card)
    }
    const onChange = (e) => {
        if(!e.currentTarget) {
            return
        }
        e.preventDefault()
        updateCard({
            ...card,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const onFileChange = (file) => {
        updateCard({
            ...card,
            fileName: file.name,
            fileURL: file.url
        })
    }

    return (
        <form className={styles.form}>
            <input className={styles.input} type='text' name='name' onChange={onChange} value={name}/>
            <input className={styles.input} type='text' name='company' onChange={onChange} value={company}/>
            <select className={styles.select} name='theme' onChange={onChange} value={theme}>
                <option value='light'>light</option>
                <option value='dark'>dark</option>
                <option value='colorful'>colorful</option>
            </select>
            <input className={styles.input} type='text' name='title' onChange={onChange} value={title}/>
            <input className={styles.input} type='text' name='email' onChange={onChange} value={email}/>
            <textarea className={styles.textarea} name='message' onChange={onChange} value={message} />
            <div className={styles.fileInput}>
                <FileInput name={fileName} onFileChange={onFileChange}/>
            </div>
            <Button name='Delete' onClick={onSubmit} />

        </form>
    )
}

export default CardEditForm;

