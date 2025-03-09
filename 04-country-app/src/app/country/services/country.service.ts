import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly queryCacheCapital = new Map<string, Country[]>();
  private readonly queryCacheCountry = new Map<string, Country[]>();
  private readonly queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const url = `${API_URL}/capital/${query}`;
    query = query.toLowerCase();
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http
      .get<RestCountry[]>(url)
      .pipe(
        map(resp => CountryMapper.mapFromRestCountryArrayToCountryArray(resp)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError((err) => {
          console.log('Error fetching', err);
          return throwError(()=> new Error(`No se pudo obtener paises con esa query: ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;
    query = query.toLowerCase();
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http
      .get<RestCountry[]>(url)
      .pipe(
        map(resp => CountryMapper.mapFromRestCountryArrayToCountryArray(resp)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
        catchError((err) => {
          console.log('Error fetching', err);
          return throwError(()=> new Error(`No se pudo obtener paises con esa query: ${query}`));
        })
      );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http
      .get<RestCountry[]>(url)
      .pipe(
        map(resp => CountryMapper.mapFromRestCountryArrayToCountryArray(resp)),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError((err) => {
          console.log('Error fetching', err);
          return throwError(()=> new Error(`No se pudo obtener paises con esa region: ${region}`));
        })
      );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RestCountry[]>(url).pipe(
        map(resp => CountryMapper.mapFromRestCountryArrayToCountryArray(resp)),
        map(countries => countries.at(0)),
        catchError((err) => {
          console.log('Error fetching', err);
          return throwError(()=> new Error(`No se pudo obtener paises con esa codigo: ${code}`));
        })
      );
  }
}
