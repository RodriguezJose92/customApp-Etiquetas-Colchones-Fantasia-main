export interface ProductTagTable {
  id: string;
  idTag: string;
  active: boolean;
  dateInit: Date;
  dateEnd: Date;
  tagText: TagText;
  imgTag: string;
  isImgUse: boolean;
  deleteItem: string;
  modifyItem: string;
  endInDate:boolean
}

interface TagText {
  textTag: string;
  sizeFontTag: string;
  colorTag: string;
  colorTextTag: string;
}
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

export interface ResultDeleteItem {
  deleteProductTagCustom: IsDelete
}
interface IsDelete {
  isDelete: boolean
}
export interface ProductContext{
  loadingItem: boolean;
  product: Product;
  selectedItem: SelectedItem;
  selectedQuantity: number;
  skuSelector: SkuSelector;
  buyButton: BuyButton;
  assemblyOptions: AssemblyOptions;
}

interface AssemblyOptions {
  items: Items;
  inputValues: Items;
  areGroupsValid: Items;
}

interface Items {
}

interface BuyButton {
  clicked: boolean;
}

interface SkuSelector {
  selectedImageVariationSKU?: any;
  isVisible: boolean;
  areAllVariationsSelected: boolean;
}

interface SelectedItem {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  variations: Property[];
  referenceId: ReferenceId2[];
  measurementUnit: string;
  unitMultiplier: number;
  images: Image[];
  __typename: string;
  sellers: Seller[];
}

interface Product {
  cacheId: string;
  productId: string;
  description: string;
  productName: string;
  productReference?: any;
  linkText: string;
  brand: string;
  brandId: number;
  link: string;
  categories: string[];
  categoryId: string;
  priceRange: PriceRange;
  specificationGroups: SpecificationGroup[];
  skuSpecifications: SkuSpecification[];
  productClusters: ProductCluster[];
  clusterHighlights: any[];
  properties: Property[];
  __typename: string;
  items: Item[];
  selectedProperties?: any;
  rule?: any;
  sku: Sku;
}

interface Sku {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  variations: Property[];
  referenceId: ReferenceId2;
  measurementUnit: string;
  unitMultiplier: number;
  images: Image[];
  __typename: string;
  sellers: Seller[];
  seller: Seller;
  image: Image;
}

interface ReferenceId2 {
  Key: string;
  Value?: any;
  __typename: string;
}

interface Item {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  variations: Property[];
  referenceId: ReferenceId[];
  measurementUnit: string;
  unitMultiplier: number;
  images: Image[];
  __typename: string;
  sellers: Seller[];
}

interface Seller {
  sellerId: string;
  sellerName: string;
  sellerDefault: boolean;
  __typename: string;
  commertialOffer: CommertialOffer;
}

interface CommertialOffer {
  discountHighlights: any[];
  teasers: any[];
  Price: number;
  ListPrice: number;
  Tax: number;
  taxPercentage: number;
  spotPrice: number;
  PriceWithoutDiscount: number;
  RewardValue: number;
  PriceValidUntil: string;
  AvailableQuantity: number;
  __typename: string;
  Installments: Installment[];
}

interface Installment {
  Value: number;
  InterestRate: number;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  Name: string;
  PaymentSystemName: string;
  __typename: string;
}

interface Image {
  cacheId: string;
  imageId: string;
  imageLabel: string;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  __typename: string;
}

interface ReferenceId {
  Key: string;
  Value?: string;
  __typename: string;
}

interface Property {
  name: string;
  values: string[];
  __typename: string;
}

interface ProductCluster {
  id: string;
  name: string;
  __typename: string;
}

interface SkuSpecification {
  field: Field;
  values: Field[];
  __typename: string;
}

interface Field {
  name: string;
  originalName: string;
  __typename: string;
}

interface SpecificationGroup {
  name: string;
  originalName: string;
  specifications: Specification[];
  __typename: string;
}

interface Specification {
  name: string;
  originalName: string;
  values: string[];
  __typename: string;
}

interface PriceRange {
  sellingPrice: SellingPrice;
  listPrice: SellingPrice;
  __typename: string;
}

interface SellingPrice {
  highPrice: number;
  lowPrice: number;
  __typename: string;
}