import { Country } from "../interfaces/country.interface";
import { RestCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static mapFromRestCountryToCountry(restCountry: RestCountry): Country {
    return {
      capital: restCountry.capital?.join(", "),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? restCountry.name.common,
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
    };
  }

  static mapFromRestCountryArrayToCountryArray(restCountries: RestCountry[]): Country[] {
    return restCountries.map(this.mapFromRestCountryToCountry);
  }
}
