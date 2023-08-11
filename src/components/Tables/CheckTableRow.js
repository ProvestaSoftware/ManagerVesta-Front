/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Input from '../Inputs/Input'
import RegularButton from '../Buttons/RegularButton'
import Select from '../Inputs/Select'
import { dropdownCheckStatusData } from '../../data/MenuData'

const CheckTableRow = ({ item, fournisseurs }) => {

    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: false
    };

    const created_at = new Date(item.created_at);

    const associatedFournisseur = fournisseurs.filter(
        (fournisseur) =>
            fournisseur.id === item.fournisseur_id
    );

    return (
        <>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <td class="px-6 py-4">
                    #{item.num}
                </td>
                <td class="px-6 py-4">
                    {item.montant} dt
                </td>
                <td class="px-6 py-4">
                    {associatedFournisseur[0]?.nom}
                </td>
                <td class="px-6 py-4">
                    <div style={{
                        backgroundColor: item.type === 'Cheque' ? '#00A3FF' : '#94C509',
                        color: '#ffffff',
                        borderRadius: '15px',
                        padding: '10px',
                        width: '80px',
                        height: 'auto',
                        textAlign: 'center'
                    }}>
                        {item.type}
                    </div>
                </td>
                <td class="px-6 py-4">
                    {created_at.toLocaleString("en-US", options)}
                </td>
                <td class="px-6 py-4">
                    {item.dueDate}
                </td>
                <td class="px-6 py-4">
                    {item.status}
                </td>
                <td class="flex items-center space-x-4 px-6 py-4">
                    <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editer</a>
                    <a href="" type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Supprimer</a>
                </td>
            </tr>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-2xl max-h-full">
                    <form action="#" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Cheque #{item.num}
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
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
                                        label="Numéro de chéque"
                                        placeholder="Numéro de chéque"
                                        defaultValue={item.num}
                                        type="text"
                                        form={true}
                                    />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <Select
                                        label="Etat du chéque"
                                        title="Etat du chéque"
                                        defaultValue={item.status}
                                        defaultChecked={item.status}
                                        options={dropdownCheckStatusData}
                                        form={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <RegularButton
                                styleType="primary"
                            >
                                Enregistrer
                            </RegularButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CheckTableRow