import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../../../../services/api';
import '../../css-evento.css';
import Downlaod from '../../../../components/download-teste'


export default function Convidado() {
    const id = localStorage.getItem("codigo");
    const [convidados, setConvidados] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        api.get(`/convidado/${id}`).then(response => {
            setConvidados(response.data);

        })
    });
    return (
        <div>
            <button className="button-modal-list" onClick={() => setIsModalVisible(true)}>Visualizar lista</button>
            {isModalVisible ?
                <div className="modal-cad">
                    <div className="container-modal">
                        <FiX className="close" onClick={() => setIsModalVisible(false)} />
                        <Downlaod />
                        <span id="span"></span>

                        <table className="container container-cad-conv" >
                            <thead>
                                <tr>
                                    <th>Nome Convidado</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            {convidados.map(convidado => (

                                <tbody key={convidado.id}>
                                    <tr>
                                        <td>{convidado.nomeConvidado}</td>
                                        <td>{convidado.email}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>

                    </div></div>
                : null}
        </div>
    );
}


