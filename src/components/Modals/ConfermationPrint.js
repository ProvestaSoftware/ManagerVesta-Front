import React, { useState, useEffect } from 'react';
import atbImage from '../../assets/images/ATBcheck2.jpg';
import '../../assets/css/PrintModal.css';
import RegularButton from '../Buttons/RegularButton';
import moment from 'moment'

const ConfermationPrint = ({ item, handleModal, fournisseurs, settings,handleModalPrint }) => {

  return (
    <div style={{ position: 'fixed', top: 10, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <div style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, 0%)', padding: '20px', borderRadius: '8px', width: '800px', height: '90vh' }}>
        <div className="relative w-full max-h-full">
          <div className="relative bg-white rounded-lg dark:bg-gray-700">
            <div className="check-num-print flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cheque(s) &nbsp;
                {
                  item?.map((check, index) => 
                    <span key={'ChecksPrintModal'+index}>
                      {index > 0 && ', '}
                      #{check?.num} 
                    </span>
                  )}
              </h3>
              <button onClick={handleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6" style={{maxHeight: '70vh', overflowY: 'scroll'}}>
              aaaaaaa
            </div>
            <div className="check-inputs-print flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <RegularButton
                styleType="primary"
                type="submit"
                onClick={handleModalPrint}
              >
                Confirmer
              </RegularButton>
              <RegularButton
                styleType="secondary"  
                onClick={handleModal}   
              >
                Annuler
              </RegularButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfermationPrint;
