

// ВНИЗУ: С ОТПРАВКОЙ НА СЕРВЕР, НО БЕЗ PNG

import React, { useState } from 'react';
import './MatrixTranspose.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import logoSVG from '../assets/logo.png';
function MatrixTranspose() {
    const [inputData, setInputData] = useState('');
    const [inputData2, setInputData2] = useState('');
    const [responseData, setResponseData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [elapsedTime, setElapsedTime] = useState('');

    const handleInputChange = (event) => {
        setInputData(event.target.value);
    };

    const handleInputChange2 = (event) => {
        setInputData2(event.target.value);
    };

    const sendDataToServer = async () => {
        let userEmail = null;
        if (localStorage.getItem('email')) {
            userEmail = localStorage.getItem('email');
        } 

        try {
            const response = await fetch(
                'http://26.108.230.233:8080/calculations/matrices/transpose',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        matrix1: inputData,
                        threads: inputData2,
                        email: userEmail
                    }), // Отправка данных на сервер
                }
            );

            const data = await response.json(); // Преобразование ответа в JSON формат

            setResponseData(data.result); // Установка полученного ответа в состояние responseData

            setElapsedTime(data.elapsedTime + 'ms');
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            setIsLoading(false); // Установка isLoading обратно в false после получения ответа
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        sendDataToServer();
    };

    const { t } = useTranslation();

    return (
        <div className="matrix-transpose-container">
           <nav className="main-nav">                
                    <div className='logo-container'>
                                 <Link to="/" className="tools-button">
                                 <img className="logoSVG" src={logoSVG} alt="Logo" />
                                 </Link>
                                 </div>
             
                             
                                 <Link to="/calculations" className="tools-button">
                                     {t('tools')}
                                 </Link>
                                 <Link to="/historypage" className="about-button">
                                     {t('history')}
                                 </Link>
                                 <Link to="/chatroom" className="chat-button">
                                     {t('chat')}
                                 </Link>
                            
                                 
                                 
                                 <div className="startPageSelector">
                                     <LanguageSelector />
                                 </div>
                                 
                                 
                             </nav>
            <h1 className="h1Transpose">{t('transpose')}</h1>
            <form className="matrix-transpose-form">
                <form className="matrix-transpose-block">
                    <p className="matrix-transpose-text1">{t('matrix')}:</p>
                    <input
                        value={inputData}
                        onChange={handleInputChange}
                        className="matrix-transpose-input"
                        placeholder={t('enterthematrix')}
                    />
                </form>
                <form className="matrix-transpose-block">
                    <p className="matrix-transpose-text-threads">
                        {t('threads')}:
                    </p>
                    <input
                        value={inputData2}
                        onChange={handleInputChange2}
                        className="matrix-transpose-input-threads"
                        placeholder={t('threads')}
                    />
                </form>
            </form>
            <button onClick={handleSubmit} className="matrix-transpose-button">
                {isLoading ? t('loading') : t('getresult')}
            </button>
            <p className="matrix-transpose-text2">{t('result')}:</p>
            <form className="matrix-transpose-form">
                {/* Форма для вывода текста с сервера */}
                <textarea
                    value={responseData}
                    className="matrix-transpose-textarea"
                    readOnly
                />
                <textarea
                    value={elapsedTime}
                    style={{paddingTop: '1%', paddingBottom: '1%', border: '1px solid #49678D',
                         color: '#fff', backgroundColor: '#444444',
                        marginLeft: '3%', fontSize: '120%'}}
                    readOnly
                />
            </form>
        </div>
    );
}

export default MatrixTranspose;


