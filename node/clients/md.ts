import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'
import { ProductTagCreateQuery, ProductTagDeleteQuery, ProductTagQuery } from '../typings/type'

const FOUR_SECONDS = 4 * 1000

export class MasterDataClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdClientAutCookie: ctx.authToken,
      },
      timeout: FOUR_SECONDS,
    })
  }

  public getProductTagCustom = async (): Promise<any> => {
    const data = await this.http.get(`/api/dataentities/PT/search`, {
      params: {
        _fields: '_all',
      },
    })
    return data
  }
  public setProductTagCustom = async (
    idTag:string, 
    urlImg:string, 
    isImgUse:boolean, 
    textTag:string, 
    colorTag:string, 
    sizeFontTag:string,
    dateInit:string, 
    dateEnd:string, 
    colorTextTag:string,
    endInDate:boolean, 
    active:boolean
  ): Promise<any> => {

    const returnData = {
      idTag,
      urlImg,
      isImgUse, 
      textTag, 
      colorTag,
      sizeFontTag,
      dateInit,
      dateEnd,
      endInDate,
      active,
      colorTextTag
    }
    
    const data:ProductTagQuery[] = await this.http.get(`/api/dataentities/PT/search`, {
      params: {
        _fields: '_all',
      },
    })
    const result = { 
      isCreate: false,
      id:""
    }
    if(data.some((d)=>d.idTag.toLowerCase()===idTag.toLowerCase())){
      return result
    }else{
      const resultCreate:ProductTagCreateQuery = await this.http.post(
        '/api/dataentities/PT/documents',
        returnData,
        {
          params: {
            _fields: '_all',
          },
        }
      )
      result.id = resultCreate.DocumentId
      result.isCreate = true
      return result;
    }
    
      
  }
  public updateProductTagCustom = async (
    id:string, 
    idTag:string, 
    urlImg:string, 
    isImgUse:boolean, 
    textTag:string, 
    colorTag:string, 
    sizeFontTag:string,
    dateInit:string, 
    dateEnd:string, 
    colorTextTag:string,
    endInDate:boolean, 
    active:boolean
  ): Promise<any> => {

    const returnData = {
      id,
      idTag,
      urlImg,
      isImgUse, 
      textTag, 
      colorTag,
      sizeFontTag,
      dateInit,
      dateEnd,
      endInDate,
      active,
      colorTextTag
    }
    const result = { 
      isUpdate: false
    }
    console.log({returnData});
    
    const resultCreate:ProductTagCreateQuery = await this.http.patch(
      '/api/dataentities/PT/documents',
      returnData,
      {
        params: {
          _fields: '_all',
        },
      }
    )
    console.log({resultCreate});
    
    result.isUpdate = true;
    return result;
  }
  public deleteProductTagCustom = async (
    id: string
  ): Promise<any> => {

    const { status, data }:ProductTagDeleteQuery = await this.http.delete(`/api/dataentities/PT/documents`, {
      params: {
        _fields: '_all',
        id
      },
    })
    if(!data.Errors && status === 200){
      return {
        isDelete:true
      }
    }else{
      return {
        isDelete:false
      }
    }
  }
}
