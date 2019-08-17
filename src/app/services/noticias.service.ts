import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespostaTopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }

  private execQuery<T>(query: string) {
    query = apiUrl + query;

    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespostaTopHeadLines>('https://newsapi.org/v2/top-headlines?country=br&apiKey=4bd1d9b5bc4742f48ac22e1abd36d2bd');

    return this.execQuery<RespostaTopHeadLines>(`/top-headlines?country=br`);
  }

  getTopHeadlineCategoria(categoria: string) {
    // return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=4bd1d9b5bc4742f48ac22e1abd36d2bd`);
    categoria = categoria.trim();
    return this.execQuery<RespostaTopHeadLines>(`/top-headlines?country=br&category=${categoria}`);
  }
}
