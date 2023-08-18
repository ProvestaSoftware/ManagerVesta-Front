/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import PrintModal from '../Modals/PrintModal';

const PaymentCheckTableRow = ({ item, index, fournisseurs }) => {

    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    }

    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: false
    };

    const dueDate = new Date(item.dueDate);

    // const associatedFournisseur = fournisseurs.filter(
    //     (fournisseur) =>
    //         fournisseur.id === item.fournisseur_id
    // );

    return (
        <>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                    {index + 1}.
                </td>
                <td class="px-6 py-4">
                    #{item.num}
                </td>
                <td class="px-6 py-4">
                    {item.montant} dt
                </td>
                <td class="px-6 py-4">
                    {dueDate.toLocaleString("en-US", options)}
                </td>
                <td class="flex items-center space-x-4 px-6 py-4">
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={handleModal}>Imprimer</button>
                </td>
            </tr>
            {modal && <PrintModal item={item} handleModal={handleModal} fournisseurs={fournisseurs} />}
        </>
    )
}

export default PaymentCheckTableRow