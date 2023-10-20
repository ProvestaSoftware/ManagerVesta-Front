import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'

const PaymentTable = ({ paymentData, onViewChecks,onSerach ,Filters }) => {
  return (
    <div
      style={{
        width: '100%',
      }}
      className="relative overflow-x-auto shadow-md sm:rounded-lg"
    >
      <div
        style={{
          padding: '20px',
        }}
        className="flex items-center justify-between py-4 bg-white dark:bg-gray-800"
      >
        <div></div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Recherche..."
            onChange={onSerach}
            value={Filters?.keyword}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-2">Identifiant</th>
            <th className="py-2">Nom de Fournisseur</th>
            <th className="py-2">Montant Total</th>
            <th className="py-2">Nombre d'échéances</th>
            <th className="py-2">Créé le</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {paymentData?.length !== 0 ? (
           paymentData?.map((item, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-2 py-4">#{item?.num}</td>
                <td>{item?.checks[0]?.fournisseur?.nom}</td>
                <td className="px-6 py-4">{item?.montantTotal} dt</td>
                <td className="px-6 py-4">
                  <div
                    style={{
                      backgroundColor:
                        item?.checks[0]?.type === 'Chèque' ? '#00A3FF' : '#94C509',
                      color: '#ffffff',
                      borderRadius: '15px',
                      padding: '10px',
                      width: '100px',
                      height: 'auto',
                      textAlign: 'center',
                    }}
                  >
                    {item?.dueDatesNumber} {item?.checks[0]?.type}
                  </div>
                </td>
                <td style={{ width: '250px' }}>
                  {moment(item?.created_at).locale('fr').format('DD MMMM YYYY, HH:mm')}
                </td>
                <td className="flex items-center space-x-4 px-6 py-4">
                  <button
                    onClick={() => onViewChecks(item?.id)}
                    className="text-blue-500 hover:underline focus:outline-none btn_view"
                  >
                    <FontAwesomeIcon icon={faEye} /> 
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p className="no-data-msg">Il n'y a pas de chèques...</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
