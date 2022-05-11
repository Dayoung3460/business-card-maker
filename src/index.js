import React, {memo} from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.module.css';
import App from './App';
import AuthService from "./service/auth_service";
import ImageUploader from "./service/image_uploader";
import ImageFileInput from "./components/image_file_input/image_file_input";
import CardRepository from "./service/card_repository";

const authService = new AuthService()
const imageUploader = new ImageUploader()
const cardRepository = new CardRepository()
const FileInput = memo(props => {
    return <ImageFileInput {...props} imageUploader={imageUploader} />
})

ReactDOM.render(
  <React.StrictMode>
    <App
        authService={authService}
        FileInput={FileInput}
        cardRepository={cardRepository}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
