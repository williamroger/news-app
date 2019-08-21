import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Artigo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Artigo[] = [];

  constructor( private storage: Storage ) { 
    this.carregarFavoritos();
  }

  salvarNoticia(noticia: Artigo) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
  }

  async carregarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  removerNoticia(noticia: Artigo) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
  }
}
