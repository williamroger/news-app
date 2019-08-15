export interface RespostaTopHeadLines {
  status: string;
  totalResults: number;
  articles: Artigo[];
}

export interface Artigo {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}