import React, { useState } from 'react';
import './SignInPage.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logoSVG from '../assets/logo.png';

const SignInPage = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChange = (event) => {
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        fetch('http://26.108.230.233:8080/authorization/signin', {
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
                alert('HELLO, ' + responseData.userName);
                
                // Дополнительные действия после успешной отправки данных
                const username = responseData.userName;
                const userEmail = responseData.email;
                localStorage.setItem('username', username);
                localStorage.setItem('email', userEmail);

                navigate('/');
                setIsLoggedIn(true);
                
            })
            .catch((error) => {
                console.error('Ошибка при отправке данных:', error);
            });

        setEmail('');
        setPassword('');
    };

    const { t } = useTranslation();

    return (
        <div className="authpage">
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
            
            <form type="formAuth" onSubmit={handleSubmit}>
                <label>
                    <input
                        type="signInPageInput"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder={t('email')}
                    />
                </label>
                <br />
                <label>
                    <input
                        type="signInPagePassword"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder={t('password')}
                    />
                </label>
                <br />
                
                <button className="signInPageSubmit">{t('signin')}</button>
                <p type="signInPageP2">
                    {t('donthave')}{' '}
                    <a type="signInPageRef2" href="/signup">
                        {t('signup')}
                    </a>
                </p>
            </form>
            
        </div>
    );
};

export default SignInPage;

