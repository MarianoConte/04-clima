import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';


class App extends Component {

  state = {
    error: '',
    consulta:{},
    resultado:{}
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.consulta !== this.state.consulta){
      this.consultarApi();
    }
  }

  componentDidMount(){
    this.setState({
      error: false
    })
  }
  

  consultarApi = () =>{
    const {ciudad, pais} = this.state.consulta;

    if(!ciudad || !pais) return null;

    const appId = 'f1883183720c3e810367d3142937228e'
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    //  query con fetch api

   fetch(url)
   .then(respuesta=>{
     return respuesta.json();
   })
   .then(datos=>{
     this.setState({
       resultado: datos
     })
   })
   .catch(error => {
     console.log(error)
   })


    //leer la url y agregar la api key

    //consultar con fetch

  }

  datosConsulta = (respuesta) =>{

    if(respuesta.ciudad === '' || respuesta.pais === ''){
      this.setState({
        error: true
      })
    }

    else{
      this.setState({
        error: false,
        consulta: respuesta
      })

      
    }

  }


  render() {

    const {error} = this.state,

    {cod} = this.state.resultado;

    let resultado;
    
    if(error){
      resultado = <Error
                    mensaje = "Ambos campos son obligatorios" />
    }else if(cod === '404'){
      resultado = <Error mensaje="Ciudad no encontrada"/>
    }else{
      resultado = <Clima resultado = {this.state.resultado}/>
    }

    return (
      <div className="app">
        <Header titulo='Clima React'/>
        <Formulario 
          datosConsulta = {this.datosConsulta}

        />
        {resultado}
      </div>
    );
  }
}

export default App;
