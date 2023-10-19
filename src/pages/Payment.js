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

const Payment = () => {
  
  const fournisseurs = useSelector((state) => state.fournisseurs);

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  useEffect(() => {
    payment.getPaymentWithChecks()
      .then((data) => {
        setPaymentData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
        setLoading(false);
      });
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
  });

  const handleFiltersChange = (prop, value) => {
    setFilters({ ...Filters, [prop]: value });
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
  return (
    <ContentWrapper>
  <div className='check-wrapper'>
        <div>
          <PageTitle>Payments</PageTitle>
        </div>
        <RegularDivider />
        <form >
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
              options={checkTypeData || []}
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
        {loading ? (
          <Skeleton count={5} />
        ) : (
          <PaymentTable paymentData={paymentData} onViewChecks={onViewChecks} />
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
            />
          ) : (
            <PrintModalTraite
              item={onview}
              handleModal={() => setIsModalOpen(false)}
              fournisseurs={fournisseurs}
              settings={settings}
              showBottom={showBottom}

            />
          )}
        </div>
      )}
  </ContentWrapper>
  );
};

export default Payment;
