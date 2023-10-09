import React, { useEffect, useState } from 'react'
import Input from '../Inputs/Input'
import Select from '../Inputs/Select'
import { dropdownCheckStatusData } from '../../data/MenuData'
import RegularButton from '../Buttons/RegularButton'
import { useDispatch } from 'react-redux'
import { getChecks, updateCheck } from '../../actions/checks'
import { Checks } from '../../_services/checks.service'

const CheckModal = ({ item, handleModal }) => {

    const [checkData, setCheckData] = useState({
        num: item ? item.num : '',
        status: item ? item.status : '',
    });

console.log('itemitemitemitem',item)
    
    const dispatch = useDispatch();



    useEffect(() => {
        if (item) setCheckData(item);
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Checks.updateCheck(item?.id, checkData)
          .then(() => {
            dispatch(getChecks());
            handleModal();
          })
          .catch((error) => {
            console.log('Error updating check:', error);
          });
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
                height: 'auto',
            }}>
                <div class="relative w-full max-w-2xl max-h-full">
                    <form onSubmit={handleSubmit} class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Cheque #{item.num}
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
                                        label="Numéro de chéque"
                                        placeholder="Numéro de chéque"
                                        defaultValue={item.num}
                                        type="text"
                                        form={true}
                                        onChange={(e) =>
                                            setCheckData({ ...checkData, num: e.target.value })
                                        }
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
                                        onChange={(e) =>
                                            setCheckData({ ...checkData, status: e.target.value })
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
    )
}

export default CheckModal