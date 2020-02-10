import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";

import Spinner from "../spinner";

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapi = new SwapiService();
  constructor(){
    super();

    this.state = {
      planet:{},
      loading: true,
      error:false
    }
    this.updatePlanet();
  }

  onPlanetLoaded = (planet)=>{
    this.setState({
      planet,
      loading: false
    });
  }

  onError = () =>{
    this.setState({ 
      error:true,
      loading:false
    })
  }
  updatePlanet=()=>{
    const id = Math.floor(Math.random()*25)+2;
    this.swapi.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.omError)
  }
  
  render() {
    const {planet, loading} = this.state;
    
    const spinner = loading ? <Spinner/> : null;
    const planetContent = !loading ? <PlanetView planet ={planet}/> : null
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {planetContent}
      </div>
    );
  }
}
const PlanetView = ({planet})=>{

  const {id, name, population, rotationPeriod,
    diameter} = planet;

  return(
    <>
      <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">{diameter}</span>
              <span>100</span>
            </li>
          </ul>
        </div> 
    </>
  )
}