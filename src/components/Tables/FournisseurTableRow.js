/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteFournisseur, getFournisseurs } from '../../actions/fournisseurs';
import FournisseurModal from '../Modals/FournisseurModal';
import ConfirmModal from '../Modals/ConfirmModal';

const FournisseurTableRow = ({ item, index, color }) => {

    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    }

    const handleConfirm = () => {
        setConfirm(!confirm);
    }

    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteFournisseur(item.id));
        dispatch(getFournisseurs());
        handleConfirm();
    }

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: false
    };

    const created_at = new Date(item.created_at);

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
                    {index + 1}.
                </td>
                <td class="px-6 py-4">
                    {item.nom}
                </td>
                <td class="px-6 py-4">
                    {item.email}
                </td>
                <td class="px-6 py-4">
                    {item.numTel}
                </td>
                <td style={{
                    margin: 'auto'
                }} class="px-6 py-4 block align-items">
                    {item.rib}
                    <div style={{
                        backgroundColor: color,
                        color: '#ffffff',
                        borderRadius: '15px',
                        padding: '2px 0',
                        width: '60px',
                        height: 'auto',
                        textAlign: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        margin: '10px auto 0 auto'
                    }}>
                        {item.banque}
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
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={handleConfirm}>Supprimer</button>
                </td>
            </tr>
            {modal && <FournisseurModal item={item} handleModal={handleModal} />}
            {confirm && <ConfirmModal name={`Fournisseur ${item.nom} | ${item.email}`} handleModal={handleConfirm} handleDelete={handleDelete} />}
        </>
    )
}

export default FournisseurTableRow