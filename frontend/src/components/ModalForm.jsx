import React from 'react'

const ModalForm = ({isOpen, onClose, mode, OnSubmit}) => {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className='font-bold text-lg py-4'>{mode ==='edit' ? 'Edit Client':'Client Details'}</h3>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <button className='btn btn-success'>{mode ==='edit' ? 'Save changes':'Add Client'}</button>
                    </form>
                  
                </div>
            </dialog>
        </div>
    )
}

export default ModalForm
