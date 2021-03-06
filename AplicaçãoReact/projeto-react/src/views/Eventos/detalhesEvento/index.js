import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCornerDownLeft } from 'react-icons/fi';
import Navbar from '../../../components/navbar'
import api from '../../../services/api';
import '../css-evento.css';
import Convidado from './Convidados/convidado';
import CadastroConvidado from './Convidados/cadastroConvidado';

export default function DetalhesEvento() {

    const [eventoDeta, setEventoDet] = useState([]);
    const id = localStorage.getItem("codigo");

    useEffect(() => {
        api.get(`/eventos/${id}`).then(response => {
            setEventoDet(response.data);

        })
    });
    return (
        <>
            <Navbar className="container" />
            <div className="body">
                
                <div className=" form-detalhe-event ">
                
                    <Link className="botaoVoltar" to="/listarEvento"><FiCornerDownLeft /></Link>
                    <h3 className="text-h1">Detalhes do evento</h3>

                    <table className=" table ">

                        <tbody key={eventoDeta.codigo}>
                            <tr >
                                <th scope="row " >Nome</th>
                                <td className="col-sm-7">{eventoDeta.nome}</td>
                            </tr>

                            <tr>
                                <th scope="row">Local</th>
                                <td>{`${eventoDeta.logradouro} Nº ${eventoDeta.complemento} - ${eventoDeta.bairro} - ${eventoDeta.localidade} - ${eventoDeta.uf}`}</td>
                            </tr>
                            <tr>
                                <th scope="row">Data</th>
                                <td>{eventoDeta.data}</td>
                            </tr>
                            <tr>
                                <th scope="row">Horario</th>
                                <td>{eventoDeta.horario}</td>
                            </tr>
                            <tr>
                                <th scope="row">Descrição</th>
                                <td>{eventoDeta.descricao}</td>
                            </tr>
                        </tbody>
                    </table>




                </div>
                <div className="modal-position">
                    <CadastroConvidado />
                    <Convidado />
                </div >
            </div>


        </>
    );

}