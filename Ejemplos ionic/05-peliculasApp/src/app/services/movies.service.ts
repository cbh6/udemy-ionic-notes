import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format, endOfMonth, startOfMonth } from 'date-fns'
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: any[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>(query);
  }

  getFeature() {
    const inicio = format(startOfMonth(new Date()), 'yyyy-MM-dd');
    const fin = format(endOfMonth(new Date()), 'yyyy-MM-dd');

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() {
    this.popularesPage++;
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas(text: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/search/movie?query=${text}`);
  }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise(resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe(res => {
          this.generos = res['genres'];
          resolve(this.generos);
        });
    });
  }
}
