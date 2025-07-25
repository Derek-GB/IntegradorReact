import React, { useState } from 'react';
import Carnes from '../components/carne';
import Proteinas from '../components/Proteinas';
import Verduras from '../components/Verduras';
import Olores from '../components/Olores';
import Abarrotes from '../components/Abarrotes';
import Limpieza from '../components/Limpieza';
import ResumenParcial from './abastecimiento/resumenParcial';
import ResumenFinal from './abastecimiento/ResumenFinal';
import '../styles/formAbasteci.css';
import { Modal, Box, Button, Typography } from '@mui/material';

const FormularioAbastecimiento = () => {
  const [openResumenParcial, setOpenResumenParcial] = useState(false);
  const [openResumenFinal, setOpenResumenFinal] = useState(false);
  const [seccionAbierta, setSeccionAbierta] = useState('');

  const handleOpenResumenParcial = () => {
    setOpenResumenParcial(true);
  };

  const handleOpenResumenFinal = () => {
    setOpenResumenFinal(true);
  };

  const handleCloseResumenParcial = () => {
    setOpenResumenParcial(false);
  };

  const handleCloseResumenFinal = () => {
    setOpenResumenFinal(false);
  };

  const manejarAbrirSeccion = (nombreSeccion) => (event) => {
    event.preventDefault();
    setSeccionAbierta(prev => (prev === nombreSeccion ? '' : nombreSeccion));
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  return (
    <div className="contenedor-formulario">
      <h1 className="titulo-formulario">Formulario de Abastecimiento</h1>
      <div className="form-seccion">
        <Carnes 
          abierto={seccionAbierta === 'Carnes'} 
          alAbrir={manejarAbrirSeccion('Carnes')} 
        />
        <Proteinas 
          abierto={seccionAbierta === 'Proteinas'} 
          alAbrir={manejarAbrirSeccion('Proteinas')} 
        />
        <Verduras 
          abierto={seccionAbierta === 'Verduras'} 
          alAbrir={manejarAbrirSeccion('Verduras')} 
        />
        <Olores 
          abierto={seccionAbierta === 'Olores'} 
          alAbrir={manejarAbrirSeccion('Olores')} 
        />
        <Abarrotes 
          abierto={seccionAbierta === 'Abarrotes'} 
          alAbrir={manejarAbrirSeccion('Abarrotes')} 
        />
        <Limpieza 
          abierto={seccionAbierta === 'Limpieza'} 
          alAbrir={manejarAbrirSeccion('Limpieza')} 
        />
      </div>
      <div className="botones-formulario">
        <button onClick={handleOpenResumenParcial} className="btn-resumen">
          Ver Resumen Parcial
        </button>
        <button onClick={handleOpenResumenFinal} className="btn-resumen-final">
          Ver Resumen Final
        </button>
      </div>

      <Modal open={openResumenParcial} onClose={handleCloseResumenParcial}>
        <Box sx={modalStyle}>
          <ResumenParcial onVerResumenFinal={handleOpenResumenFinal} />
          <Button onClick={handleCloseResumenParcial} variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>

      <Modal open={openResumenFinal} onClose={handleCloseResumenFinal}>
        <Box sx={modalStyle}>
          <ResumenFinal />
          <Button onClick={handleCloseResumenFinal} variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default FormularioAbastecimiento;