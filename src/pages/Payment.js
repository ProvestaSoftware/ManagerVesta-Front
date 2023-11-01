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
import PaymentTable from '../components/Tables/PaymentTable';
import { payment } from '../_services/payment';
import PrintModal from '../components/Modals/PrintModal';
import PrintModalTraite from '../components/Modals/PrintModalTraite'
import { SettingService } from '../_services/setting.service';
import { ImprimanteService } from '../_services/imprimante.service';

const Payment = () => {
  
  const fournisseurs = useSelector((state) => state.fournisseurs);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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
        setLoading(true);
           refreshFournisseursList();
        await dispatch(getChecks());
        await dispatch(getFournisseurs());
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const [paymentData, setPaymentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBottom, setShowBottom] = useState(true);
const getData = () => {
  payment.getPaymentWithChecks()
  .then((data) => {
    setPaymentData(data.data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching payment data:', error);
    setLoading(false);
  });

}
  useEffect(() => {
    getData()
  }, []);

  const [onview, setOnView] = useState(null);

  const onViewChecks = (paymentId) => {
    payment.viewChecks(paymentId)
      .then((data) => {
        setOnView(data.data)
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching checks:', error);
      });
  };

  const [Filters, setFilters] = useState({
    from: '',
    to: '',
    fournisseur: '',
    type: '',
    keyword: '',
    Nom_de: '',
    Nom_a: '',
  });
  const handleFiltersChange = (prop, value) => {
    setFilters({ ...Filters, [prop]: value });
  };
  const [filtrage, setFiltrage] = useState(null);
  
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const filteredData = await payment.filterPayments(Filters);
        setFiltrage(filteredData.payment);
    } catch (error) {
      console.error('Error filtering payments:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const [settingimprimante,setSettingImprimante] =useState(null)
  const getImprimanteId = () => {
    const selectedPrinterId = localStorage.getItem('selectedPrinterId');
    if (selectedPrinterId) {
      ImprimanteService.getById(selectedPrinterId) 
        .then((imprimante) => {
          setSettingImprimante(imprimante.data);
        })
        .catch((error) => {
          console.error('Error retrieving selected Imprimante:', error);
        });
    }
  }
  useEffect(() => {
    getImprimanteId()
  }, []);

  return (
    <ContentWrapper>
  <div className='check-wrapper'>
        <div>
          <PageTitle>Payments</PageTitle>
        </div>
        <RegularDivider />
        <form onSubmit={(e) => handleFilterSubmit(e)}>
          <div className='check-form-container'>
            <Input
              label="Filtrer de:"
              placeholder="..."
              type="date"
              value={Filters.from}
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
              value={Filters.fournisseur}
              onChange={(e) => handleFiltersChange('fournisseur', e.target.value)}
            />
            <Select
              label="Type d'impression:"
              title="Tous (Chéques et Traites)"
              options={checkTypeData || []}
              value={Filters.type}
              onChange={(e) => handleFiltersChange('type', e.target.value)}
            />
            <br />
            <Input
              label="Nom d'échéance, de:"
              placeholder="..."
              value={Filters.Nom_de}
              onChange={(e) => handleFiltersChange('Nom_de', e.target.value)}
            />
            <Input
              label="Nom d'échéance, a:"
              placeholder="..."
              value={Filters.Nom_a}
              onChange={(e) => handleFiltersChange('Nom_a', e.target.value)}
            />
            <RegularButton styleType="filter-btn" type="submit">
              <AiFillFilter className='btn-icon-left' />
              Filtrer
            </RegularButton>
          </div>
        </form>


        {loading ? (
          <Skeleton count={5} />
        ) : (
          <PaymentTable
             paymentData={filtrage || paymentData} 
             onViewChecks={onViewChecks}
             onSerach={(e) => handleFiltersChange('keyword', e.target.value)}
             Filters={Filters}
             getData={getData}
             settingimprimante={settingimprimante}
           />
        )}
      </div>
      {isModalOpen && (
        <div>
          {onview[0]?.type === 'Chèque' ? (
            <PrintModal
              item={onview}
              handleModal={() => 
                      setIsModalOpen(false)}
              fournisseurs={fournisseurs}
              settings={settings}
              showBottom={showBottom}
              settingimprimante={settingimprimante}
            />
          ) : (
            <PrintModalTraite
              item={onview}
              handleModal={() => setIsModalOpen(false)}
              fournisseurs={fournisseurs}
              settings={settings}
              showBottom={showBottom}
              settingimprimante={settingimprimante}

            />
          )}
        </div>
      )}
  </ContentWrapper>
  );
};

export default Payment;
