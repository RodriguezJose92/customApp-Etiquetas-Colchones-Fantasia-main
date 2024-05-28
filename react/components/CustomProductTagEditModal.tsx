import React, { useState, createRef } from 'react'
import { useMutation } from 'react-apollo'
//@ts-ignore
import { ToastConsumer, Modal, Input, ColorPicker, DatePicker, Checkbox, RadioGroup, Divider, Button, Spinner } from 'vtex.styleguide'
import { useDropzone } from 'react-dropzone'
import UploadFileMutation from './graphql/uploadFile.graphql'
import UPDATE_PRODUCT_TAG from './graphql/mutation.updateProductTagCustom.graphql'
import { IconCopy, IconEdit } from './Icons'
import { ShowToastData } from './CustomProductTags'
import style from './style.css'
import { ProductTagTable } from '../typings/type'

interface Props {
    editTag:(data:ProductTagTable)=>void
    productTagTableAll:ProductTagTable[]
    selectTag:ProductTagTable
}
interface ColorPick {
  color: Color;
  history: Color[];
}

interface Color {
  hex: string;
}
const MAX_SIZE = 4 * 1024 * 1024
interface MutationData {
  uploadFile: { fileUrl: string }
}
export const CustomProductTagEditModal = ({ editTag, productTagTableAll, selectTag }:Props) => {
    const refLink = createRef<HTMLInputElement>()
    const [showModal, setShowModal] = useState(false)
    const [idTag, setIdTag] = useState(selectTag.idTag)
    const [isActive, setIsActive] = useState(selectTag.active)
    const [endInDate, setEndInDate] = useState(selectTag.endInDate)
    const [dateInit, setDateInit] = useState(new Date(selectTag.dateInit))
    const [dateEnd, setDateEnd] = useState(new Date(selectTag.dateEnd))
    const [textTag, setTextTag] = useState(selectTag.tagText.textTag)
    const [isImgUse, setIsImgUse] = useState(selectTag.isImgUse ? 'Imagen': 'Texto')
    const [sizeFontTag, setSizeFontTag] = useState(selectTag.tagText.sizeFontTag)
    const [colorPick, setColorPick] = useState<ColorPick>({ 
        color: { hex: `${selectTag.tagText.colorTag}` }, history: [{ hex: `${selectTag.tagText.colorTag}` }] });
    const [colorPickText, setColorPickText] = useState<ColorPick>({ 
        color: { hex: `${selectTag.tagText.colorTextTag}` }, history: [{ hex: `${selectTag.tagText.colorTextTag}` }] });
    const [fileName, setFileName] = React.useState('')
    const [uploadFile] = useMutation<MutationData>(UploadFileMutation)
    const [isLoading, setIsLoading] = React.useState(false)
    const [imageUrl, setImageUrl] = React.useState<string | undefined>(selectTag.imgTag)
    const [error, setError] = React.useState<string | null>()
    
    const [updateProductTagCustom] = useMutation(UPDATE_PRODUCT_TAG)
    const onDropImage = async (files: File[]) => {
        setError(null)
        try {
        if (files?.[0]) {
            setIsLoading(true)

            const { data, errors } = await uploadFile({
            variables: { file: files[0] },
            })
            
            if (errors) {
            setError("error size")
            return
            }

            setIsLoading(false)
            setFileName(files?.[0].name)
            setImageUrl(data?.uploadFile.fileUrl)
            return data
        }
        return setError("error size")
        } catch (err) {
        setError("error generic")
        setIsLoading(false)
        }
    }
    const { getInputProps, getRootProps } = useDropzone({
        accept:  '.pdf, image/*',
        maxSize: MAX_SIZE,
        multiple: false,
        onDrop: onDropImage,
    })
    const changeColorPick = (color:Color) =>{
        const { history } = colorPick;
        history.push(color)
        setColorPick({ history, color })
    }
    const changeColorPickText = (color:Color) =>{
        const { history } = colorPickText;
        history.push(color)
        setColorPickText({ history, color })
    }
    const onCreateTag = async(e:React.FormEvent<HTMLFormElement>, showToast:(data:ShowToastData)=>void) =>{
        e.preventDefault()
        if(idTag==='' || productTagTableAll.some(((tag)=>tag.idTag.toLowerCase().includes(idTag.toLowerCase()) && tag.id!==selectTag.id))){
            showToast({
                message: 'Coloca un Id tag valido.',
                duration: 3000,
                horizontalPosition: 'right',
              })
            return
        }
        const result = await updateProductTagCustom({ 
            variables: { 
                id:selectTag.id,
                active:isActive,
                endInDate,
                dateInit:dateInit.toLocaleDateString("en-US"),
                dateEnd:dateEnd.toLocaleDateString("en-US"),
                textTag,
                colorTag: colorPick.color.hex,
                colorTextTag: colorPickText.color.hex,
                sizeFontTag: sizeFontTag !== "" ? sizeFontTag : "0",
                idTag,
                urlImg: imageUrl ? imageUrl : '',
                isImgUse: isImgUse === 'Imagen',
            } 
        });
        if(result?.data?.updateProductTagCustom?.isUpdate){
            editTag({
                id:selectTag.id,
                idTag,
                active:isActive,
                dateInit:dateInit,
                dateEnd:dateEnd,
                endInDate,
                tagText: {
                    textTag,
                    sizeFontTag:sizeFontTag !== "" ? sizeFontTag : "0",
                    colorTag:colorPick.color.hex,
                    colorTextTag:colorPickText.color.hex
                },
                imgTag: imageUrl ? imageUrl : '',
                isImgUse: isImgUse === 'Imagen',
                modifyItem: selectTag.id,
                deleteItem: selectTag.id,
            })
            showToast({
                message: 'Se ha editado la etiqueta.',
                duration: 3000,
                horizontalPosition: 'right',
              })
              setShowModal(false)
        }else{
            showToast({
                message: 'No se ha editado la etiqueta, prueba a colocar un Id tag diferente (el Id tag no puede ser igual a otro).',
                duration: 3000,
                horizontalPosition: 'right',
              })
        }
    }
  return (
    <ToastConsumer>
        {({ showToast }:{ showToast: (data:ShowToastData)=>void}) => (
    <>
    <Button size="small" variation="secondary" onClick={()=>setShowModal(true)}>
        <IconEdit/>
    </Button>
    <Modal
        centered
        isOpen={showModal}
        onClose={()=>setShowModal(false)}>
        <form className="dark-gray" onSubmit={(e)=>onCreateTag(e, showToast)}>
            <div className="flex">
                <div className="w-50">
                    <div className="mb5 flex items-center">
                        <div className="w-70">
                            <Input
                                value={idTag}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setIdTag(e.target.value)}
                                label="Id tag"
                                placeholder="Oferta Limitada"
                            />
                        </div>
                        <div className="w-30 pl5 pt5">
                            <Checkbox
                                label="Activo"
                                id="active"
                                name="active"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                                value="active"
                            />
                        </div>
                    </div>
                    <div className="pt1 pb3">
                        <Divider orientation="horizontal" />
                    </div>
                    <div className="mb5 flex items-center">
                        <div className="w-60">
                            <div className="mb5">
                                <DatePicker
                                    label="Fecha de inicio"
                                    maxDate={dateEnd}
                                    minDate={new Date()}
                                    value={dateInit}
                                    onChange={(date:Date) => setDateInit(date)}
                                    locale="es-CO"
                                />
                            </div>
                            <div className="mb5">
                                <DatePicker
                                    label="Fecha de fin"
                                    minDate={dateInit}
                                    value={dateEnd}
                                    onChange={(date:Date) => setDateEnd(date)}
                                    locale="es-CO"
                                />
                            </div>
                        </div>
                        <div className="w-40 pl5 pt5">
                            <Checkbox
                                label="finalizar en la fecha"
                                id="endInDate"
                                name="endInDate"
                                checked={endInDate}
                                onChange={() => setEndInDate(!endInDate)}
                                value="active"
                            />
                        </div>
                    </div>
                    <div className="pt1 pb3">
                        <Divider orientation="horizontal" />
                    </div>
                    <div className="mb5 flex items-center pr2">
                        <div className="w-70">
                            <Input
                                value={textTag}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTextTag(e.target.value)}
                                label="Texto del tag"
                                placeholder="Oferta Limitada"
                            />
                        </div>
                        <div className="w-30 pl5">
                            <Input
                                value={sizeFontTag}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSizeFontTag(e.target.value)}
                                type="number"
                                label="Tam del texto"
                                placeholder="22"
                            />
                        </div>
                    </div>
                    <div className="mb5 flex items-center">
                        <div className="mb1 w-50">
                            <ColorPicker
                                title="Color"
                                label="fondo"
                                color={colorPick.color}
                                colorHistory={colorPick.history}
                                onChange={changeColorPick}
                            />
                        </div>
                        <div className="flex pr1 pl1">
                            <Divider orientation="vertical" />
                        </div>
                        <div className="mb1 w-50">
                            <ColorPicker
                                title="Color"
                                label="texto"
                                color={colorPickText.color}
                                colorHistory={colorPickText.history}
                                onChange={changeColorPickText}
                            />
                        </div>
                    </div>
                    <div className="pt1 pb3">
                        <Divider orientation="horizontal" />
                    </div>
                    <div className='tc-l'>
                        <div className={style.contentText}>
                            Tener en cuenta subir solo imágenes compatibles, y de poco peso para evitar problemas de performance en la tienda.
                        </div>
                        <input
                            className={style.contentBtnAttachmentInput}
                            disabled
                            placeholder={"Subir Archivo"}
                            value={fileName}
                        />
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button variation="secondary" disabled={isLoading} type="button">
                            {isLoading ? (
                            <div >
                                <Spinner color="currentColor" size={20}/>
                            </div>
                            ): 
                            <span >
                                Subir Imagen
                            </span>
                            }
                        </Button>
                        </div>
                        {error && <div className={style.contentText}>
                            Ocurrió un error, vuelve a intentarlo
                        </div>}
                    </div>
                </div>
                    <Divider orientation="vertical" />
                <div className="w-50">
                    <div className='pl5 pt5'>
                    <RadioGroup
                        hideBorder
                        name="typeTag"
                        options={[
                            { value: 'Texto', label: 'Texto' },
                            { value: 'Imagen', label: 'Imagen' },
                        ]}
                        value={isImgUse}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setIsImgUse(e.currentTarget.value)}
                        />
                    </div>
                    <div className="pt3 pb1">
                        <Divider orientation="horizontal" />
                    </div>
                    <div className={style.contentTagText}>
                        <div className={style.tagBack} style={{backgroundColor: `${colorPick.color.hex}`}}>
                            <span className={style.tagText} 
                                style={{
                                    fontSize: `${sizeFontTag}px`,
                                    color: `${colorPickText.color.hex}`,
                                    }}>
                                        {textTag}
                            </span>
                        </div>
                    </div>
                    <div className="pt1 pb3">
                        <Divider orientation="horizontal" />
                    </div>
                    <div className="pl6 pr6 pb2">
                        <div className="flex items-end">
                            <Input
                                readOnly
                                ref={refLink}
                                value={imageUrl}
                                label="Url imagen"
                            />
                            <div className="flex">
                                <Button size="small" disabled={!imageUrl} variation="secondary" type="button" onClick={()=>{
                                    if(typeof imageUrl === 'string' && refLink.current){
                                        refLink.current.select()
                                        document.execCommand('copy');
                                        showToast({
                                            message: 'El link ha sido copiado al portapapeles.',
                                            duration: 3000,
                                            horizontalPosition: 'right',
                                          })
                                    }
                                    }}>
                                    <IconCopy/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.contentModal}>
                        <div className={style.contentProduct}>
                            <img className={style.productImg} src='https://xtrategikpartnerco.vteximg.com.br/arquivos/product.jpg'/>
                            <div className={style.contentProductImgTag}>
                                <img className={style.productImgTag} src={imageUrl}/>
                            </div>
                        </div>
                    </div>
                    <div className="pt3 pb3">
                        <Divider orientation="horizontal" />
                    </div>
                    <div className="pt1 pb3 tr-l">
                        <Button variation="primary" type="submit" disabled={isLoading}>
                            Editar etiqueta
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    </Modal>
    </>)}
    </ToastConsumer>
  )
}
