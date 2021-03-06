import React from 'react'
import Navbar from '../components/navbar'
import Busca from './Busca/busca'
import Conhecimentos from '../components/conhecimentos-field-view'
import Interesses from '../components/interesses-field-view'
import axios from 'axios'



class PerfilViewOnly extends React.Component {


    state = {
        
        id_user: '',
        photo: '',
        busca_content: '',
        description: '',
        know_request: [],
        interest_request: [],                              

    }

    constructor() {
        super();
        this.busca = new Busca();
    }


    componentDidMount() {


        this.load();       
        this.reset();
        this.scrollTop();

    }

    scrollTop = () => {
        window.scrollTo(0, 0);
    };


    load = () => {

        const usuarioID = this.props.match.params.id        

        axios.get(`http://localhost:8080/user/view/${usuarioID}`)
            .then(response => {
                const data = response.data       
                const id = response.data.id                           
              
                this.setState({ id_user: id })
                this.setState({ photo: data.photo })
                this.setState({ description: data.sobre })               
                this.loadConhecimentos(id);
                this.loadInteresses(id);
                this.format();

            })
            .catch(erro => {
                console.log(erro.data)
            })
            
    }

    reset = () => {
        this.setState({ know_request: [] })
        this.setState({ interest_request: [] })
    }

    loadConhecimentos = (value) => {


        axios.get(`http://localhost:8080/conhecimentos/buscar/conhecimentos?id=${value}`)
            .then(response => {
                const data = response.data

                this.setState({ know_request: data })

            }).catch(erro => {
                console.log(erro.data)
            })

    }

    loadInteresses = (value) => {
        

        axios.get(`http://localhost:8080/conhecimentos/buscar/interesses?id=${value}`)
            .then(response => {
                const data = response.data

                this.setState({ interest_request: data })

            }).catch(erro => {
                console.log(erro.data)
            })

    }

    format = () => {


        const data = this.state.description

        let str = data.replace(/(?:\r\n|\r|\n)/g, '<br>');

        this.setState({ description: str })

    }

    toHome = () => {
        this.props.history.push('/home')
    }

    toPerfil = () => {
        this.props.history.push('/perfil')
    }

    sair = () => {
        axios.get('http://localhost:8080/logoff')
            .then(response => {
                this.props.history.push('/login')
            }).catch(erro => {
                console.log(erro.response.data)
            })
    }


buscar = () => {

    this.props.history.push(`/busca/${this.state.busca_content}`)

   }



    render() {

        
        return (
            
            <>
      
                <div id="div-blur" className="blur">
                    <Navbar 
                    executeSair={this.sair}
                    executePerfil={this.toPerfil} 
                    sendTo={this.toHome}
                    className="container"
                    action={this.buscar}
                    value={this.state.busca_content}
                    change={e =>this.setState({busca_content: e})}/>
                    <div className="back-img"></div>
                    <div className="circle-perf">
                        <img className="img-perfil" src={this.state.photo} />
                    </div>
                    <div className="container-fluid">
                        <div className="user-space">

                            <span className="about">Sobre</span>                           
                            <br></br><br></br>
                            <div id="span-desc" dangerouslySetInnerHTML={{ __html: this.state.description }} className="descript-user"></div>

                        </div>

                        <div className="box-perf1">
                            <div className="row">
                                <div className="div-know">

                                <label className="label-know">Conhecimentos</label>                               

                                </div>
                               

                            </div>
                            <Conhecimentos body={this.state.know_request} />
                        </div>
                        <div className="box-perf2">
                            <div className="row">
                                <div className="div-interest">

                                <label className="label-interest">Interesses</label>                                

                                </div>
                                 
                            </div>
                            <Interesses body={this.state.interest_request} />
                        </div>
                    </div>
                </div>

                                

             </>
           
        )

    }

}


                


export default PerfilViewOnly