/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
import { getFournisseurs, filterFournisseurChecks } from '../actions/fournisseurs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CheckFournisseur = () => {

  const checks = useSelector((state) => state.checks);
  const fournisseurs = useSelector((state) => state.fournisseurs);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(async () => {
    await setLoader(true);
    await dispatch(getChecks());
    await dispatch(getFournisseurs());
    await setLoader(false);
  }, []);

  const [Filters, setFilters] = useState({});
  const hangdleFilters = (prop, value) => {
    setFilters({ ...Filters, [prop]: value });
  };

  const RunFilters = (e) => {
    e.preventDefault()
    dispatch(filterFournisseurChecks(Filters));
  }

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
              required={false}
              onChange={(e) => hangdleFilters('from', e.target.value)}
            />
            <Input
              label="Jusqu'à:"
              placeholder="..."
              type="date"
              required={false}
              onChange={(e) => hangdleFilters('to', e.target.value)}
            />
            <Select
              label="Fournisseur:"
              title="Recherche fournisseurs"
              options={fournisseurs}
              required={false}
              onChange={(e) => hangdleFilters('fournisseur', e.target.value)}
            />
            <Select
              label="Type d'impression:"
              title="Tous (Chéques et Traites)"
              options={checkTypeData}
              required={false}
              onChange={(e) => hangdleFilters('type', e.target.value)}
            />
            <RegularButton
              styleType="filter-btn"
              onClick={(e) => RunFilters(e)}
            >
              <AiFillFilter className='btn-icon-left' />
              Filtrer
            </RegularButton>
          </div>
        </form>
        {loader ? (
          <Skeleton count={5} />
        ) : (
          <ChecksTable
            columns={checksColumnsData}
            rows={checks}
            fournisseurs={fournisseurs}
            onSearch={(e) => hangdleFilters('search_keyword', e.target.value)}
          />
        )}
      </div>
    </ContentWrapper>
  )
}

export default CheckFournisseur