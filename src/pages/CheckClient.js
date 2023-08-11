import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import Select from '../components/Inputs/Select'
import Input from '../components/Inputs/Input'
import { checksData, clientsData } from '../data/MockData'
import RegularButton from '../components/Buttons/RegularButton'
import PageTitle from '../components/PageTitle'
import { AiFillFilter } from 'react-icons/ai'
import '../assets/css/CheckClient.css'
import RegularDivider from '../components/RegularDivider'
import ChecksTable from '../components/Tables/ChecksTable'
import { checksColumnsData } from '../data/TableColumnsData' 

const CheckClient = () => {
  return (
    <ContentWrapper>
      <div className='check-wrapper'>
        <div>
          <PageTitle>Chéques et traites clients</PageTitle>
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
              label="Client:"
              title="Recherche clients"
              options={clientsData}
            />
            <Select
              label="Type d'impression:"
              title="Tous (Chéques et Traites)"
              options={clientsData}
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

export default CheckClient