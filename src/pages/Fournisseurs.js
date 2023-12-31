/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
// import { fournisseursData } from '../data/MockData'
import PageTitle from '../components/PageTitle'
import '../assets/css/Fournisseurs.css'
import RegularDivider from '../components/RegularDivider'
import { fournisseursColumnsData } from '../data/TableColumnsData'
import FournisseursTable from '../components/Tables/FournisseursTable'
import { useDispatch, useSelector } from "react-redux";
import { getFournisseurs, searchFournisseurs } from '../actions/fournisseurs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import RegularButton from '../components/Buttons/RegularButton'
import { AiOutlinePlus } from 'react-icons/ai'
import FournisseurModal from '../components/Modals/FournisseurModal'

const Fournisseurs = () => {

  const fournisseurs = useSelector((state) => state.fournisseurs);
  const [loader, setLoader] = useState(false);
  const searchKeyword = useSelector((state) => state.searchKeyword); 
  const [loadingSearch, setLoadingSearch] = useState(false); 

  const refreshFournisseursList = async () => {
    try {
      await dispatch(getFournisseurs());
    } catch (error) {
      console.log('Error refreshing fournisseurs list:', error);
    }
  };

  const handleSearchChange = async (prop, value) => {
    try {
      setLoadingSearch(true); 
      if (prop === searchKeyword) {
        await dispatch(searchFournisseurs(value));
      }
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoadingSearch(false);
    }
  };
  useEffect(() => {
    if (searchKeyword) {
      handleSearchChange();
    }
  }, [searchKeyword]);

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  }

  const dispatch = useDispatch();

  useEffect(async () => {
    await setLoader(true);
    await dispatch(getFournisseurs());
    await setLoader(false);
  }, []);

  return (
    <ContentWrapper>
      <div className='fournisseur-wrapper'>
        <div>
          <PageTitle>Liste des fournisseurs</PageTitle>
          <RegularButton onClick={handleModal} styleType="add-btn">
            Ajouter Fournisseur
            <AiOutlinePlus className='btn-icon-right' />
          </RegularButton>
        </div>
        <RegularDivider />
        {loader ? (
          <Skeleton count={5} />
        ) : (
          <FournisseursTable
            columns={fournisseursColumnsData}
            rows={fournisseurs || [] }
            onSearch={(keyword) => handleSearchChange(searchKeyword, keyword)}
            searchKeyword={searchKeyword}
            loadingSearch={loadingSearch}
          />
        )}
      </div>
      {modal && <FournisseurModal handleModal={handleModal} refreshFournisseursList={refreshFournisseursList} />}
    </ContentWrapper>
  )
}

export default Fournisseurs