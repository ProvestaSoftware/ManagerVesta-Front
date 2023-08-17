import React from 'react'
import PaymentCheckTableRow from './PaymentCheckTableRow'

const PaymentChecksTable = ({ columns, rows }) => {
    return (
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="p-4">
                        
                    </th>
                    {columns.map((item, index) => (
                        <th key={index} scope="col" class="px-6 py-3">
                            {item.value}
                        </th>
                    ))}
                    <th scope="col" class="px-6 py-3">

                    </th>
                </tr>
            </thead>
            <tbody>
                {rows.length !== 0 ? rows.map((item, index) => (
                    <PaymentCheckTableRow
                        key={index}
                        item={item}
                        index={index}
                        // fournisseurs={fournisseurs}
                    />
                )) : (
                    <p className='no-data-msg'>There are no checks...</p>
                )}
            </tbody>
        </table>

    )
}

export default PaymentChecksTable