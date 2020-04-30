import React from 'react'
import Navbar from '../../components/navbar'
import UserInfo from '../../components/info-user-bar'
import {withRouter} from 'react-router-dom'
import UsuarioCalls from '../../calls/userCalls'
import PostField from './post-field'
import Recomendation from '../../components/recomendation-field'
import Waypoint from '../../components/way'
import Loading from '../../imagens/Spinner.gif'
import { useEffect } from 'react';
import axios from 'axios'

class Home extends React.Component {

    state = {
        nome: '',
        idUser : '',
        photo : '',
        conteudo : '',
        recomendados : [],
        request : [],
        way : ''
    }


    constructor() {
        super();
        this.call = new UsuarioCalls();
    }



    componentDidMount(){
        

        const usuario = localStorage.getItem('usuario_atual')
        const usuarioLogado = JSON.parse(usuario)


        this.setState({nome: usuarioLogado.nome})
        this.setState({idUser: usuarioLogado.id})
        this.setState({photo: usuarioLogado.photo})  


        this.initial();
        this.loadRecomendation();

    }

    initial = () => {

        axios.get('http://localhost:8080/post/load/initial')
        .then( response => {
            this.loadPage()
        }).catch( erro => {
            console.log(erro)
        })

    }

    loadRecomendation = () => {
        axios.get('http://localhost:8080/conhecimentos/recomendados/teste')
        .then( response => {
            const dados = response.data
            this.setState({recomendados: dados})
        }).catch( erro => {
            console.log(erro)
        })
    }
  

    loadPage = () => {

        axios.get('http://localhost:8080/post/load/feed')
        .then( response => {
            const dados = response.data
            if (!dados[0].id) {
                console.log('Acabaram os dados')
                document.getElementById("load").style.display = "none";
            }
            else{

                this.setState({way: ''})

                this.setState({request: [ ... this.state.request, ... dados]})
                
                this.setState({way: <Waypoint onEnter={this.loadPage} />})

            }
        }).catch( erro => {
            console.log(erro)
        })
    }


    sair = () => {
        this.call.sair()
        .then( response => {
          this.props.history.push('/login')
        }).catch( erro => {
            console.log(erro.response.data)
        })
    }

    toPerfil = () => {
        this.props.history.push('/perfil')
    }

    toHome = () => {
        this.props.history.push('/home')
    }

    

    postar = () => {
        axios.post('http://localhost:8080/post/new', {
            conteudo: this.state.conteudo,
            id_user : this.state.idUser
        }).then( response => {
         this.setState({conteudo: ''})
         document.getElementById("One").reset();
         window.location.reload();

        }).catch( erro => {
            console.log('falha na requisição')
        })
    }



    render() {


        return(
            <>
            <Navbar executeSair={this.sair} executePerfil={this.toPerfil} className="container"/>

            <Recomendation body={this.state.recomendados}/>
            <UserInfo label={this.state.nome} />

                <div className="divShare">
                        <form id="One">
                            <input onChange={e => this.setState({conteudo: e.target.value})} className="inputShare-one" placeholder="  algo que queira Compartilhar ?"  />
                            <input className="inputShare-two" placeholder="      algum Conteúdo ?" />
                         </form>
                    <button onClick={this.postar} className="btn-sender">Enviar</button>
                </div>
                
                <br></br>

               <PostField body={this.state.request} />

               <img id="load" className="gif-load" src={Loading}/>

               <div className="way">

                {this.state.way}
                   
               </div>
                

                
            </>
        )

    }


}

export default Home
