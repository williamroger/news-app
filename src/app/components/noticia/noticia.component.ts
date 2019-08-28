import { Component, OnInit, Input } from '@angular/core';
import { Artigo } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Artigo;
  @Input() index: number;
  @Input() emFavoritos;

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing,
               private datalocalService: DataLocalService,
               private platform: Platform ) { }

  ngOnInit() {
    console.log('favoritos ', this.emFavoritos);
  }

  abrirNoticia() {
    // console.log('Noticia ', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async exibirMenu() {

    let salvarDeletarBtn;

    if (this.emFavoritos) {
      salvarDeletarBtn = {
        text: 'Remover dos Favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Remover dos Favoritos');
          this.datalocalService.removerNoticia(this.noticia);
        }
      };
    } else {
      salvarDeletarBtn = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Adicionando ao favorito');
          this.datalocalService.salvarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartilhar',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Compartilhando...');

          this.compartilharNoticia();
        }
      },
      salvarDeletarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancelando...');
        }
      }]
    });
    await actionSheet.present();
  }

  compartilharNoticia() {
    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      // tslint:disable-next-line: no-string-literal
      if (navigator['share']) {
        // tslint:disable-next-line: no-string-literal
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Compartilhando...'))
          .catch((error) => console.log('Erro ao compartilhar!', error));
      } else {
        console.log('Não é possível compartilhar');
      }
    }
  }
}
