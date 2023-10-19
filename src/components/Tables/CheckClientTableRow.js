/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import CheckClientModal from '../Modals/CheckClientModal';
import { useDispatch } from 'react-redux';
import { deleteCheckClient } from '../../actions/checkClient';
import ConfirmModal from '../Modals/ConfirmModal';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const CheckClientTableRow = ({ item,getData,setLoader}) => {

    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    }

    const handleConfirm = () => {
        setConfirm(!confirm);
        
    }

    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        setLoader(true);
        e.preventDefault();
        try {
          await dispatch(deleteCheckClient(item.id));
          getData();
          handleConfirm();
        } catch (error) {
          
          console.error("Error deleting check:", error);
        } finally {
          setLoader(false); 
        }
      };

    const created_at = new Date(item?.created_at);

 
    const state_colors = {
        'En attente' : '#333333',
        'Impayé' : '#D30606',
        'Payé' : '#13AB50'
    }

    return (
        <>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                    #{item?.num}
                </td>
                <td class="px-6 py-4">
                    {item?.montant} dt
                </td>
                <td class="px-6 py-4">
                    {item?.client?.nom}
                </td>
                <td class="px-6 py-4">
                    <div style={{
                        backgroundColor: item?.type === 'Chèque' ? '#00A3FF' : '#94C509',
                        color: '#ffffff',
                        borderRadius: '15px',
                        padding: '10px',
                        width: '80px',
                        height: 'auto',
                        textAlign: 'center'
                    }}>
                        {item?.type}
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
                                    moment(item?.dueDate).locale('fr').format("DD MMMM YYYY")
                                }
                            </span>
                        :
                            moment(item.dueDate).diff( moment(), 'days' ) <= 14 ?
                                <span style={{color: 'orange'}}>
                                    {
                                        moment(item?.dueDate).locale('fr').format("DD MMMM YYYY")
                                    }
                                </span>
                            :
                                <span>
                                    {
                                        moment(item?.dueDate).locale('fr').format("DD MMMM YYYY")
                                    }
                                </span>
                    }
                </td>
                <td class="px-6 py-4">
                    <b style={{color: state_colors[item?.status]}}>
                        {item?.status}
                    </b>
                </td>
                <td class="flex items-center space-x-4 px-6 py-4">
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_edit" onClick={handleModal}><FontAwesomeIcon icon={faEdit} /></button>
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_delete" onClick={handleConfirm}><FontAwesomeIcon icon={faTrash} /></button>
                </td>
            </tr>
            {modal && <CheckClientModal item={item} handleModal={handleModal} getData={getData} setLoader={setLoader} />}
            {confirm && <ConfirmModal name={`Chèque #${item.num}`} handleModal={handleConfirm} handleDelete={handleDelete} />}
        </>
    )
}

export default CheckClientTableRow