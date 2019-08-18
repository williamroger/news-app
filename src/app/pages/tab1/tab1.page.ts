import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Artigo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Artigo[] = [];

  constructor( private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.carregarNoticias();
  }

  loadData(event) {
    console.log(event);
    this.carregarNoticias(event);
  }

  carregarNoticias(event?) {
    this.noticiasService.getTopHeadlines().subscribe(resp => {
      console.log('notícias ', resp);

      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...resp.articles);
      if (event) {
        event.target.complete();
      }
    });
  }
}
