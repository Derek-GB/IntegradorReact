import React, { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import ubicaciones from '../../../public/data/ubicaciones.json';

const FamiliaFormulario = () => {
  const [mostrarExtras, setMostrarExtras] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);

  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
  const [cantonSeleccionado, setCantonSeleccionado] = useState('');

  const canvasRef = useRef(null);
  const signaturePad = useRef(null);

  useEffect(() => {
    setProvincias(ubicaciones);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePad.current = new SignaturePad(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    if (provinciaSeleccionada) {
      const provincia = provincias.find(p => p.nombre === provinciaSeleccionada);
      setCantones(provincia?.cantones || []);
      setCantonSeleccionado('');
      setDistritos([]);
    }
  }, [provinciaSeleccionada]);

  useEffect(() => {
    if (cantonSeleccionado) {
      const canton = cantones.find(c => c.nombre === cantonSeleccionado);
      setDistritos(canton?.distritos || []);
    }
  }, [cantonSeleccionado]);

  const limpiarFirma = () => {
    signaturePad.current?.clear();
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const objeto = {};
    data.forEach((val, key) => (objeto[key] = val));
    console.log('Datos enviados:', objeto);
  };

  return (
    <form onSubmit={manejarEnvio} className="p-4">
      <h3 className="text-xl font-bold">Información Personal</h3>
      <fieldset className="mt-2">
        <label>Nombre:</label><input name="nombre" type="text" className="form-control mb-2" />
        <label>Apellido 1:</label><input name="apellido1" type="text" className="form-control mb-2" />
        <label>Apellido 2:</label><input name="apellido2" type="text" className="form-control mb-2" />
        <label>Tipo de Identificación:</label>
        <select name="tipoIdentificacion" className="form-control mb-2">
          <option>Cédula</option><option>DIMEX</option><option>Permiso laboral</option><option>Pasaporte</option><option>No presenta</option>
        </select>
        <label>Número de Identificación:</label><input name="numeroIdentificacion" type="text" className="form-control mb-2" />
        <label>Nacionalidad:</label><input name="nacionalidad" type="text" className="form-control mb-2" />
        <label>Parentesco:</label>
        <select name="parentesco" className="form-control mb-2">
          <option>Padre</option><option>Madre</option><option>Hijo</option><option>Hija</option>
        </select>
        <label>Fecha de Nacimiento:</label><input name="fechaNacimiento" type="date" className="form-control mb-2" />
        <label>Sexo:</label>
        <select name="sexo" className="form-control mb-2">
          <option>Masculino</option><option>Femenino</option><option>Otro</option>
        </select>
        <label>Género:</label>
        <select name="genero" className="form-control mb-2">
          <option>Transexual</option><option>No binario</option><option>Genero fluido</option><option>Cisgenero</option><option>Otro</option>
        </select>
        <label>Teléfono:</label>
        <input name="telefono" type="tel" className="form-control mb-2" />
        <label>Contacto de Emergencia:</label>
        <input name="contactoEmergencia" type="tel" className="form-control mb-2" />
      </fieldset>

      <h3 className="text-xl font-bold">Condiciones Especiales</h3>
      <fieldset className="mt-2">
        <label>Discapacidad:</label>
        <select name="discapacidad" className="form-control mb-2">
          <option>No</option><option>Sí</option>
        </select>
        <label>Tipo de Discapacidad:</label>
        <select name="tipoDiscapacidad" className="form-control mb-2">
          <option>Física</option><option>Sensorial</option><option>Intelectual</option><option>Mental o Psicológica</option><option>Múltiple</option>
        </select>
        <label>Condición de Salud Especial:</label>
        <select name="condicionSalud" className="form-control mb-2">
          <option>Visual</option><option>Síndrome</option><option>Esquizofrenia</option><option>Auditiva</option><option>Trans-Bipolar</option>
        </select>
      </fieldset>

      <h3 className="text-xl font-bold">Características Poblacionales</h3>
      <fieldset className="mt-2">
        <label><input type="checkbox" name="migrante" /> Migrante</label><br />
        <label><input type="checkbox" name="poblacionIndigena" /> Población Indígena</label>
      </fieldset>

      <h3 className="text-xl font-bold">Observaciones</h3>
      <textarea name="observaciones" className="form-control mb-2" placeholder="Agrega tu observación"></textarea>

      <label className="block mt-4">
        <input type="checkbox" checked={mostrarExtras} onChange={() => setMostrarExtras(!mostrarExtras)} /> Mostrar Información adicional
      </label>

      {mostrarExtras && (
        <>
          <h3 className="text-xl font-bold mt-4">Información del Albergue</h3>
          <fieldset className="mt-2">
            <label>Nombre del Albergue:</label><input name="albergueNombre" type="text" className="form-control mb-2" />
            <label>Código de Familia:</label><input name="codigoFamilia" type="text" className="form-control mb-2" placeholder="YYYY-Prov-Canton-N°Familia" />
          </fieldset>

          <h3 className="text-xl font-bold">Ubicación</h3>
          <fieldset className="mt-2">
            <label>Provincia:</label>
            <select className="form-control mb-2" name="provincia" value={provinciaSeleccionada} onChange={(e) => setProvinciaSeleccionada(e.target.value)}>
              <option value="">Seleccione</option>
              {provincias.map((prov) => (
                <option key={prov.nombre} value={prov.nombre}>{prov.nombre}</option>
              ))}
            </select>
            <label>Cantón:</label>
            <select className="form-control mb-2" name="canton" value={cantonSeleccionado} onChange={(e) => setCantonSeleccionado(e.target.value)} disabled={!cantones.length}>
              <option value="">Seleccione</option>
              {cantones.map((c) => (
                <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
            <label>Distrito:</label>
            <select className="form-control mb-2" name="distrito" disabled={!distritos.length}>
              <option value="">Seleccione</option>
              {distritos.map((distrito, index) => (
                <option key={index} value={distrito}>{distrito}</option>
              ))}
            </select>
            <label>Dirección:</label>
            <textarea name="direccion" className="form-control mb-2"></textarea>
          </fieldset>

          <h3 className="text-xl font-bold">Firma Digital</h3>
          <fieldset className="mt-2">
            <label>Firma:</label>
            <canvas ref={canvasRef} width={600} height={200} className="border mb-2"></canvas>
            <button type="button" className="btn btn-secondary" onClick={limpiarFirma}>Limpiar firma</button>
          </fieldset>
        </>
      )}

      <button type="submit" className="btn btn-primary mt-4">Guardar</button>
    </form>
  );
};

export default FamiliaFormulario;
