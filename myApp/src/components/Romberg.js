import React, { useState } from 'react';
import './Romberg.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import logoSVG from '../assets/logo.png';
function Romberg() {

    const [func, setFunc] = useState('');
    const [start, setStart] = useState('');
    const [stop, setStop] = useState('');
    const [n, setN] = useState('');
    const [tolerance, setTolerance] = useState('');
    const [responseData, setResponseData] = useState('');
    

    const handleFuncChange = (event) => {
        setFunc(event.target.value);
    };

    const handleStartChange = (event) => {
        setStart(event.target.value);
    };

    const handleStopChange = (event) => {
        setStop(event.target.value);
    };

    const handleNChange = (event) => {
        setN(event.target.value);
    };

    const handleToleranceChange = (event) => {
        setTolerance(event.target.value);
    }

    const sendDataToServer = async () => {
        let userEmail = null;
        if (localStorage.getItem('email')) {
            userEmail = localStorage.getItem('email');
        }

        try {
            const response = await fetch(
                'http://26.108.230.233:8080/calculations/integrals/romberg',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        function: func,
                        start: start,
                        stop: stop,
                        n: n,
                        toleranceDegree: tolerance,
                        email: userEmail
                    }), // Отправка данных на сервер
                }
            );

            const data = await response.json(); // Преобразование ответа в JSON формат

            setResponseData(data.result); // Установка полученного ответа в состояние responseData
        } catch (error) {
            console.error('Ошибка:', error);
        } 
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        sendDataToServer();
    };
    const { t } = useTranslation();
    return (
        <div className="romberg-container">
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
            <h1 className="rombergHeader">Romberg Method</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <p className="rombergText">Function:</p>
                <input
                    className="rombergFuncInput"
                    value={func}
                    onChange={handleFuncChange}
                />
                </div>
                <div className="romberg-subcontainer">
                <div>
                <p className="rombergText1">Start:</p>
                <input
                    className="rombergSubInput"            
                    value={start}
                    onChange={handleStartChange}
                />
                </div>
                <div>
                <p className="rombergText1">Stop:</p>
                <input
                    className="rombergSubInput"            
                    value={stop}
                    onChange={handleStopChange}
                />
                </div>
                <div>
                <p className="rombergText1">Iterations:</p>
                <input
                    className="rombergSubInput"            
                    value={n}
                    onChange={handleNChange}
                />
                </div>
                <div>
                    <p className="rombergText1">Tolerance:</p>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p className="rombergText1">10 ^ - </p>
                        <input
                            className="rombergFuncInput"            
                            value={tolerance}
                            onChange={handleToleranceChange}
                        />
                    </div>
                </div>
                </div>
                <button type="submit" className="rombergButton">Count</button>
                
            </form>
            <textarea
                    value={responseData}
                    className="romberg-textarea"
                    readOnly
            />
            </div>
    );
}

export default Romberg;