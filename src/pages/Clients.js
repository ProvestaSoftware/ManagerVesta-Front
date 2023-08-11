/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ContentWrapper from '../components/ContentWrapper'
// import { clientsData } from '../data/MockData'
import PageTitle from '../components/PageTitle'
import '../assets/css/Clients.css'
import RegularDivider from '../components/RegularDivider'
import { clientsColumnsData } from '../data/TableColumnsData'
import ClientsTable from '../components/Tables/ClientsTable'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getClients } from '../actions/clients'

const Clients = () => {

  const clients = useSelector((state) => state.clients);

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getClients());
  }, []);

  return (
    <ContentWrapper>
      <div className='client-wrapper'>
        <div>
          <PageTitle>Liste des clients</PageTitle>
        </div>
        <RegularDivider />
        <div className='client-table-wrapper'>
          <ClientsTable
            columns={clientsColumnsData}
            rows={clients}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default Clients