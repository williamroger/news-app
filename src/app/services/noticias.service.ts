import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespostaTopHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }

  getTopHeadlines() {
    return this.http.get<RespostaTopHeadLines>('https://newsapi.org/v2/top-headlines?country=br&apiKey=4bd1d9b5bc4742f48ac22e1abd36d2bd');
  }
}
