import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Artigo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Artigo[] = [];

  constructor( private storage: Storage ) { }

  salvarNoticia(noticia: Artigo) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
  }

  carregarFavoritos() {

  }
}
