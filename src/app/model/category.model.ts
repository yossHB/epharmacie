export interface Category{
  categoryid:number;
  categoryNom:string;
  articles:JSON;
  _links:{
    self:{
      href:string;
    },
    category:{
      href:string
    },
    Articles:{
      href:string;
    }
  }
}