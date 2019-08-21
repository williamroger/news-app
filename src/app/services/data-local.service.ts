import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Artigo } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Artigo[] = [];

  constructor( private storage: Storage,
               private toastCtrl: ToastController ) {

    this.carregarFavoritos();
  }

  salvarNoticia(noticia: Artigo) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Adicionado aos Favoritos!');
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
    this.presentToast('Removido dos Favoritos!');
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
}
