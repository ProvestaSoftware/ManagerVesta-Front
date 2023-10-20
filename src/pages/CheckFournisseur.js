import React, { useEffect, useState } from 'react';
import ContentWrapper from '../components/ContentWrapper';
import Select from '../components/Inputs/Select';
import Input from '../components/Inputs/Input';
import { checkTypeData } from '../data/MockData';
import RegularButton from '../components/Buttons/RegularButton';
import PageTitle from '../components/PageTitle';
import { AiFillFilter } from 'react-icons/ai';
import '../assets/css/CheckFournisseur.css';
import RegularDivider from '../components/RegularDivider';
import ChecksTable from '../components/Tables/ChecksTable';
import { checksColumnsData } from '../data/TableColumnsData';
import { useDispatch, useSelector } from 'react-redux';
import { getChecks, filterFournisseurChecks} from '../actions/checks';
import { getFournisseurs } from '../actions/fournisseurs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SettingService } from '../_services/setting.service';

const CheckFournisseur = () => {
  const checks = useSelector((state) => state.checks);
  const fournisseurs = useSelector((state) => state.fournisseurs);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [Filters, setFilters] = useState({
    from: '',
    to: '',
    fournisseur: '',
    type: '',
    keyword: '', 
  });

  const handleFiltersChange = (prop, value) => {
    setFilters({ ...Filters, [prop]: value });
  };

  if (Filters.type == 1 ){
    Filters.type='Chèque'
    
  }else if(Filters.type == 2){
    Filters.type='Traite'
  }

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      await dispatch(filterFournisseurChecks(Filters));
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  const refreshFournisseursList = async () => {
    try {
      await dispatch(getFournisseurs());
    } catch (error) {
      console.log('Error refreshing fournisseurs list:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
           refreshFournisseursList();
        await dispatch(getChecks());
        await dispatch(getFournisseurs());
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const [settings, setSettings] = useState(null);
  
  const getCurrentCheckNumber = async () => {
      try {
          const settingData = await SettingService.index();
          if (settingData && settingData.data.current_cheque_number) {
          setSettings(settingData.data);
          }
      } catch (error) {
          console.error('Error fetching current check number:', error);
      }
  };

    useEffect(() => {
      getCurrentCheckNumber();
    }, []);

  return (
    <ContentWrapper>
      <div className='check-wrapper'>
        <div>
          <PageTitle>Chéques et traites fournisseurs</PageTitle>
        </div>
        <RegularDivider />
        <form onSubmit={handleFilterSubmit}>
          <div className='check-form-container'>
            <Input
              label="Filtrer de:"
              placeholder="..."
              type="date"
              value={Filters?.from}
              onChange={(e) => handleFiltersChange('from', e.target.value)}
            />
            <Input
              label="Jusqu'à:"
              placeholder="..."
              type="date"
              value={Filters.to}
              onChange={(e) => handleFiltersChange('to', e.target.value)}
            />
            <Select
              label="Fournisseur:"
              title="Tous (Fournisseur)"
              options={fournisseurs || []}
              value={Filters?.fournisseur}
              onChange={(e) => handleFiltersChange('fournisseur', e.target.value)}
            />
            <Select
              label="Type d'impression:"
              title="Tous (Chéques et Traites)"
              options={checkTypeData || []}
              value={Filters?.type}
              onChange={(e) => handleFiltersChange('type', e.target.value)}
            />
            <RegularButton styleType="filter-btn" type="submit">
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
            rows={Filters.length ? Filters : checks}
            fournisseurs={fournisseurs}
            onSerach={(e) => handleFiltersChange('keyword', e.target.value)}
            Filters={Filters}
            settings={settings}
            />
        )}
      </div>
    </ContentWrapper>
  );
};

export default CheckFournisseur;
