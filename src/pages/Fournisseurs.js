import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import { fournisseursData } from '../data/MockData'
import PageTitle from '../components/PageTitle'
import '../assets/css/Fournisseurs.css'
import RegularDivider from '../components/RegularDivider'
import { fournisseursColumnsData } from '../data/TableColumnsData'
import FournisseursTable from '../components/Tables/FournisseursTable'

const Fournisseurs = () => {
    return (
        <ContentWrapper>
          <div className='fournisseur-wrapper'>
            <div>
              <PageTitle>Liste des fournisseurs</PageTitle>
            </div>
            <RegularDivider />
            <div className='fournisseur-table-wrapper'>
              <FournisseursTable
                columns={fournisseursColumnsData}
                rows={fournisseursData}
              />
            </div>
          </div>
        </ContentWrapper>
    )
}

export default Fournisseurs