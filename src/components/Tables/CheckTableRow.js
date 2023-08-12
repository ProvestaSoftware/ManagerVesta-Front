/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import CheckModal from '../Modals/CheckModal';

const CheckTableRow = ({ item, fournisseurs }) => {

    const [modal, setModal] = useState(false);

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

    const handleModal = () => {
        setModal(!modal);
    }

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
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={handleModal}>Editer</button>
                    <a href="" type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Supprimer</a>
                </td>
            </tr>
            {modal && <CheckModal item={item} handleModal={handleModal} />}
        </>
    )
}

export default CheckTableRow