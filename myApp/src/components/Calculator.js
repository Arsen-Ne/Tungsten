import React, { useState } from 'react';
import './Calculator.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import logoSVG from '../assets/logo.png';

function Calculator() {
  const { t } = useTranslation();
    const [expression, setExpression] = useState('');

    const handleButtonClick = (value) => {
        setExpression(expression + value);
    };

    const handleDelete = () => {
        setExpression(expression.slice(0, -1));
    };

    const sendDataToServer = async () => {
        let userEmail = null;
        if (localStorage.getItem('email')) {
            userEmail = localStorage.getItem('email');
        }

        try {
            const response = await fetch(
                'http://26.108.230.233:8080/calculations/calculator',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        expression: expression,
                        email: userEmail
                    }), // Отправка данных на сервер
                }
            );

            const data = await response.json(); // Преобразование ответа в JSON формат

            setExpression(data.result); // Установка полученного ответа в состояние responseData
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        sendDataToServer();
    };


    return (
        <div className="calculator-container">
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
          <div className="calculator-form">
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="calculator-input"
              placeholder="Enter"
            />
            
          </div>
          <div className="calculator-buttons">
            <div className="button-group">
              {[1, 2, 3, '+'].map((value) => (
                <button
                  key={value}
                  onClick={() => handleButtonClick(value.toString())}
                  className="calculator-button"
                >
                  {value}
                </button>
              ))}
              <button onClick={() => handleDelete()} className="calculator-button">
              ←
              </button>
            </div>
            <div className="button-group">
              {[4, 5, 6, '-', '('].map((value) => (
                <button
                  key={value}
                  onClick={() => handleButtonClick(value.toString())}
                  className="calculator-button"
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="button-group">
              {[7, 8, 9, '*', ')'].map((value) => (
                <button
                  key={value}
                  onClick={() => handleButtonClick(value.toString())}
                  className="calculator-button"
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="button-group">
              {['.', 0, '^', '/'].map((value) => (
                <button
                  key={value}
                  onClick={() => handleButtonClick(value.toString())}
                  className="calculator-button"
                >
                  {value}
                </button>
              ))}
              <button onClick={handleSubmit} className="calculate-button">
              =
              </button>
            </div>
          </div>
        </div>
    );
}

export default Calculator;