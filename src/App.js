import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function JuegoContador() {
  const [contador, setContador] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(5);
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [puntajeMaximo, setPuntajeMaximo] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState('inicial'); // 'inicial', 'preparacion', 'juego', 'final'
  const [mensaje, setMensaje] = useState('');
  const intervaloRef = useRef(null);

  const iniciarJuego = () => {
    clearInterval(intervaloRef.current);
    setContador(0);
    setJuegoActivo(false);
    setTiempoRestante(5);
    setEstadoJuego('preparacion');
    setMensaje('Preparados');

    setTimeout(() => setMensaje('Listos'), 1000);
    setTimeout(() => setMensaje('Ya'), 2000);
    setTimeout(() => {
      setMensaje('');
      setEstadoJuego('juego');
      setJuegoActivo(true);
      iniciarTemporizador();
    }, 3000);
  };

  const iniciarTemporizador = () => {
    intervaloRef.current = setInterval(() => {
      setTiempoRestante((prevTiempo) => {
        if (prevTiempo <= 1) {
          clearInterval(intervaloRef.current);
          finalizarJuego();
          return 0;
        }
        return prevTiempo - 1;
      });
    }, 1000);
  };

  const finalizarJuego = () => {
    setJuegoActivo(false);
    setEstadoJuego('final');
    if (contador > puntajeMaximo) {
      setPuntajeMaximo(contador);
    }
  };

  const manejarClick = () => {
    if (juegoActivo && tiempoRestante > 0) {
      setContador((prevContador) => prevContador + 1);
    }
  };

  const renderContenido = () => {
    if (estadoJuego === 'inicial') {
      return (
        <div className="inicio">
          <h1>JuegoContador</h1>
          <button className="btn-iniciar" onClick={iniciarJuego}>
            Iniciar Juego
          </button>
        </div>
      );
    } else if (estadoJuego === 'preparacion') {
      return <h3 className="mensaje">{mensaje}</h3>;
    } else if (estadoJuego === 'juego') {
      return (
        <div>
          <h2>Tiempo Restante: {tiempoRestante}s</h2>
          <h2>Clicks: {contador}</h2>
          <button className="btn-juego" onClick={manejarClick}>
            ¡Click!
          </button>
        </div>
      );
    } else if (estadoJuego === 'final') {
      return (
        <div>
          <h2>Juego Terminado</h2>
          <h2>Puntaje Final: {contador}</h2>
          <h2>Récord: {puntajeMaximo}</h2>
          <button className="btn-iniciar" onClick={iniciarJuego}>
            Reiniciar Juego
          </button>
        </div>
      );
    }
  };

  useEffect(() => {
    return () => clearInterval(intervaloRef.current);
  }, []);

  return <div className="container">{renderContenido()}</div>;
}

export default JuegoContador;
