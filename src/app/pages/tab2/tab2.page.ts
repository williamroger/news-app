import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Artigo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Artigo[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.carregarNoticias(this.categorias[0]);
  }

  alterarCategoria(event) {
    this.noticias = [];
    this.carregarNoticias(event.detail.value);
  }

  carregarNoticias(categoria: string) {
    this.noticiasService.getTopHeadlineCategoria(categoria)
      .subscribe(resp => {
        console.log(resp);
        this.noticias.push(...resp.articles);
      });
  }
}
