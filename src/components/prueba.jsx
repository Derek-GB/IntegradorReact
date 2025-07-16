import React, { useEffect, useState } from 'react';
import axios from 'axios';
import customAxios from '../helpers/customAxios';
import { useNavigate } from 'react-router-dom';

const Prueba = () => {

    return (
        <>
            <div className="header">
                <h2>Registro Mascotas</h2>
                <button className="btn-header">
                    <span className="material-icons">arrow_back</span>
                </button>
            </div>

            <div className="formPreFormulario main-content">

                <div className="divAgrupado">
                    <fieldset className="fieldsetRegistroUSuario1 mt-2">
                        <div className="datosUsuario">
                            <div className="datoUsuario">
                                <label>Id Familia:</label>
                                <input name="identificacion" required />
                            </div>

                            <div className="datoUsuario">

                                {/* <label>Número de Teléfono:</label>
                                <input name="numero" required /> */}


                            </div>

                            <div className="datoUsuario">

                                {/* vacio */}
                               
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="fieldsetRegistroUSuario2 mt-2">
                    

                        <div className="datosUsuario">

                            <div className="datoUsuario">
                                <label>Nombre :</label>
                                <input name="nombre" required />


                            </div>

                            <div className="datoUaurio">
                                <label>Tamaño:</label>
                                <select name="tamano" required>
                                    <option value="">Seleccione un tamaño</option>
                                    <option value="admin">Grande</option>
                                    <option value="editor">Mediano</option>
                                    <option value="viewer">Pequeño</option>
                                </select>


                            </div>

                            <div className="datoUsuario">
                                {/* campo vacio */}

                                <button type="submit" className="btn btn-primary mt-3">Registrar</button>

                            </div>



                        </div>

                    </fieldset>

                    <fieldset className="fieldsetRegistroUSuario1 mt-2">

                        <div className="datosUsuario">
                            <div className="datoUsuario">

                                <label>Tipo de mascota:</label>
                                <select name="Tipo" required>
                                    <option value="">Seleccione tipo</option>
                                    <option value="">Perro</option>
                                    <option value="">Gatos</option>
                                    <option value="">Roedores</option>
                                    <option value="">Aves</option>
                                </select>


                            </div>
                            <div className="datoUsuario">
                                {/* campo vacio */}
                            </div>
                            <div className="datoUsuario">
                                {/*  campo vacio  */}
                            </div>
                        </div>
                    </fieldset>
                </div>




                <fieldset className="mt-2">

                    <div className="datosUsuario">

                        <div className="datoUsuario">
                            
                        </div>

                    </div>
                </fieldset>

            </div>

        </>

    );
};

export default Prueba;