export default class SwapiService {

  _apiBase = 'https://swapi.co/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._destructPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._destructPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._destructPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._destructPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._destructStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._destructStarship(starship);
  }

  _extractId(item){
    const regExp = /\/([0-9]*)\/$/;
    return item.url.match(regExp)[1];
  }

  _destructPlanet(planet){
    return{
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter:planet.diameter
    }
  }

  _destructStarship(starship){
    return{
      id:this._extractId(starship),
      name:starship.name,
      model:starship.model,
      manufacturer:starship.manufacturer,
      cocstInCredits:starship.cocstInCredits,
      length:starship.length,
      crew:starship.crew,
      passengers:starship.passengers,
      cargoCapacity:starship.cargoCapacity
    }
  }

  _destructPerson(person){
    return{
      id:this._extractId(person),
      name:person.name,
      gender:person.gender,
      birthYear:person.birthYear,
      eyeColor:person.eyeColor
    }
  }
}
