/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import CheckModal from '../Modals/CheckModal';
import { useDispatch } from 'react-redux';
import { deleteCheck, getChecks } from '../../actions/checks';
import ConfirmModal from '../Modals/ConfirmModal';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faPrint,faRecycle } from '@fortawesome/free-solid-svg-icons';
import PrintModal from '../Modals/PrintModal';
import PrintModalTraite from '../Modals/PrintModalTraite';
import { SettingService } from '../../_services/setting.service';
import { useEffect } from 'react';

const CheckTableRow = ({ item, fournisseurs ,settings,key}) => {

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

    const created_at = new Date(item?.created_at);
 
    const state_colors = {
        'En attente' : '#333333',
        'Impayé' : '#D30606',
        'Payé' : '#13AB50'
    }
    const [showPrintModal, setShowPrintModal] = useState(false);

        const handlePrintModal = () => {
        setShowPrintModal(!showPrintModal);
        };

        const formatNumberWithSpaces = (number) => {
            return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          };
         
    return (
        <>
            <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`} style={{ backgroundColor: item.is_deleted === 1 ? 'rgb(252, 102, 129)' : '',color: item.is_deleted === 1 ? 'white' : '' }}> 
                <td class="px-6 py-4">
                  #{item?.num} aa {key}
                </td>
                <td class="px-6 py-4">
                    {formatNumberWithSpaces(item?.montant)} dt
                </td>
                <td class="px-6 py-4">
                    {item?.fournisseur?.nom}
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
                            item.is_deleted === 1 ? (
                                <span style={{color: 'white'}}>
                                    {moment(item?.dueDate).locale('fr').format("DD MMMM YYYY")}
                                </span>
                            ) : moment(item.dueDate).diff(moment(), 'days') <= 0 ? (
                                <span style={{color: '#D30606'}}>
                                    {moment(item?.dueDate).locale('fr').format("DD MMMM YYYY")}
                                </span>
                            ) : moment(item.dueDate).diff(moment(), 'days') <= 14 ? (
                                <span style={{color: 'orange'}}>
                                    {moment(item?.dueDate).locale('fr').format("DD MMMM YYYY")}
                                </span>
                            ) : (
                                <span>
                                    {moment(item?.dueDate).locale('fr').format("DD MMMM YYYY")}
                                </span>
                            )
                        }
                    </td>

                <td class="px-6 py-4">
                    <b style={{color: state_colors[item?.status]}}>
                        {item?.status}
                    </b>
                </td>
                <td className="flex items-center space-x-4 px-6 py-4">
                    <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_imprime"
                        onClick={handlePrintModal}
                        >
                        <FontAwesomeIcon icon={faPrint} />
                    </button>
                    <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_edit"
                        onClick={handleModal}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {item.is_deleted === 1 ? (
                            <button
                                className="font-medium text-green-600 dark:text-green-500 hover:text-green-700 hover:underline btn_recover btn_record" 
                                onClick={handleConfirm} 
                            >
                                <FontAwesomeIcon icon={faRecycle} style={{ color: 'green' }} />
                            </button>
                        ) : (
                            <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline btn_delete"
                                onClick={handleConfirm}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                    )}
                </td>
            </tr>
            {modal && <CheckModal item={item} handleModal={handleModal} />}
            {confirm && <ConfirmModal name={`${item.type} #${item.num}`} handleModal={handleConfirm} handleDelete={handleDelete} is_deleted={item.is_deleted} />}

            {showPrintModal && (
            item.type === 'Chèque' ? (
                <PrintModal
                handleModal={() => setShowPrintModal(false)}
                fournisseurs={fournisseurs}
                item={ [item] }
                settings={settings}
                showBottom={true}
                />
            ) : (
                <PrintModalTraite
                    handleModal={() => setShowPrintModal(false)}
                    fournisseurs={fournisseurs}
                    item={ [item] }
                    settings={settings}
                    showBottom={true}
                />
            )
            )}
        </>
    )
}

export default CheckTableRow