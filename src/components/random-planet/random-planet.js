import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

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
  }

  componentDidMount(){
    this.updatePlanet();
    this.interval = setInterval (this.updatePlanet, 2500);
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
    // const id = 500000000;
    this.swapi.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }
  
  render() {
    const {planet, loading, error} = this.state;
    
    const spinner = loading ? <Spinner/> : null;
    const errorBlock = error ? <ErrorIndicator/> : null;
    const planetContent = !(loading || error) ? <PlanetView planet ={planet}/> : null
    return (
      <div className="random-planet jumbotron rounded">
        {errorBlock}  
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
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div> 
    </>
  )
}