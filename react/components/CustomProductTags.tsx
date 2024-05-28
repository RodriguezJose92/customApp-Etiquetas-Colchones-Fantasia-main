import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo';
//@ts-ignore
import { ToastConsumer, ToastProvider, Layout, PageHeader, PageBlock, Spinner, EXPERIMENTAL_Table as Table, Tag, Checkbox, InputSearch, Button, Modal } from 'vtex.styleguide'
import { ModalImg } from './Atom/ModalImg';
import GET_PRODUCT_TAG_CUSTOM from './graphql/query.getProductTagCustom.graphql'
import { IconPlus } from './Icons';
import { ProductTagQuery, ProductTagTable } from '../typings/type';
import { CustomProductTagNewModal } from './CustomProductTagNewModal';
import style from './style.css'
import { CustomProductTagDeleteModal } from './CustomProductTagDeleteModal';
import { CustomProductTagEditModal } from './CustomProductTagEditModal';

export interface ShowToastData {
  message:string
  duration:number
  horizontalPosition:string
}
interface RowContent {
  data: string;
  motion: Motion;
  density: string;
}
interface RowContentTag {
  data: TagText;
  motion: Motion;
  density: string;
}
interface Motion {
  willChange: string;
  transition: string;
}
interface TagText {
  textTag: string;
  sizeFontTag: string;
  colorTag: string;
  colorTextTag?: TagText;
}

export const CustomProductTags = () => {
    return (
      <ToastProvider positioning="window">
        <CustomProductTagsContent/>
      </ToastProvider>
    )
  }
const CustomProductTagsContent = () => {
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [productTagSearch, setProductTagSearch] = useState<string>('')
    const [productTagTable, setProductTagTable] = useState<ProductTagTable[]>([])
    const [productTagTableAll, setProductTagTableAll] = useState<ProductTagTable[]>([])
    const [productTagLastCreate, setProductTagLastCreate] = useState<ProductTagTable[]>([])
    const [productTagLastUpdate, setProductTagLastUpdate] = useState<ProductTagTable[]>([])
    const [productTagLastDelete, setProductTagLastDelete] = useState<string[]>([])
    const { loading: ToChangeLoading, data: productTagData } 
    = useQuery(GET_PRODUCT_TAG_CUSTOM)
    
    useEffect(() => {
      if(!ToChangeLoading && productTagData){
        let productTagTableData:ProductTagTable[] = productTagData?.getProductTagCustom?.map((tag:ProductTagQuery)=>{
            const { id, idTag, active, dateInit, dateEnd, textTag, sizeFontTag, colorTag, colorTextTag, urlImg, isImgUse, endInDate } = tag;
            return {
                id,
                idTag,
                active,
                dateInit,
                dateEnd,
                endInDate,
                tagText: {
                    textTag,
                    sizeFontTag,
                    colorTag,
                    colorTextTag
                },
                imgTag:urlImg,
                isImgUse,
                modifyItem: id,
                deleteItem: id
            }
        })
        if(productTagLastCreate.length > 0){
            productTagLastCreate.forEach((tag)=>{
                if(productTagTableData.find((tag2)=>tag2.id !==tag.id)){
                    
                    productTagTableData.push(tag)
                }
            })
        }
        if(productTagLastUpdate.length > 0){
            productTagLastUpdate.forEach((tag)=>{
                productTagTableData = productTagTableData.map((tag2)=>{
                    if(tag2.id === tag.id){
                        return tag
                    }
                    return tag2
                })
            })
        }
        if(productTagLastDelete.length > 0){
            productTagTableData = productTagTableData.filter((tag)=>!(productTagLastDelete.some((tag2)=>tag2===tag.id)))
        }
        setProductTagTableAll(productTagTableData)
        if(productTagSearch!==''){
            productTagTableData = productTagTableData.filter((tag)=>tag.idTag.toLowerCase().includes(productTagSearch.toLowerCase()))
        }
        setProductTagTable(productTagTableData)
      }
    }, [ToChangeLoading, productTagData, productTagSearch, productTagLastCreate, productTagLastUpdate, productTagLastDelete])
    const deleteTag = (id:string) =>{
        setProductTagLastDelete([...productTagLastDelete, id])
    }
    const newTag = (data:ProductTagTable) =>{
        setProductTagLastCreate([...productTagLastCreate, data])
    }
    const editTag = (data:ProductTagTable) =>{
        let isFound = false;
        const newProductTagLastUpdate = productTagLastUpdate.map((tag)=>{
            if(tag.id === data.id){
                isFound = true;
                return data
            }
            return tag
        })
        if(isFound){
            setProductTagLastUpdate(newProductTagLastUpdate)
        }else{
            setProductTagLastUpdate([...productTagLastUpdate, data])
        }
    }
    const columns = [
    {
        id: 'idTag',
        title: 'Id tag',
        sortable: true,
        width: '10%',
    },
    {
        id: 'active',
        title: 'Activo',
        width: '10%',
        cellRenderer: ({data}:RowContent) => {
        return (
            <div className={style.contentCheckbox}>
                <Checkbox
                    checked={data}
                    disabled
                    label=""
                    id="active"
                    name="active"
                    onChange={() => {}}
                    value="active"
                />
            </div>
        )
        },
    },
    {
        id: 'dateInit',
        title: 'Fecha inicial',
        width: '10%',
        cellRenderer: ({data}:RowContent) => {
        return (
            <div className={style.contentDate}>
                {new Date(data).toLocaleDateString("es-CO")}
            </div>
        )
        },
    },
    {
        id: 'dateEnd',
        title: 'Fecha final',
        width: '10%',
        cellRenderer: ({data}:RowContent) => {
        return (
            <div className={style.contentDate}>
                {new Date(data).toLocaleDateString("es-CO")}
            </div>
        )
        },
    },
    {
        id: 'endInDate',
        title: 'Desactivar',
        width: '10%',
        cellRenderer: ({data}:RowContent) => {
        return (
            <div className={style.contentCheckbox}>
                <Checkbox
                    checked={data}
                    disabled
                    label=""
                    id="endInDate"
                    name="endInDate"
                    onChange={() => {}}
                    value="active"
                />
            </div>
        )
        },
    },
    {
        id: 'tagText',
        title: 'Tag en texto',
        width: '20%',
        cellRenderer: ({data}:RowContentTag) => {
        return (
            <div className={style.contentTagText}>
                <div className={style.tagBack} style={{backgroundColor: `${data?.colorTag}`}}>
                    <span className={style.tagText} 
                        style={{
                            fontSize: `${data?.sizeFontTag}px`,
                            color: `${data?.colorTextTag}`,
                            }}>
                                {data?.textTag}
                    </span>
                </div>
            </div>
        )
        },
    },
    {
        id: 'imgTag',
        title: 'Tag en imagen',
        width: '10%',
        cellRenderer: ({data}:RowContent) => {
        return (
            data ==="" ? <>Sin imagen</> :<ModalImg urlLink={data}/>
        )
        },
    },
    {
        id: 'isImgUse',
        title: 'Tag en uso',
        width: '10%',
        cellRenderer: ({data}:RowContent) => {
        return (
            <span className="nowrap">{data ? 'Imagen' : 'texto'}</span>
        )
        },
    },
    {
        id: 'modifyItem',
        title: 'Modificar',
        width: '5%',
        cellRenderer: ({data}:RowContent) => {
            const selectTag = productTagTableAll.find((tag)=>tag.id===data) || productTagTableAll[0]
        return (
            <CustomProductTagEditModal editTag={editTag} productTagTableAll={productTagTableAll} selectTag={selectTag}/>
        )
        },
    },
    {
        id: 'deleteItem',
        title: 'Borrar',
        width: '5%',
        cellRenderer: ({data}:RowContent) => {
        return (
            <CustomProductTagDeleteModal id={data} deleteTag={deleteTag}/>
        )
        },
    },
    ]
  
    const measures = {size:5}
  return (
    <>
    <ToastConsumer>
        {({ showToast }:{ showToast: (data:ShowToastData)=>void}) => (
          <Layout fullWidth
            pageHeader={<PageHeader title="Etiquetas de productos personalizadas" />}>
            <PageBlock>
              {
                ToChangeLoading ? <div className='flex justify-center'>
                <span className="dib c-muted-1">
                  <Spinner color="currentColor" size={50} />
                </span>
              </div>
              :<>
                <p className='c-danger tc'>Tenga en cuenta que los cambios pueden tardar en estar reflejados entre 5 segundos a 10 minutos dependiendo de la velocidad del servidor en ese momento...</p>
                <Table
                    columns={columns}
                    measures={measures}
                    items={productTagTable}
                >
                    <Table.Toolbar>
                    <Table.Toolbar.ButtonGroup>
                            <InputSearch
                                placeholder="Buscar..."
                                value={productTagSearch}
                                size="regular"
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductTagSearch(e.target.value)}
                                onSubmit={(e:any) => {
                                e.preventDefault()
                                }}
                            />
                    </Table.Toolbar.ButtonGroup>
                    <Table.Toolbar.ButtonGroup>
                            <Button variation="primary" onClick={()=>setShowModalCreate(true)}>
                                <div className='flex justify-center items-center'>
                                    Nuevo <span className='pl2 flex justify-center items-center'><IconPlus/></span>
                                </div>
                            </Button>
                    </Table.Toolbar.ButtonGroup>
                    </Table.Toolbar>
                </Table>
              </>
              }
            </PageBlock>
            <CustomProductTagNewModal productTagTableAll={productTagTableAll}
            showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} showToast={showToast} newTag={newTag}/>
          </Layout>
        )}
    </ToastConsumer>
    </>
  )
}
