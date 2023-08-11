/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ContentWrapper from '../components/ContentWrapper'
// import { fournisseursData } from '../data/MockData'
import PageTitle from '../components/PageTitle'
import '../assets/css/Fournisseurs.css'
import RegularDivider from '../components/RegularDivider'
import { fournisseursColumnsData } from '../data/TableColumnsData'
import FournisseursTable from '../components/Tables/FournisseursTable'
import { useDispatch, useSelector } from "react-redux";
import { getFournisseurs } from '../actions/fournisseurs'

const Fournisseurs = () => {

  const fournisseurs = useSelector((state) => state.fournisseurs);

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getFournisseurs());
  }, []);

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
            rows={fournisseurs}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default Fournisseurs