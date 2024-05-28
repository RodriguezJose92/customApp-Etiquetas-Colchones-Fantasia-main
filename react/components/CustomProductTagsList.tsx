import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import GET_PRODUCT_TAG_CUSTOM from './graphql/query.getProductTagCustom.graphql'
import { ProductContext, ProductTagQuery } from '../typings/type';
import { useQuery } from 'react-apollo';
const CSS_HANDLES = [
    "tag__content",
    "tag__content_list",
    "tag__content_img",
    "tag__img",
    "tag__content_text",
    "tag_back",
    "tag_text"
]
export const CustomProductTagsList = () => {
    const handles = useCssHandles(CSS_HANDLES)
    const [tagProductView, setTagProductView] = useState<ProductTagQuery[]>([])
    const productContext: ProductContext = useProduct()
    const { loading: ToChangeLoading, data: productTagData } 
        = useQuery(GET_PRODUCT_TAG_CUSTOM)

    console.log({productContext});
    
    useEffect(() => {
        if(!ToChangeLoading && productTagData && !productContext.loadingItem){
            const specificationData = productContext?.product?.specificationGroups.find((spe)=>spe.name==="Etiquetas");
            const tagListProduct = specificationData?.specifications[0];
            const tagListValues = tagListProduct?.values;
            const tagView = productTagData?.getProductTagCustom?.filter((tag:ProductTagQuery)=>
                tagListValues?.some((tag2)=>tag2.toLocaleLowerCase() === tag.idTag.toLocaleLowerCase()));

            setTagProductView(tagView)
        }
  }, [ToChangeLoading, productTagData, productContext])

  const validateDates = (dateEndString:string) =>{
    const currentDate = new Date();
    const dateEnd = new Date(dateEndString);
    currentDate.setHours(0, 0, 0, 0);
    dateEnd.setHours(0, 0, 0, 0);
    return dateEnd > currentDate;
  }
  console.log({tagProductView});
  
  return (
    <div className={handles.tag__content}>
        <div className={handles.tag__content_list}>{
            tagProductView.map(({endInDate, dateEnd, isImgUse, urlImg, colorTag, sizeFontTag, colorTextTag, textTag})=>{
                if(!endInDate || (endInDate && validateDates(dateEnd))){
                    if(isImgUse){
                        return <div className={handles.tag__content_img}>
                                    <img className={handles.tag__img} src={urlImg}/>
                                </div>
                    }else{
                        return <div className={handles.tag__content_text}>
                                    <div className={handles.tag_back} style={{backgroundColor: `${colorTag}`}}>
                                        <span className={handles.tag_text} 
                                            style={{
                                                fontSize: `${sizeFontTag}px`,
                                                color: `${colorTextTag}`,
                                                }}>
                                                    {textTag}
                                        </span>
                                    </div>
                                </div>
                    }
                }else{
                    return <></>
                }
            })
            }
        </div>
    </div>
  )
}
