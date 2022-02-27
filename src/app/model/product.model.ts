export interface Product{
  ArticleID:number;
  articleNom:string;
  ArticleDescription:string;
  ArticlePrice:number;
  promotion:boolean;
  selected:boolean;
  available:boolean;
  articleImage:string;
  quantity:number;
  rateTva:number;
  rateDiscount:number;

  _links:{
    self:{
      href:string;
    },
    article:{
      href:string;
    },
    category:{
      href:string
    },
    pharmacie:{
      href:string
    },
    source:{
      href:string
    },
    fournisseur:{
      href:string
    }
  }

}