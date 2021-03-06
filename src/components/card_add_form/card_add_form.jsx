import React, {memo, useRef, useState} from 'react';
import Button from "../button/button";
import styles from "./card_add_form.module.css";

const CardAddForm = memo(({ FileInput, onAdd }) => {
    const nameRef = useRef()
    const companyRef = useRef()
    const themeRef = useRef()
    const titleRef = useRef()
    const emailRef = useRef()
    const messageRef = useRef()
    const formRef = useRef()
    const [file, setFile] = useState({
        filename: null,
        fileURL: null
    })


    const onSubmit = (e) => {
        e.preventDefault()
        const card =  {
            id: Date.now(),
            name: nameRef.current.value || '',
            company: companyRef.current.value || '',
            theme: themeRef.current.value,
            title: titleRef.current.value || '',
            email: emailRef.current.value || '',
            message: messageRef.current.value || '',
            fileName: file.fileName || '',
            fileURL: file.fileURL || ''
        }
        formRef.current.reset()
        setFile({fileName: null, fileURL: null})
        onAdd(card)
    }
    const onChange = () => {

    }

    const onFileChange = (file) => {
        setFile({
            fileName: file.name,
            fileURL: file.url
        })
    }

    return (
        <form ref={formRef} className={styles.form}>
            <input className={styles.input} type='text' ref={nameRef} name='name' onChange={onChange} placeholder='name'/>
            <input className={styles.input} type='text' ref={companyRef} name='company' onChange={onChange} placeholder='company'/>
            <select className={styles.select} ref={themeRef} name='theme' onChange={onChange} placeholder='theme'>
                <option placeholder='light'>light</option>
                <option placeholder='dark'>dark</option>
                <option placeholder='colorful'>colorful</option>
            </select>
            <input className={styles.input} type='text' ref={titleRef} name='title' onChange={onChange} placeholder='title'/>
            <input className={styles.input} type='text' ref={emailRef} name='email' onChange={onChange} placeholder='email'/>
            <textarea className={styles.textarea} ref={messageRef} name='message' onChange={onChange} placeholder='message' />
            <div className={styles.fileInput}>
                <FileInput name={file.fileName} onFileChange={onFileChange}/>
            </div>
            <Button name='Add' onClick={onSubmit} />

        </form>
    )
})

export default CardAddForm;


