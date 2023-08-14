/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import Select from '../components/Inputs/Select'
import Input from '../components/Inputs/Input'
// import { checksData, clientsData } from '../data/MockData'
import RegularButton from '../components/Buttons/RegularButton'
import PageTitle from '../components/PageTitle'
import { AiFillFilter } from 'react-icons/ai'
import '../assets/css/CheckClient.css'
import RegularDivider from '../components/RegularDivider'
import ChecksTable from '../components/Tables/ChecksTable'
import { checksColumnsData } from '../data/TableColumnsData'
import { getChecks } from '../actions/checks'
import { getClients } from '../actions/clients'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CheckClient = () => {

  const checks = useSelector((state) => state.checks);
  const clients = useSelector((state) => state.clients);
  const [loader, setLoader] = useState(false);

  // console.log(checks);

  const dispatch = useDispatch();

  useEffect(async () => {
    await setLoader(true);
    await dispatch(getChecks());
    await dispatch(getClients());
    await setLoader(false);
  }, []);

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
              options={clients}
            />
            <Select
              label="Type d'impression:"
              title="Tous (Chéques et Traites)"
              options={clients}
            />
            <RegularButton
              styleType="filter-btn"
            >
              <AiFillFilter className='btn-icon' />
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
            fournisseurs={clients}
          />
        )}
      </div>
    </ContentWrapper>
  )
}

export default CheckClient