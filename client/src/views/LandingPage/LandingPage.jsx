import React, { useState } from 'react';
import style from './LandingPage.module.css';
import { Link } from 'react-router-dom';

function Landing() {
  const [showDiv, setShowDiv] = useState(true);

  const handleClick = () => {
    // Cuando se hace clic en el botón, aplica la clase de desvanecimiento
    setShowDiv(false);

    // Espera a que se complete la animación antes de redirigir
    setTimeout(() => {
      // Redirige a la página de inicio
      window.location.href = '/home';
    }, 1500); // Ajusta el tiempo de espera según tu preferencia
  };

  return (
    <div className={style.background}>

      <div className={`${style.Container} ${showDiv ? '' : style['fade-out']}`}>
        <h1 className={style.title}>¡R3C01L Videogames!</h1>
        <h4>El sitio indicado para conocer la información</h4>
        <h4>De tu proxima aventura gaming</h4>

        <button className={style.landingPageButton} onClick={handleClick}>
          Click aquí para descubrirla
        </button>
      </div>
    </div>
  );
}

export default Landing;

