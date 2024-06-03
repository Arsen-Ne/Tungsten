import React, { useState } from 'react';
import './SignUpPage.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logoSVG from '../assets/logo.png';

const SignUpPage = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'userName':
                setUserName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        alert('CHECK YOUR EMAIL FOR CONFIRMATION');
        navigate('/');


        // Валидация полей

        const data = {
            userName,
            email,
            password,
        };

        // http://25.23.19.72:8080/signup
        fetch('http://26.108.230.233:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('Ответ сервера:', responseData);
                
                // Дополнительные действия после успешной отправки данных
                
            })
            .catch((error) => {
                console.error('Ошибка при отправке данных:', error);
            });

        setUserName('');
        setEmail('');
        setPassword('');
    };

    const { t } = useTranslation();

    return (
        <div className="registration-page">
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
            <form type="formReg" onSubmit={handleSubmit} style={{diplay: 'flex', flexDirection: 'column'}}>
                <label>
                    <input
                        type="signUpPageInput"
                        name="userName"
                        value={userName}
                        onChange={handleInputChange}
                        placeholder={t('username')}
                    />
                </label>
                
                <label>
                    <input
                        type="signUpPageInput"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder={t('email')}
                    />
                </label>
                <label>
                    <input
                        type="signUpPagePassword"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder={t('password')}
                    />
                </label>
                <div>
                <button className="signUpPageSubmit">{t('signup')}</button>
                <p type="signUpPageP">
                    {t('alreadyhave')}{' '}
                    <a type="signUpPageRef" href="/signin">
                        {t('signin')}
                    </a>
                </p>
                </div>
            </form>
        </div>

    );
};

export default SignUpPage;