
export interface ProductTagQuery {
  idTag: string;
  urlImg: string;
  isImgUse: boolean;
  textTag: string;
  colorTag: string;
  sizeFontTag: string;
  dateInit: string;
  dateEnd: string;
  endInDate: boolean;
  active: boolean;
  id: string;
  colorTextTag:string
}

export interface ProductTagDeleteQuery {
  status: number
  data: ProductErrors
}
interface ProductErrors {
  Errors
}
export interface ProductTagCreateQuery {
  Id: string;
  Href: string;
  DocumentId: string;
}