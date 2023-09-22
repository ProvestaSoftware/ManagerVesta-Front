import React, { useEffect } from 'react'
import '../../assets/css/StatCard.css'
import { StatistiqueService } from '../../_services/statistique.service';
import { useState } from 'react';

const StatCard = ({ item }) => {
    return (
        <div style={{
            color: item?.color,
            backgroundColor: item?.backgroundColor
        }} class="max-w-sm p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='stat-icon'>
                {item?.icon}
            </div>
            <h5 style={{
                color: item?.color,
                fontSize: '18px'
            }} class="mb-2 text-2xl font-semibold tracking-tight">{item?.title}</h5>
            {item?.divider}
            <p style={{
                color: item.color,
                fontSize: '28px'
            }} class="mb-3 font-normal">{item?.amount} {item?.unity}</p>
        </div>
    )
}

export default StatCard