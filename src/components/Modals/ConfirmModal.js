import React from 'react'
import RegularButton from '../Buttons/RegularButton'

const ConfirmModal = ({ name, handleModal, handleDelete, loading, is_deleted }) => {
    return (
        <>        
           {loading ? (
                <div className="fixed-loader-container">
                    <div className="fixed-loader"></div>
                </div>
            ) : (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    borderRadius: '8px',
                    width: 'auto',
                    height: 'auto'
                }}>
                    <div class="relative w-full max-w-2xl max-h-full">
                        <form onSubmit={handleDelete} class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    {is_deleted ? `Restaurer ${name}` : `Supprimer ${name}`}
                                </h3>
                                <button onClick={handleModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-6 space-y-6">
                                {is_deleted ? `Voulez-vous restaurer ${name} ?` : `Êtes-vous sûr de vouloir supprimer ${name} ?`}
                            </div>
                            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <RegularButton
                                    styleType="primary"
                                    type="submit"
                                >
                                    Oui
                                </RegularButton>
                                <RegularButton
                                    styleType="secondary"
                                    onClick={handleModal}
                                >
                                    Non
                                </RegularButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
         )}
        </>
    )
}

export default ConfirmModal
