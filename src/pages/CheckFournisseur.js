/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import Select from '../components/Inputs/Select'
import Input from '../components/Inputs/Input'
import {
  checkTypeData,
  // checksData,
  // fournisseursData
} from '../data/MockData'
import RegularButton from '../components/Buttons/RegularButton'
import PageTitle from '../components/PageTitle'
import { AiFillFilter } from 'react-icons/ai'
import '../assets/css/CheckFournisseur.css'
import RegularDivider from '../components/RegularDivider'
import ChecksTable from '../components/Tables/ChecksTable'
import { checksColumnsData } from '../data/TableColumnsData'
import { useDispatch, useSelector } from 'react-redux'
import { getChecks } from '../actions/checks'
import { getFournisseurs } from '../actions/fournisseurs'

const CheckFournisseur = () => {

  const checks = useSelector((state) => state.checks);
  const fournisseurs = useSelector((state) => state.fournisseurs);

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getChecks());
    await dispatch(getFournisseurs());
  }, []);

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
              options={fournisseurs}
            />
            <Select
              label="Type d'impression:"
              title="Tous (Chéques et Traites)"
              options={checkTypeData}
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
            rows={checks}
            fournisseurs={fournisseurs}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default CheckFournisseur