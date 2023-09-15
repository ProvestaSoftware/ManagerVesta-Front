/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import PageTitle from '../components/PageTitle'
import '../assets/css/Print.css'
import RegularButton from '../components/Buttons/RegularButton'
import Input from '../components/Inputs/Input'
import Select from '../components/Inputs/Select'
// import { fournisseursData } from '../data/MockData'
import { BsCheckLg, BsWindowDock } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaSave } from 'react-icons/fa'
import RegularLink from '../components/RegularLink'
import RegularDivider from '../components/RegularDivider'
import { useDispatch, useSelector } from 'react-redux'
import { getFournisseurs } from '../actions/fournisseurs'
import FournisseurModal from '../components/Modals/FournisseurModal'
import { createPayment, getPayments } from '../actions/payments'
import { createCheck, getChecks } from '../actions/checks'
import PaymentChecksTable from '../components/Tables/PaymentChecksTable'
import { paymentChecksData } from '../data/TableColumnsData'
import { Checks } from '../_services/checks.service';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom'

const Print = () => {

  const fournisseurs = useSelector((state) => state.fournisseurs);
  const checks = useSelector((state) => state.checks);
  const [numberOfChecks, setNumberOfChecks] = useState(); 
  const navigate = useNavigate();
  
  const refreshFournisseursList = async () => {
    try {
      await dispatch(getFournisseurs());
    } catch (error) {
      console.log('Error refreshing fournisseurs list:', error);
    }
  };

  const handleChangeNumberOfChecks = (e) => {
    const newNumberOfChecks = parseInt(e.target.value, 10);
    setNumberOfChecks(newNumberOfChecks);
  };
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  }

  const [filteredData, setFilteredData] = useState([]);

  const filterDataByFournisseurId = (entryData, fournisseurId) => {
    const filteredArray = entryData.filter(entry => entry.fournisseur_id === parseInt(fournisseurId));
    setFilteredData(filteredArray);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFournisseurs());
    dispatch(getChecks());
    dispatch(getPayments());
  }, []);

  const [checkGroupData, setCheckGroupData] = useState([]);

  const [paymentData, setPaymentData] = useState({
    montantTotal: '',
    dueDatesNumber: '',
    fournisseur_id: '',
    checks: checkGroupData,
  });
  const [isAddCheckDisabled, setIsAddCheckDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  
    const requiredFieldsFilled =
      paymentData.montantTotal && paymentData.fournisseur_id;
  
    setIsAddCheckDisabled(!requiredFieldsFilled);
  };


  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const totalMontant = checkGroupData.reduce((sum, item) => sum + (item.montant || 0), 0);
  
      if (totalMontant !== parseInt(paymentData.montantTotal, 10)) {
        alert("Total montant does not match montantTotal. Please check the values.");
        return; 
      }
  
      const updatedPaymentData = {
        ...paymentData,
        checks: checkGroupData,
        dueDatesNumber: numberOfChecks,
      };
  
      await setPaymentData(updatedPaymentData);
  
      const response = await dispatch(createPayment(updatedPaymentData));
      const paymentId = response.payment.id;
  
      const checksWithPaymentId = checkGroupData.map((check) => ({
        ...check,
        payment_id: paymentId,
      }));
  
      await dispatch(createCheck(checksWithPaymentId));
  
      await filterDataByFournisseurId(checks, updatedPaymentData.fournisseur_id);
      // navigate('/cheques-fournisseurs');
  
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  
  const calculateCheckAmounts = () => {
    if (paymentData.montantTotal && numberOfChecks) {
      const totalAmount = parseFloat(paymentData.montantTotal);
      const numChecks = parseInt(numberOfChecks, 10);
  
      const baseAmount = Math.floor(totalAmount / numChecks);
  
      const remainingAmount = totalAmount - baseAmount * numChecks;
  
      const checkAmounts = Array(numChecks).fill(baseAmount);
  
      for (let i = 0; i < remainingAmount; i++) {
        checkAmounts[i] += 1;
      }
  
      const updatedCheckGroupData = checkAmounts.map((amount, index) => ({
        id: index + 1,
        num: '',
        montant: amount,
        dueDate: '',
        type: checkType === 'Chéque' ? 'Chéque' : 'Traite',
        fournisseur_id: paymentData.fournisseur_id,
        payment_id: '',
      }));
  
      setCheckGroupData(updatedCheckGroupData);
    }
  };

  const addCheck = (e) => {
    e.preventDefault();
    setFilteredData([]);
    calculateCheckAmounts(); 
  };

  const [checkType, setCheckType] = useState("Chéque");

  const handleCheckType = () => {
    setCheckType("Chéque")
  }

  const handleTraiteType = () => {
    setCheckType("Traite")
  }
  const [ dateError, setDateError] = useState('');

  const checkIfDateExists = async (dueDate) => {
    try {
      const response = await Checks.checkDueDateExists(dueDate);
      const { exists, message, checksWithinRange } = response;
  
      if (exists) {
        if (checksWithinRange > 0) {
          return { exists: true, message: `You have ${checksWithinRange} checks.` };
        } else {
          return { exists: true, message };
        }
      } else {
        return { exists: false, message };
      }
    } catch (error) {
      console.error('Error checking due date:', error);
      return { exists: false, message: 'An error occurred while checking the due date.' };
    }
  };
  
  const handleDateBlur = async (dueDate) => {
    try {
      const dateExists = await checkIfDateExists(dueDate);
      if (dateExists.exists) {
        setDateError(dateExists.message);
        console.log(dateExists.message);
      } else {
        setDateError('');  
        console.log('Date is valid');
      }
    } catch (error) {
      console.error('Error checking due date:', error);
    }
  };
  
  const [ montanterror, setMontantError] = useState('');

  const handleMontanteBlur = (value) => {
    const totalMontant = checkGroupData.reduce(
      (sum, item) => sum + (item.montant || 0),
      0
    );
  
    if (totalMontant !== parseInt(paymentData.montantTotal, 10)) {
      setMontantError(
        "Le total ne correspond pas à montantTotal. Vérifiez les valeurs"
      );
    } else {
      setMontantError('');
    }
  };

  const handleInputChange = (id, field, value) => {
    if (field === 'dueDate') {
     
      const formattedDate = value;
  
      setCheckGroupData(prevData =>
        prevData.map(item => (item.id === id ? { ...item, [field]: formattedDate } : item))
      );
      handleDateBlur(formattedDate);
    } 
    if (field === 'montant') {
     
      const formattedDate = value;
       setCheckGroupData(prevData =>
        prevData.map(item => (item.id === id ? { ...item, [field]: formattedDate } : item))
      );
      handleMontanteBlur(formattedDate);
    } else {
      setCheckGroupData(prevData =>
        prevData.map(item => (item.id === id ? { ...item, [field]: field === 'montant' ? parseInt(value, 10) : value } : item))
      );
    }
  };
  const [ newfornisseur, setNewFornisseur] = useState(' ');
  console.log('newfornisseur',newfornisseur?.id)
  return (
    <ContentWrapper>
      {isLoading ? (
        <div className="fixed-loader-container">
            <div className="fixed-loader"></div>
        </div>
      ) : (
        <div className='print-wrapper'>
          <div>
            <PageTitle>Imprimer - Chéque</PageTitle>
          </div>
          <RegularDivider />
          <div className='print-btn-wrapper'>
            <RegularButton
              styleType={checkType === "Traite" ? "secondary" : "primary"}
              onClick={handleCheckType}
            >
              Chéque
            </RegularButton>
            <RegularButton
              styleType={checkType === "Chéque" ? "secondary" : "primary"}
              onClick={handleTraiteType}
            >
              Traite
            </RegularButton>
          </div>
          <form>
            <div className='print-form-container'>
              <Select
                label="Fournisseur:"
                title="Recherche fournisseurs"
                options={fournisseurs}
                name="fournisseur_id"
                onChange={handleChange}
                object={false}
                defaultValue={newfornisseur.id}
              />
              <Input
                label="Montant total:"
                placeholder="Montant en dinars"
                type="text"
                name="montantTotal"
                onChange={handleChange}
              />
              <Input
                  label="Nombre d'écheances:"
                  placeholder="0"
                  type="number"
                  name="dueDatesNumber"
                  onChange={handleChangeNumberOfChecks}
                  value={numberOfChecks}
                />
              {/* )} */}
              <RegularButton
                styleType="print-btn"
                onClick={addCheck}
                disabled={isAddCheckDisabled}
              >
                <BsCheckLg />
              </RegularButton>
            </div>
          </form>
          <div className='link-wrapper'>
            <RegularLink
              content="Ajouter un nouveau fournisseur"
              onClick={handleModal}
            />
          </div>
          <RegularDivider size="0.5px" />
          <div className='check-form'>
            {checkGroupData.map((item, index) => (
              <div key={item.id}>
                  <form key={index}>
                    <div className='check-print-form-container'>
                      <p>{index + 1}.</p>
                      <Input
                        label="Numéro de chéque:"
                        placeholder="Num"
                        type="text"
                        defaultValue={item.num}
                        name="num"
                        onChange={(e) => handleInputChange(item.id, 'num', e.target.value)}
                      />
                      <Input
                        label="Montant:"
                        placeholder="Montant en dinars"
                        type="text"
                        defaultValue={item.montant}
                        name="montant"
                        onChange={(e) => handleInputChange(item.id, 'montant', e.target.value)}
                        onBlur={(e) => handleMontanteBlur(e.target.value)}
                        helpertext={montanterror} 
                      />
                      <Input
                          label="Date:"
                          type="date"
                          defaultValue={item.dueDate}
                          name="dueDate"
                          onChange={(e) => handleInputChange(item.id, 'dueDate', e.target.value)}
                          onBlur={(e) => handleDateBlur(e.target.value)}
                          helpertext={dateError}  
                      />
                    </div>
                  </form>
              </div>
            ))}
          </div>

          {(checkGroupData.length > 0) && (
            <div className='save-print-container'>
              <RegularButton
                styleType="save-btn"
                onClick={handleSubmit}
              >
                <FaSave className='btn-icon-left' />
                Sauvegarder
              </RegularButton>
              <RegularButton
                styleType="print-save-btn"
              >
                <BsWindowDock className='btn-icon-left' />
                Sauvegarder et Imprimer
              </RegularButton>
            </div>
          )
          }
        </div>
      )}
      {modal && <FournisseurModal handleModal={handleModal} refreshFournisseursList={refreshFournisseursList} setNewFornisseur={setNewFornisseur} />}
    </ContentWrapper>
  )
}

export default Print