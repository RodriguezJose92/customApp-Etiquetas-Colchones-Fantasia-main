import React, { useState } from 'react'
//@ts-ignore
import { Modal } from 'vtex.styleguide'
import style from './style.css'

interface Props {
    urlLink:string
}
export const ModalImg = ({urlLink}:Props) => {
    const [showModal, setShowModal] = useState(false)
    const onCLickLink = (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        setShowModal(true)
    }
  return (
    <>
    <a href='/#' onClick={onCLickLink}>Abrir imagen</a>
    <Modal
          centered
          isOpen={showModal}
          onClose={()=>setShowModal(false)}>
          <div className="dark-gray">
            <div className={style.contentText}>Esto es una representación de cómo se podría ver en el producto, para el diseño real se toma el css asignado en el tema de la pagina</div>
            <div className={style.contentModal}>
                <div className={style.contentProduct}>
                    <img className={style.productImg} src='https://xtrategikpartnerco.vteximg.com.br/arquivos/product.jpg'/>
                    <div className={style.contentProductImgTag}>
                        <img className={style.productImgTag} src={urlLink}/>
                    </div>
                </div>
            </div>
          </div>
        </Modal>
    </>
  )
}
