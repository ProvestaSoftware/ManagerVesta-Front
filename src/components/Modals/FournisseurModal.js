import React, { useEffect, useState } from 'react'
import Input from '../Inputs/Input'
import RegularButton from '../Buttons/RegularButton'
import { useDispatch } from 'react-redux'
import { createFournisseur, getFournisseurs, updateFournisseur } from '../../actions/fournisseurs'
import { useNavigate } from 'react-router-dom'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FournisseurModal = ({ item, handleModal,refreshFournisseursList,setNewFornisseur }) => {


  const [Loading, setLoading] = useState(false);


    const [fournisseurData, setFournisseurData] = useState({
        nom: item ? item.nom : '',
        email: item ? item.email : '',
        numTel: item ? item.numTel : '',
        banque: item ? item.banque : 'ATB',
        rib: item ? item.rib : '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (item) setFournisseurData(item);
    }, [item]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            let createdFournisseurData;
            if (item) {
                await dispatch(updateFournisseur(item.id, fournisseurData));
                refreshFournisseursList();
            } else {
                createdFournisseurData = await dispatch(createFournisseur(fournisseurData));
                refreshFournisseursList();
                setNewFornisseur(createdFournisseurData?.fournisseur);
            }
    
            if (window.location.pathname === "/fournisseurs") {
                await dispatch(getFournisseurs());
            }
            refreshFournisseursList();
            handleModal();
            
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
            handleModal(false)

        }
    };


    return (
        <>
        {Loading ? (
        <div className="fixed-loader-container">
            <div className="fixed-loader"></div>
        </div>
          ) : (
            <>
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
                    <form onSubmit={handleSubmit} class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Ajouter Fournisseur
                            </h3>
                            <button onClick={handleModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-6 space-y-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <Input
                                        label="Nom"
                                        placeholder="Nom"
                                        defaultValue={fournisseurData.nom}
                                        name="nom"
                                        id="name"
                                        type="text"
                                        form={true}
                                        onChange={(e) =>
                                            setFournisseurData({ ...fournisseurData, nom: e.target.value })
                                        }
                                    />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <Input
                                        label="Email"
                                        placeholder="Email"
                                        defaultValue={fournisseurData.email}
                                        name="email"
                                        id="email"
                                        type="email"
                                        form={true}
                                        onChange={(e) =>
                                            setFournisseurData({ ...fournisseurData, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <Input
                                        label="N° de Téléphone"
                                        placeholder="N° de Téléphone"
                                        defaultValue={fournisseurData.numTel}
                                        name="numTel"
                                        id="numTel"
                                        type="text"
                                        form={true}
                                        onChange={(e) =>
                                            setFournisseurData({ ...fournisseurData, numTel: e.target.value })
                                        }
                                    />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <Input
                                        label="Banque"
                                        placeholder="Banque"
                                        defaultValue={fournisseurData.banque}
                                        name="banque"
                                        id="banque"
                                        type="text"
                                        form={true}
                                        onChange={(e) =>
                                            setFournisseurData({ ...fournisseurData, banque: e.target.value })
                                        }
                                    />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <Input
                                        label="RIB"
                                        placeholder="RIB"
                                        defaultValue={fournisseurData.rib}
                                        name="rib"
                                        id="rib"
                                        type="text"
                                        form={true}
                                        onChange={(e) =>
                                            setFournisseurData({ ...fournisseurData, rib: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <RegularButton
                                styleType="primary"
                                type="submit"
                            >
                                Enregistrer
                            </RegularButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
        )}
        </>
    )
}

export default FournisseurModal