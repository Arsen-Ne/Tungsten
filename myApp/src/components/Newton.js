import React, { useState } from 'react';
import './GaussAndNewton.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import logoSVG from '../assets/logo.png';
function Newton() {
  const [dimension, setDimension] = useState(0);
  const [threads, setThreads] = useState(1);
  const [epsilon, setEpsilon] = useState();
  const [maxIterations, setMaxIterations] = useState();
  const [coefficients, setCoefficients] = useState([]);
  const [responseData, setResponseData] = useState('');

  const handleDimensionChange = (e) => {
    const value = e.target.value;
    const n = value === '' ? 0 : parseInt(value, 10);
    if (n >= 0) {
      if (value === '' || n === 0) {
        setDimension('');
        setCoefficients([]);
      } else {
        setDimension(n);
        setCoefficients(Array(n).fill(0));
      }
    }
  };

  const handleCoefficientsChange = (index, value) => {
    const newCoefficients = [...coefficients];
    newCoefficients[index] = value;
    setCoefficients(newCoefficients);
  };

  const handleSubmit = () => {
    let userEmail = null;
        if (localStorage.getItem('email')) {
            userEmail = localStorage.getItem('email');
        }

    fetch('http://26.108.230.233:8080/calculations/equations/newton', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coefficients: '{'+coefficients.join(',')+'}',
        threads,
        epsilonDegree: epsilon,
        maxIterations,
        email: userEmail
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        //console.log(data.solution);
        setResponseData(data.solution);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const { t } = useTranslation();
  return (
    <div>
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
      <h1 className="gaussPageHeader">Newton Method</h1>
      <div style={{marginLeft: '5%', marginTop: '2%'}}>
        <label htmlFor="dimension" className="gaussText">Dimension (n):</label>
        <input
          style={{marginLeft: '1%', paddingTop:'0.5%', paddingBottom: '0.5%', border: 'none', fontSize: '100%', color: '#c0c0c0', backgroundColor: '#444444'}}
          id="dimension"
          type="number"
          value={dimension}
          onChange={handleDimensionChange}
        />
      </div>
      {dimension > 0 && (
        <div style={{marginLeft: '5%', marginTop: '2%'}}>
          <label className="gaussText">Coefficients:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            {Array(dimension)
              .fill(0)
              .map((_, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
                  <div className="gaussText">x{index + 1}</div>
                  <input
                    className="gaussInput"
                    id={`coefficient-${index}`}
                    type="number"
                    value={coefficients[index]}
                    onChange={(e) => handleCoefficientsChange(index, e.target.value)}
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      <div style={{marginLeft: '5%', marginTop: '2%'}}>
        <label htmlFor="threads" className="gaussText">Threads:</label>
        <input
          style={{marginLeft: '1%', paddingTop:'0.5%', paddingBottom: '0.5%', border: 'none',  fontSize: '100%', color: '#c0c0c0', backgroundColor: '#444444'}}
          id="threads"
          type="text"
          value={threads}
          onChange={(e) => setThreads(parseInt(e.target.value))}
        />
      </div>
      <div style={{marginLeft: '5%', marginTop: '2%'}}>
        <label htmlFor="epsilon" className="gaussText">Epsilon:</label>
        <input
          style={{marginLeft: '1%', paddingTop:'0.5%', paddingBottom: '0.5%', border: 'none', fontSize: '100%', color: '#c0c0c0', backgroundColor: '#444444'}}
          id="epsilon"
          type="number"
          value={epsilon}
          onChange={(e) => setEpsilon(parseFloat(e.target.value))}
        />
      </div>
      <div style={{marginLeft: '5%', marginTop: '2%'}}>
        <label htmlFor="maxIterations" className="gaussText">Max Iterations:</label>
        <input
          style={{marginLeft: '1%', paddingTop:'0.5%', paddingBottom: '0.5%', border: 'none',  fontSize: '100%', color: '#c0c0c0', backgroundColor: '#444444'}}
          id="maxIterations"
          type="number"
          value={maxIterations}
          onChange={(e) => setMaxIterations(parseInt(e.target.value))}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '5%'}}>
      <button onClick={handleSubmit} className="gaussPageButton">Count</button>
      <textarea
                        value={responseData}
                        className="gaussPageTextArea"
                        readOnly
            />
            </div>
    </div>
  );
}

export default Newton;