import React, { useState } from 'react'
import { ExecutionResult, useMutation } from 'react-apollo'
//@ts-ignore
import { Modal, ModalDialog, Button, ToastConsumer } from 'vtex.styleguide'
import DELETE_PRODUCT_TAG_CUSTOM from './graphql/mutation.deleteProductTagCustom.graphql'
import { IconDelete } from './Icons'
import { ResultDeleteItem } from '../typings/type'
import { ShowToastData } from './CustomProductTags'

interface Props {
    id:string
    deleteTag:(id:string)=>void
}
export const CustomProductTagDeleteModal = ({ id, deleteTag }:Props) => {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const [deleteProductTagCustom] = useMutation(DELETE_PRODUCT_TAG_CUSTOM)
    const deleteItem = async(showToast:(data:ShowToastData)=>void) =>{
        setLoading(true)
        const result:ExecutionResult<ResultDeleteItem> = await deleteProductTagCustom({ 
            variables: { 
                id,
            } 
        })
        if(result?.data?.deleteProductTagCustom?.isDelete){
            deleteTag(id)
            showToast({
                message: 'Se ha eliminado el elemento.',
                duration: 3000,
                horizontalPosition: 'right',
              })
            setShowModal(false)
        }else{
            showToast({
                message: 'Ha ocurrido un error por favor vuelve a intentarlo más tarde.',
                duration: 3000,
                horizontalPosition: 'right',
              })
        }
        setLoading(false)

    }
  return (
    <ToastConsumer>
        {({ showToast }:{ showToast: (data:ShowToastData)=>void}) => (
    <>
        <Button size="small" variation="secondary" onClick={()=>setShowModal(true)}>
            <IconDelete/>
        </Button>
        <ModalDialog
          centered
          loading={loading}
          confirmation={{
            onClick: ()=>deleteItem(showToast),
            label: 'Si, Eliminar Etiqueta',
            isDangerous: true,
          }}
          cancelation={{
            onClick: ()=>setShowModal(false),
            label: 'Cancelar',
          }}
          isOpen={showModal}
          onClose={()=>setShowModal(false)}>
          <div className="">
            <p className="f3 f3-ns fw3 gray">
              ¿Eliminar esta Etiqueta?
            </p>
            <p>
                Eliminará todo el registro de la etiqueta y ya no se podrá recuperar
            </p>
          </div>
        </ModalDialog>
      </>
    )}
    </ToastConsumer>
  )
}
