import React from 'react'
import ClientTableRow from './ClientTableRow'
import Skeleton from 'react-loading-skeleton';

function getBankColor(bank_name) {
    switch( bank_name ){
        case 'ATB':
            return '#123456'
        default:
            return '#888888';
    }
}

const ClientsTable = ({ columns, rows,onSearch,searchKeyword,loadingSearch }) => {

    return (
        <div style={{
            width: '100%',
        }} class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div style={{
                padding: '20px'
            }} class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
                <div>
                    {/* <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span class="sr-only">Action button</span>
                        Action
                        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                            <li>
                                <a href="/" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Action 1</a>
                            </li>
                            <li>
                                <a href="/" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Action 2</a>
                            </li>
                            <li>
                                <a href="/" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Action 3</a>
                            </li>
                        </ul>
                        <div class="py-1">
                            <a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Other Action</a>
                        </div>
                    </div> */}
                </div>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        id="table-search-users" 
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Search for clients" 
                        value={searchKeyword}
                        onChange={(e) => onSearch(e.target.value)} 
                    />
                </div>
            </div>
            {loadingSearch ? (
                <Skeleton count={5} />
            ) : (
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">

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
                        <ClientTableRow
                            key={index}
                            index={index}
                            item={item}
                            color={getBankColor(item.banque)}
                        />
                    )) : (
                        <p className='no-data-msg'>There are no clients...</p>
                    )}
                </tbody>
            </table>
            )}
        </div>

    )
}

export default ClientsTable