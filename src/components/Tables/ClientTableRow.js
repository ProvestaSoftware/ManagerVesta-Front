/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteClient, getClients } from '../../actions/clients';
import ClientModal from '../Modals/ClientModal';
import ConfirmModal from '../Modals/ConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const ClientTableRow = ({ item, index, color }) => {

    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    }

    const handleConfirm = () => {
        setConfirm(!confirm);
    }

    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          await dispatch(deleteClient(item.id));
          await dispatch(getClients());
          handleConfirm();
        } catch (error) {
          console.error('Error deleting client:', error);
        } finally {
          setLoading(false);
        }
      };

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: false
    };

    const created_at = new Date(item.created_at);

    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3');
      };
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
                    {formatPhoneNumber(item.numTel)}
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
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_edit" onClick={handleModal}><FontAwesomeIcon icon={faEdit} /></button>
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_delete" onClick={handleConfirm}><FontAwesomeIcon icon={faTrash} /></button>
                    
                </td>
            </tr>
            
            {modal && <ClientModal item={item} handleModal={handleModal} />}
            {confirm && <ConfirmModal name={`Client ${item.nom} | ${item.email}`} handleModal={handleConfirm} handleDelete={handleDelete} loading={loading} />}
        </>
    )
}

export default ClientTableRow