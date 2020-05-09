import React from 'react'
import Navbar from '../../components/navbar'
import UserInfo from '../../components/info-user-bar'
import Busca from './busca'
import PostField from './post-field'
import Recomendation from '../../components/recomendation-field'
import Waypoint from '../../components/way'
import Loading from '../../imagens/Spinner.gif'
import Pencil from '../../imagens/pencil.svg'
import File from '../../imagens/file.svg'
import axios from 'axios'

class Home extends React.Component {

    state = {
        nome: '',
        idUser : '',
        photo : '',
        conteudo : '',
        recomendados : [],
        busca_content: '',
        request : [],
        way : ''
    }


    constructor() {
        super();
        this.busca = new Busca();
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

                this.setState({request: [ ...this.state.request, ...dados]})
                
                this.setState({way: <Waypoint onEnter={this.loadPage} />})

            }
        }).catch( erro => {
            console.log(erro)
        })
    }


    sair = () => {
        axios.get('http://localhost:8080/user/logoff')
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

    
    buscar = () => {

        axios.get(`http://localhost:8080/conhecimentos/busca/set?textBusca=${this.state.busca_content}`)
        .then(response => {
            this.props.history.push('/busca')
        })
        .catch(erro => {
            console.log(erro.data)
        })
            
    
    }


    render() {


        return(
            <>
            <Navbar 
            executeSair={this.sair}
            executePerfil={this.toPerfil} 
            sendTo={this.toHome}
            className="container"
            action={this.buscar}
            value={this.state.busca_content}
            change={e =>this.setState({busca_content: e})}/>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">

                        <UserInfo photo={this.state.photo} label={this.state.nome} />
                            <div className="col-md-8">
                                <div className="row search">
                                    
                                    <span className="icon-pencil">
                                        <img className="icon-pencil"  src={Pencil} alt="pencil"/>
                                    </span>

                                    <span className="icon-file">
                                        <img className="icon-pencil" src={File} alt="pencil"/>
                                     </span>
                                   <div className="text-field-size">
                                        <form id="One">
                                            <textarea onChange={e => this.setState({conteudo: e.target.value})} className="text-field field-left" placeholder="Algo que queira compartilhar ?" rows="5"cols="33"></textarea>
                                            <textarea className="text-field" placeholder="Algum conteudo que queira compartilhar ?" rows="5"cols="33"></textarea>                          
                                        </form>
                                    </div>
                                    <button onClick={this.postar} className="btn-sender">Enviar</button>
                                </div>

                                <PostField body={this.state.request} />
                           
                           
                            </div>
            
                        
                        <Recomendation body={this.state.recomendados}/>


                          

                        <img id="load" className="gif-load" src={Loading} alt="load"/>

                        <div className="way">

                            {this.state.way}
                            
                        </div>
                    </div>
                </div>
            </div>
                        

                
            </>
        )

    }


}

export default Home
