import React from 'react'
import CheckClientTableRow from './CheckClientTableRow'
import Skeleton from 'react-loading-skeleton'

const ChecksClientsTable = ({ columns, rows, fournisseurs, onSerach ,Filters,getData,setLoader,loader}) => {

console.log('Filters',rows)
    return (
        <>
        {loader  ? (
            <Skeleton count={5} />
        ) : (
        <div style={{
            width: '100%',
        }} class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div style={{
                padding: '20px'
            }} class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
                <label htmlFor="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        id="table-search-users" 
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Recherche..."
                        onChange={onSerach}
                        value={Filters?.keyword}
                    />
                </div>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
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
                    {rows?.length !== 0 ? rows?.map((item, index) => (
                        <CheckClientTableRow
                            key={index}
                            item={item}
                            fournisseurs={fournisseurs}
                            getData={getData}
                            setLoader={setLoader}
                        />
                    )) : (
                        <p className='no-data-msg'>Il n'y a pas de chèques..</p>
                    )}
                </tbody>
            </table>
        </div>
        )}
        </>

    )
}

export default ChecksClientsTable