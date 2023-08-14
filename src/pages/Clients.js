/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import RegularButton from '../components/Buttons/RegularButton'
import { AiOutlinePlus } from 'react-icons/ai'
import ClientModal from '../components/Modals/ClientModal'

const Clients = () => {

  const clients = useSelector((state) => state.clients);
  const [loader, setLoader] = useState(false);

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  }

  const dispatch = useDispatch();

  useEffect(async () => {
    await setLoader(true);
    await dispatch(getClients());
    await setLoader(false);
  }, []);

  return (
    <ContentWrapper>
      <div className='client-wrapper'>
        <div>
          <PageTitle>Liste des clients</PageTitle>
          <RegularButton onClick={handleModal} styleType="add-btn">
            Ajouter Client
            <AiOutlinePlus className='btn-icon-right' />
          </RegularButton>
        </div>
        <RegularDivider />
        {loader ? (
          <Skeleton count={5} />
        ) : (
          <ClientsTable
            columns={clientsColumnsData}
            rows={clients}
          />
        )}
      </div>
      {modal && <ClientModal handleModal={handleModal} />}
    </ContentWrapper>
  )
}

export default Clients