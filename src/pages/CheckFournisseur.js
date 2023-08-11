import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import Select from '../components/Inputs/Select'
import Input from '../components/Inputs/Input'
import { checksData, fournisseursData } from '../data/MockData'
import RegularButton from '../components/Buttons/RegularButton'
import PageTitle from '../components/PageTitle'
import { AiFillFilter } from 'react-icons/ai'
import '../assets/css/CheckFournisseur.css'
import RegularDivider from '../components/RegularDivider'
import ChecksTable from '../components/Tables/ChecksTable'
import { checksColumnsData } from '../data/TableColumnsData' 

const CheckFournisseur = () => {
  return (
    <ContentWrapper>
      <div className='check-wrapper'>
        <div>
          <PageTitle>Chéques et traites fournisseurs</PageTitle>
        </div>
        <RegularDivider />
        <form>
          <div className='check-form-container'>
            <Input
              label="Filtrer de:"
              placeholder="..."
              type="date"
            />
            <Input
              label="Jusqu'à:"
              placeholder="..."
              type="date"
            />
            <Select
              label="Fournisseur:"
              title="Recherche fournisseurs"
              options={fournisseursData}
            />
            <Select
              label="Type d'impression:"
              title="Tous (Chéques et Traites)"
              options={fournisseursData}
            />
            <RegularButton
              styleType="filter-btn"
            >
              <AiFillFilter className='btn-icon' />
              Filtrer
            </RegularButton>
          </div>
        </form>
        <div className='check-table-wrapper'>
          <ChecksTable
            columns={checksColumnsData}
            rows={checksData}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default CheckFournisseur