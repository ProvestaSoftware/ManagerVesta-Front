/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import CheckModal from '../Modals/CheckModal';
import { useDispatch } from 'react-redux';
import { deleteCheck, getChecks } from '../../actions/checks';
import ConfirmModal from '../Modals/ConfirmModal';
import moment from 'moment'

const CheckTableRow = ({ item, fournisseurs }) => {

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
        dispatch(deleteCheck(item.id));
        dispatch(getChecks());
        handleConfirm();
    }

    const created_at = new Date(item.created_at);

    const associatedFournisseur = fournisseurs.filter(
        (fournisseur) =>
            fournisseur.id === item.fournisseur_id
    );

    const state_colors = {
        'En attente' : '#333333',
        'Impayé' : '#D30606',
        'Payé' : '#13AB50'
    }

    return (
        <>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                        backgroundColor: item.type === 'Chèque' ? '#00A3FF' : '#94C509',
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
                    {moment(created_at).locale('fr').format("DD MMMM YYYY, HH:mm")}
                </td>
                <td class="px-6 py-4">
                    {
                        moment(item.dueDate).diff( moment(), 'days' ) <= 0 ?
                            <span style={{color: '#D30606'}}>
                                {
                                    moment(item.dueDate).locale('fr').format("DD MMMM YYYY")
                                }
                            </span>
                        :
                            moment(item.dueDate).diff( moment(), 'days' ) <= 14 ?
                                <span style={{color: 'orange'}}>
                                    {
                                        moment(item.dueDate).locale('fr').format("DD MMMM YYYY")
                                    }
                                </span>
                            :
                                <span>
                                    {
                                        moment(item.dueDate).locale('fr').format("DD MMMM YYYY")
                                    }
                                </span>
                    }
                </td>
                <td class="px-6 py-4">
                    <b style={{color: state_colors[item.status]}}>
                        {item.status}
                    </b>
                </td>
                <td class="flex items-center space-x-4 px-6 py-4">
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={handleModal}>Editer</button>
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={handleConfirm}>Supprimer</button>
                </td>
            </tr>
            {modal && <CheckModal item={item} handleModal={handleModal} />}
            {confirm && <ConfirmModal name={`Chèque #${item.num}`} handleModal={handleConfirm} handleDelete={handleDelete} />}
        </>
    )
}

export default CheckTableRow