import React, { useEffect, useState } from 'react'
import Input from '../Inputs/Input'
import RegularButton from '../Buttons/RegularButton'
import { useDispatch } from 'react-redux'
import { createCheckClient, updateCheckClient } from '../../actions/checkClient';
import { useNavigate } from 'react-router-dom'
import RegularLink from '../../components/RegularLink'
import { createClient, getClients, updateClient } from '../../actions/clients'
import Select from '../Inputs/Select';
import { Client } from '../../_services/client.service';

const CheckFournisseurModal = ({ item, handleModal,clients,getData }) => {
    const [fournisseurData, setFournisseurData] = useState({
        num: item ? item.num : '',
        montant: item ? item.montant : '',
        type: item ? item?.type : 'Chèque',
        dueDate: item ? item.dueDate : '',
        status: item ? item.status : 'En attente',
        client_id: item ? item.client_id : '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (item) setFournisseurData(item);
    }, [item]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (item) {
            dispatch(updateCheckClient(item.id, fournisseurData));
        } else {
            dispatch(createCheckClient(fournisseurData));
        }
        navigate("/cheques-clients");
        handleModal();
        getData()
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFournisseurData({ ...fournisseurData, [name]: value });
    };
    const [showAddNewClientPopup, setShowAddNewClientPopup] = useState(false);

    const handleAddNewClient = () => {
        setShowAddNewClientPopup(true);
    };


    const [clientData, setClientData] = useState({
        nom: item ? item.nom : '',
        email: item ? item.email : '',
        numTel: item ? item.numTel : '',
        banque: item ? item.banque : 'ATB',
        rib: item ? item.rib : '',
    });


    useEffect(() => {
        if (item) setClientData(item);
    }, [item]);
    const [ newclient, setNewClient] = useState(null);

    const handleAjout = async (e) => {
        e.preventDefault();
        // console.log(clientData);

        let createdClientData = await Client.add(clientData);
        setNewClient(createdClientData?.client)
        dispatch(getClients());

        setShowAddNewClientPopup(false);
    };
    return (
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
                <div className="relative w-full max-w-2xl max-h-full">
                    <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Ajouter Client
                            </h3>
                            <button onClick={handleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <Input
                                        label="Num"
                                        placeholder="Num"
                                        defaultValue={fournisseurData.num}
                                        name="num"
                                        id="num"
                                        type="number"
                                        form={true}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <Input
                                        label="Montant"
                                        placeholder="Montant"
                                        defaultValue={fournisseurData.montant}
                                        name="montant"
                                        id="montant"
                                        type="montant"
                                        form={true}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                        Type
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={fournisseurData.type}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="Chèque">Chèque</option>
                                        <option value="Traite">Traite</option>
                                    </select>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <Input
                                        label="dueDate"
                                        placeholder="dueDate"
                                        defaultValue={fournisseurData.dueDate}
                                        name="dueDate"
                                        id="dueDate"
                                        type="date"
                                        form={true}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={fournisseurData.status}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="En attente">En attente</option>
                                        <option value="Payé">Payé</option>
                                        <option value="Impayé">Impayé</option>
                                    </select>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <Select
                                        label="Client:"
                                        title="Recherche client"
                                        options={clients || ''}
                                        name="client_id"
                                        onChange={handleInputChange}
                                        object={false}
                                        defaultValue={newclient?.id}
                                    />
                                </div>
                                <div className='col-span-6 sm:col-span-3'>
                                    <RegularLink
                                        content="Ajouter un nouveau client"
                                        onClick={handleAddNewClient} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
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
             {showAddNewClientPopup && (
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
                                <form onSubmit={handleAjout} class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                            Ajouter Client
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
                                                    defaultValue={clientData.nom}
                                                    name="nom"
                                                    id="name"
                                                    type="text"
                                                    form={true}
                                                    onChange={(e) =>
                                                        setClientData({ ...clientData, nom: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div class="col-span-6 sm:col-span-3">
                                                <Input
                                                    label="Email"
                                                    placeholder="Email"
                                                    defaultValue={clientData.email}
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    form={true}
                                                    onChange={(e) =>
                                                        setClientData({ ...clientData, email: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div class="col-span-6 sm:col-span-3">
                                                <Input
                                                    label="N° de Téléphone"
                                                    placeholder="N° de Téléphone"
                                                    defaultValue={clientData.numTel}
                                                    name="numTel"
                                                    id="numTel"
                                                    type="text"
                                                    form={true}
                                                    onChange={(e) =>
                                                        setClientData({ ...clientData, numTel: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div class="col-span-6 sm:col-span-3">
                                                <Input
                                                    label="Banque"
                                                    placeholder="Banque"
                                                    defaultValue={clientData.banque}
                                                    name="banque"
                                                    id="banque"
                                                    type="text"
                                                    form={true}
                                                    onChange={(e) =>
                                                        setClientData({ ...clientData, banque: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div class="col-span-6 sm:col-span-6">
                                                <Input
                                                    label="RIB"
                                                    placeholder="RIB"
                                                    defaultValue={clientData.rib}
                                                    name="rib"
                                                    id="rib"
                                                    type="text"
                                                    form={true}
                                                    onChange={(e) =>
                                                        setClientData({ ...clientData, rib: e.target.value })
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
            )}
        </div>
    );
}

export default CheckFournisseurModal;
