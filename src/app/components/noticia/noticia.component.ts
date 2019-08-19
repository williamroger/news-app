import { Component, OnInit, Input } from '@angular/core';
import { Artigo } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Artigo;
  @Input() index: number;

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing ) { }

  ngOnInit() {}

  abrirNoticia() {
    // console.log('Noticia ', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async exibirMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartilhar',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Compartilhando...');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Adicionando ao favorito');
        }
      }, {
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
}
