import React, { useState, useEffect } from 'react';
import { ResponsiveFunnel } from '@nivo/funnel';

const TopFournisseursChart = ({ fournisseurs, checks }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fournisseurCheckCounts = {};

        checks.forEach(check => {
            const fournisseurId = check.fournisseur_id;
            if (fournisseurCheckCounts[fournisseurId]) {
                fournisseurCheckCounts[fournisseurId]++;
            } else {
                fournisseurCheckCounts[fournisseurId] = 1;
            }
        });

        const chartData = fournisseurs.map(fournisseur => ({
            id: fournisseur.id.toString(),
            label: fournisseur.nom,
            value: fournisseurCheckCounts[fournisseur.id] || 0,
        }));

        setData(chartData);
    }, [fournisseurs, checks]);

    return (
        <div style={{ height: '400px' }}>
            <ResponsiveFunnel
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                valueFormat=".0f"
                colors={{ scheme: 'spectral' }}
                borderWidth={20}
                labelColor={{
                    from: 'color',
                    modifiers: [['darker', 3]],
                }}
                beforeSeparatorLength={100}
                beforeSeparatorOffset={20}
                afterSeparatorLength={100}
                afterSeparatorOffset={20}
                currentPartSizeExtension={10}
                currentBorderWidth={40}
                motionConfig="wobbly"
            />
        </div>
    );
};

export default TopFournisseursChart;
