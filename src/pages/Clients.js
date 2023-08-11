import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import { clientsData } from '../data/MockData'
import PageTitle from '../components/PageTitle'
import '../assets/css/Clients.css'
import RegularDivider from '../components/RegularDivider'
import { clientsColumnsData } from '../data/TableColumnsData'
import ClientsTable from '../components/Tables/ClientsTable'

const Clients = () => {
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
                rows={clientsData}
              />
            </div>
          </div>
        </ContentWrapper>
    )
}

export default Clients