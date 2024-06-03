import React from 'react';
import { Link } from 'react-router-dom';
import './Calculations.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import logoSVG from '../assets/logo.png';

function Calculations() {
    const { t } = useTranslation();
    return (
        <div className="calculations-container">

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
            

            <div className="form-container">              

            

                <div className="dropdown">
                    <button class="dropbtn"><h2 class="h2Calc">{t('vectors')} :</h2></button>
                    <div class="dropdown-content"> 
                        <Link className="link" to="/vectorpage">
                            {t('twovectors')}
                        </Link>
                        <br></br>
                        <Link className="link" to="/vectorsecondpage">
                            {t('onevector')}
                        </Link>
                        <br></br>
                        <Link className="link" to="/vectormodule">
                            {t('vectormod')}
                        </Link>
                </div>
                </div>

                 <div className="dropdown">
                 <button class="dropbtn">  <h2 class="h2Calc">{t('arithmetics')} :</h2></button>
                 <div class="dropdown-content"> 
                    <Link className="link" to="/calculator">
                        {t('calculator')}
                    </Link>
                    <br></br>
                    <Link className="link" to="/converter">
                        {t('converter')}
                    </Link>
                    
                </div>
                </div>

                <div className="dropdown">
                 
                <button class="dropbtn"> <h2 class="h2Calc">{t('equations')} :</h2></button>
                <div class="dropdown-content"> 
                    <Link className="link" to="/gauss">
                        {t('gauss')}
                    </Link>
                    <br></br>
                    <Link className="link" to="/newton">
                        {t('newton')}
                    </Link>
                </div>
                </div>

                <div className="dropdown">
                 <button class="dropbtn"><h2 class="h2Calc">{t('matrices')} :</h2></button>
                 <div class="dropdown-content"> 
                    <Link className="link" to="/matrixtranspose">
                        {t('transpose')}
                    </Link>
                    <br></br>
                    <Link className="link" to="/matrixmultiplication">
                        {t('multiplication')}
                    </Link>
                    <br></br>
                    <Link className="link" to="/matrixaddition">
                        {t('addition')}
                    </Link>
                    <br></br>
                    <Link className="link" to="/matrixsubtraction">
                        {t('subtraction')}
                    </Link>
                    <br></br>
                    <Link className="link" to="/scalarmultiplication">
                        {t('scalarmult')}
                    </Link>
                    </div>
                </div>

                <div className="dropdown">
                 <button class="dropbtn"><h2 class="h2Calc">{t('integrals')} :</h2></button>
                 <div class="dropdown-content">
                    <Link className="link" to="/trapezoidal">
                        {t('trap')}
                    </Link>
                    <br></br>
                    <Link className="link" to="/simpson">
                        {t('simpson')}
                    </Link>
                    <br></br>
                    <Link className="link" to="/romberg">
                        {t('romberg')}
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculations;
