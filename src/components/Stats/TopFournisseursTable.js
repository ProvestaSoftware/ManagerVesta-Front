import React, { useState, useEffect } from 'react';
import Header from '../Header';

const TopFournisseursTable = ({ fournisseurs, checks }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fournisseurCheckCounts = {};
    
        checks?.forEach(check => {
            const fournisseurId = check?.fournisseur_id;
            if (fournisseurCheckCounts[fournisseurId]) {
                fournisseurCheckCounts[fournisseurId]++;
            } else {
                fournisseurCheckCounts[fournisseurId] = 1;
            }
        });
    
        const tableData = fournisseurs.map(fournisseur => ({
            id: fournisseur?.id.toString(),
            nom: fournisseur?.nom,
            email: fournisseur?.email,
            numberOfChecks: fournisseurCheckCounts[fournisseur?.id] || 0,
        }));
    
        const sortedTableData = tableData.sort((a, b) => b.numberOfChecks - a.numberOfChecks);
    
    
        setData(sortedTableData);
    }, []);

    return (
        <div style={{ height: 'auto' ,marginTop:'80px'}}>
            <Header title="TOP Fournisseurs" subtitle="Par Nombre de Ch/Tr" />
            <div style={{
                marginTop: '20px',
                height: '400px',
                overflowY: 'scroll'
            }} class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">

                            </th>
                            <th scope="col" class="px-6 py-3">
                                Fournisseur
                            </th>
                            {/* <th scope="col" class="px-6 py-3">
                                Email
                            </th> */}
                            <th scope="col" class="px-6 py-3">
                                Total chèques
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item?.id+'fornisseurtable'} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="px-6 py-4">
                                    {index + 1}.
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.nom}
                                </th>
                                {/* <td class="px-6 py-4">
                                    {item.email}
                                </td> */}
                                <td class="px-6 py-4">
                                    {item.numberOfChecks}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopFournisseursTable;
