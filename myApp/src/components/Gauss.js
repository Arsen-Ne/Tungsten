import React, { useState } from 'react';
import './GaussAndNewton.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import logoSVG from '../assets/logo.png';

function Gauss() {
  const { t } = useTranslation();
  const [dimension, setDimension] = useState(0);
  const [threads, setThreads] = useState(1);
  const [language, setLanguage] = useState('Java');
  const [coefficients, setCoefficients] = useState([]);
  const [constants, setConstants] = useState([]);
  const [responseData, setResponseData] = useState('');

  const handleDimensionChange = (e) => {
    const value = e.target.value;
    const n = value === '' ? 0 : parseInt(value, 10);
    if (n >= 0) {
      if (value === '' || n === 0) {
        setDimension('');
        setCoefficients([]);
        setConstants([]);
      } else {
        setDimension(n);
        setCoefficients(new Array(n).fill(0).map(() => new Array(n).fill(0)));
        setConstants(new Array(n).fill(0));
      }
    }
  };

  const handleThreadsChange = (e) => {
    setThreads(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCoefficientChange = (rowIndex, colIndex, value) => {
    const newCoefficients = [...coefficients];
    newCoefficients[rowIndex][colIndex] = parseFloat(value);
    setCoefficients(newCoefficients);
  };

  const handleConstantChange = (rowIndex, value) => {
    const newConstants = [...constants];
    newConstants[rowIndex] = parseFloat(value);
    setConstants(newConstants);
  };

  const handleSubmit = () => {
    let userEmail = null;
        if (localStorage.getItem('email')) {
            userEmail = localStorage.getItem('email');
        }

    const coefficientsString = coefficients.map((row) => `{${row.join(',')}}`).join(',');
    const constantsString = `{${constants.join(',')}}`;

    fetch('http://26.108.230.233:8080/calculations/equations/gauss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coefficients: coefficientsString,
        constants: constantsString,
        threads,
        language,
        email: userEmail
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        //console.log(data);
        setResponseData(data.solution);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{}}>
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
      <h1 className="gaussPageHeader">Gauss Method</h1>
      <div style={{marginLeft: '5%', marginTop: '2%'}}>
        <label htmlFor="language" className="gaussText">Language:</label>
        <select style={{marginLeft: '1%', border: 'none', borderRadius: '5px',  color: '#fff', backgroundColor: '#444444', paddingTop: '0.5%', paddingBottom: '0.5%'}} id="language" value={language} onChange={handleLanguageChange}>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
        </select>
      </div>
      <div style={{marginLeft: '5%', marginTop: '2%'}}>
        <label htmlFor="dimension" className="gaussText">Dimension (n):</label>
        <input
          style={{marginLeft: '1%', paddingTop:'0.5%', paddingBottom: '0.5%', border: 'none', fontSize: '100%', color: '#c0c0c0', backgroundColor: '#444444'}}
          type="number"
          id="dimension"
          value={dimension}
          onChange={handleDimensionChange}
        //   min="1"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div style={{marginLeft: '5%', marginTop: '2%'}}>
        <label htmlFor="threads" className="gaussText">Threads:</label>
        <input
          style={{marginLeft: '1%', paddingTop:'0.5%', paddingBottom: '0.5%', border: 'none', fontSize: '100%', color: '#c0c0c0', backgroundColor: '#444444'}}
          type="text"
          id="threads"
          value={threads}
          onChange={handleThreadsChange}
        //   min="1"
        />
      </div>
      
      {dimension > 0 && (
        <table style={{marginLeft: '5%', marginTop: '2%'}}>
          <thead>
            <tr>
              {Array.from({ length: dimension }, (_, i) => i + 1).map((col) => (
                <th className="gaussText" key={col}>x{col}</th>
              ))}
              <th className="gaussText">Constant</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: dimension }, (_, i) => i + 1).map((row) => (
              <tr  key={row}>
                {Array.from({ length: dimension }, (_, j) => j + 1).map((col) => (
                  <td key={`${row}-${col}`}>
                    <input
                      className="gaussInput"
                      type="number"
                      value={coefficients[row - 1][col - 1]}
                      onChange={(e) =>
                        handleCoefficientChange(row - 1, col - 1, e.target.value)
                      }
                    />
                  </td>
                ))}
                <td>
                  <input
                    className="gaussInput"
                    type="number"
                    value={constants[row - 1]}
                    onChange={(e) => handleConstantChange(row - 1, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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

export default Gauss;