/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteFournisseur, getFournisseurs } from '../../actions/fournisseurs';
import FournisseurModal from '../Modals/FournisseurModal';
import ConfirmModal from '../Modals/ConfirmModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
                <td class="px-6 py-4">
                    {index + 1}.
                </td>
                <td class="px-6 py-4">
                    {item.nom}
                </td>
                <td class="px-6 py-4">
                    {item.email}
                </td>
                <td class="px-6 py-4" style={{whiteSpace: 'nowrap'}}>
                    {item.numTel}
                </td>
                <td style={{
                    margin: 'auto'
                }} class="px-6 py-4 block align-items">
                    <span style={{whiteSpace: 'nowrap'}}>
                        {item.rib}
                    </span>
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
                        margin: '10px auto 0 auto',
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
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_edit" onClick={handleModal}> <FontAwesomeIcon icon={faEdit} /></button>
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_delete" onClick={handleConfirm}><FontAwesomeIcon icon={faTrash} /></button>
                </td>
            </tr>
            {modal && <FournisseurModal item={item} handleModal={handleModal} />}
            {confirm && <ConfirmModal name={`Fournisseur ${item.nom} | ${item.email}`} handleModal={handleConfirm} handleDelete={handleDelete} />}
        </>
    )
}

export default FournisseurTableRow