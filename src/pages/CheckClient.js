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
import ChecksClientsTable from '../components/Tables/ChecksClientsTable'
import { checksClientColumnsData } from '../data/TableColumnsData'
import { filterCheckClients, getChecksClients } from '../actions/checkClient'
import { getClients } from '../actions/clients'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { checkTypeData } from '../data/MockData'
import { AiOutlinePlus } from 'react-icons/ai'
import CheckFournisseurModal from '../components/Modals/CheckFournisseurModal'
import { ChecksClients } from '../_services/checksclients.service';

const CheckClient = () => {
  // const checkclient = useSelector((state) => state.checkClients);
  // console.log('____checkclient',checkclient)
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [Filters, setFilters] = useState({
    from: '',
    to: '',
    client: '',
    type: '',
    keyword:'',
  });


  const [checkclient, setCheckClient] = useState([]);
  
  const getData = () => {
    setLoader(true)
    ChecksClients.getAll()
      .then(res => {
        setCheckClient(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        // await dispatch(getChecksClients());
        await dispatch(getClients());
        getData();
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
    getData();
  };
  const handleFiltersChange = (prop, value) => {
    setFilters({ ...Filters, [prop]: value });
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      const filters = {
        from: Filters.from,
        to: Filters.to,
        client: Filters.client,
        type: Filters.type,
        keyword: Filters.keyword,
      };
      const filteredData = await ChecksClients.filterCheckClients(filters);
      setCheckClient(filteredData.checkClients);
    } catch (error) {
      console.error('Error while filtering data:', error);
    } finally {
      // Add any cleanup or finalization code here
      // This block will always run, whether there was an error or not
    }
  };
  return (
    <ContentWrapper>
      <div className='check-wrapper'>
        <div>
          <PageTitle>Chéques et traites clients</PageTitle>
          <RegularButton onClick={handleModal} styleType="add-btn">
                Ajouter Check Client
            <AiOutlinePlus className='btn-icon-right' />
          </RegularButton>
        </div>
        <RegularDivider />
        <form onSubmit={handleFilterSubmit}>
          <div className='check-form-container'>
            <Input
              label="Filtrer de:"
              placeholder="..."
              type="date"
              onChange={(e) => handleFiltersChange('from', e.target.value)}
            />
            <Input
              label="Jusqu'à:"
              placeholder="..."
              type="date"
              onChange={(e) => handleFiltersChange('to', e.target.value)}
            />
            <Select
              label="Client:"
              title="Recherche clients"
              options={clients}
              onChange={(e) => handleFiltersChange('client', e.target.value)}
            />
            <Select
              label="Type d'impression:"
              title="Tous (Chéques et Traites)"
              options={checkTypeData}
              onChange={(e) => handleFiltersChange('type', e.target.value)}
            />
            <RegularButton
              styleType="filter-btn"
            >
              <AiFillFilter className='btn-icon-left' />
              Filtrer
            </RegularButton>
          </div>
        </form>
        {loader ? (
          <Skeleton count={5} />
        ) : (
          <ChecksClientsTable
            columns={checksClientColumnsData}
            rows={checkclient.length ? checkclient : checkclient}
            getData={getData}
            onSerach={(e) => handleFiltersChange('keyword', e.target.value)}
            Filters={Filters}
            setLoader={setLoader}
          />
        )}
      </div>
      {modal && <CheckFournisseurModal handleModal={handleModal} clients={clients} getData={getData} />}

    </ContentWrapper>
  )
}

export default CheckClient