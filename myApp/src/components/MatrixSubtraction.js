import React, { useState } from 'react';
import './MatrixSubtraction.css';
import { toPng } from 'html-to-image';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import logoSVG from '../assets/logo.png';
function MatrixSubtraction() {
    const [inputData1, setInputData1] = useState('');
    const [inputData2, setInputData2] = useState('');
    const [inputData3, setInputData3] = useState('');
    const [responseData, setResponseData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [elapsedTime, setElapsedTime] = useState('');

    const handleInputChange1 = (event) => {
        setInputData1(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setInputData2(event.target.value);
    };
    const handleInputChange3 = (event) => {
        setInputData3(event.target.value);
    };

    const sendDataToServer = async () => {
        let userEmail = null;
        if (localStorage.getItem('email')) {
            userEmail = localStorage.getItem('email');
        }

        try {
            const response = await fetch(
                'http://26.108.230.233:8080/calculations/matrices/substract',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        matrix1: inputData1,
                        matrix2: inputData2,
                        threads: inputData3,
                        email: userEmail
                    }), // Отправка данных на сервер
                }
            );

            const data = await response.json(); // Преобразование ответа в JSON формат

            setResponseData(data.result); // Установка полученного ответа в состояние responseData

            setElapsedTime(data.elapsedTime + 'ms');

            // const image = await toPng(
            //     document.getElementById('response-container')
            // );
            // setImageData(image);

            setInputData1('');
            setInputData2('');
            setInputData3('');
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
        <div className="matrix-subtraction-container">
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
            <h1 className="h1Subtraction">{t('subtraction')}</h1>
            <form className="matrix-subtraction-form">
                <form className="matrix-subtraction-block">
                    <p className="matrix-subtraction-text1">{t('matrix')}:</p>
                    <input
                        value={inputData1}
                        onChange={handleInputChange1}
                        className="matrix-subtraction-input"
                        placeholder={t('enterthematrix')}
                    />
                    <p className="matrix-subtraction-text1">
                        {t('secondmatrix')}:
                    </p>
                    <input
                        value={inputData2}
                        onChange={handleInputChange2}
                        className="matrix-subtraction-input"
                        placeholder={t('enterthesecondmatrix')}
                    />
                </form>
                <form className="matrix-subtraction-block">
                    <p className="matrix-subtraction-text-threads">
                        {t('threads')}:
                    </p>
                    <input
                        value={inputData3}
                        onChange={handleInputChange3}
                        className="matrix-subtraction-input-threads"
                        placeholder={t('threads')}
                    />
                </form>
            </form>

            <button
                onClick={handleSubmit}
                className="matrix-subtraction-button"
            >
                {isLoading ? t('loading') : t('getresult')}
            </button>
            <p className="matrix-subtraction-text2">{t('result')}:</p>
            <form className="matrix-subtraction-form" id="response-container">
                {/* Форма для вывода текста с сервера */}
                <textarea
                    value={responseData}
                    className="matrix-subtraction-textarea"
                    readOnly
                />
                <textarea
                    value={elapsedTime}
                    style={{paddingTop: '1%', paddingBottom: '1%', border: '1px solid #c0c0c0',
                        color: '#fff', backgroundColor: '#444444',
                        marginLeft: '3%', fontSize: '120%'}}
                    readOnly
                />
            </form>
            {imageData && (
                <div>
                    <h2>Image Result:</h2>
                    <img src={imageData} alt="Result" />
                </div>
            )}
        </div>
    );
}

export default MatrixSubtraction;
