import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import logoSVG from '../assets/logo.png';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Функция для получения данных с сервера
    const fetchHistory = async () => {
      let userEmail = null;
      if (localStorage.getItem('email')) {
          userEmail = localStorage.getItem('email');
      } 

      try {
        const response = await fetch('http://26.108.230.233:8080/calculation-history/get-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: userEmail
          }),
        });
        const data = await response.json();
        setHistory(data);
        // console.log('data: ' + data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchHistory();
  }, []);

  const { t } = useTranslation();

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
      <h1 style={{color: '#fff', fontFamily: 'Cascadia Mono', fontWeight: 'lighter'}}>{t('calchistory')}</h1>
      <table style={{textAlign: 'center', marginTop: '2%', fontFamily: 'Cascadia Mono', fontWeight: 'lighter'}}>
        <thead style={{fontSize:'120%', color: '#fff'}}>
          <tr>
            <th>{t('operation')}</th>
            <th>{t('task')}</th>
            <th>{t('solution')}</th>
          </tr>
        </thead>
        <tbody style={{color: '#c0c0c0'}}>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.operationName}</td>
              <td>{item.task}</td>
              <td>{item.solution}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;