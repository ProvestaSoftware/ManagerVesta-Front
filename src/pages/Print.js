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
// import { AiOutlinePlus } from 'react-icons/ai'
import { FaSave } from 'react-icons/fa'
import RegularLink from '../components/RegularLink'
import RegularDivider from '../components/RegularDivider'
import { useDispatch, useSelector } from 'react-redux'
import { getFournisseurs } from '../actions/fournisseurs'
import FournisseurModal from '../components/Modals/FournisseurModal'
import { createPayment, getPayments } from '../actions/payments'
import { createCheck, getChecks } from '../actions/checks'
import { Checks } from '../_services/checks.service';
import { useNavigate } from 'react-router-dom'
import PrintModal from '../components/Modals/PrintModal'
import PrintModalTraite from '../components/Modals/PrintModalTraite'
import { SettingService } from '../_services/setting.service'
import { ImprimanteService } from '../_services/imprimante.service'

const Print = () => {

  const fournisseurs = useSelector((state) => state.fournisseurs);
  const checks = useSelector((state) => state.checks);
  const [numberOfChecks, setNumberOfChecks] = useState(); 
  const navigate = useNavigate();
  const [showBottom, setShowBottom] = useState(false);

  const refreshFournisseursList = async () => {
    try {
      await dispatch(getFournisseurs());
    } catch (error) {
      console.log('Error refreshing fournisseurs list:', error);
    }
  };

  const [currentCheckNumber, setCurrentCheckNumber] = useState(null);
  const [settings, setSettings] = useState(null);

    const getCurrentCheckNumber = async () => {
      try {
        const settingData = await SettingService.index();
        if (settingData && settingData.data.current_cheque_number) {
          setCurrentCheckNumber(settingData.data.current_cheque_number);
          setSettings(settingData.data);
        }
      } catch (error) {
        console.error('Error fetching current check number:', error);
      }
    };

    useEffect(() => {
      getCurrentCheckNumber();
    }, []);

  const handleChangeNumberOfChecks = (e) => {
    const newNumberOfChecks = parseInt(e.target.value, 10);
    setNumberOfChecks(newNumberOfChecks);
  };
  const [modal, setModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

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
  const [isAddCheckDisabled, setIsAddCheckDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value.replace(/\s/g, "")
    setPaymentData({ ...paymentData, [name]: val });
  
    const requiredFieldsFilled =
      paymentData.montantTotal && paymentData.fournisseur_id;
  
    setIsAddCheckDisabled(!requiredFieldsFilled);
  };


  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [actionType, setActionType] = useState(''); 


  const handleSubmit = async (event) => {
    if (event && event != 'reload_page') {
      event.preventDefault();
    }
  
    setIsLoading(true);
  
    try {
      const totalMontant = checkGroupData.reduce((sum, item) => sum + (item.montant || 0), 0);
  
      if (totalMontant != parseInt(paymentData.montantTotal, 10)) {
        alert("Total montant does not match montant Total. Please check the values.");
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
        num: check.num,
        montant: check.montant,
        dueDate: check.dueDate,
        type: check.type,
        fournisseur_id: paymentData.fournisseur_id,
        payment_id: paymentId,
      }));
  
      await dispatch(createCheck(checksWithPaymentId));
  
      await filterDataByFournisseurId(checks, updatedPaymentData.fournisseur_id);
  
      if (event) {
        navigate('/cheques-fournisseurs');
      }
  
      let newCurrentCheckNumber = currentCheckNumber;
      if (checkType === 'Chéque') {
        newCurrentCheckNumber = parseInt(checkGroupData[checkGroupData.length - 1].num, 10) + 1;
      }
      if (checkType === 'Chéque') {
        await SettingService.store({ current_cheque_number: newCurrentCheckNumber });
      }  
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleModalConfirme = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };
  

  const handleModalPrint = () => {
    if (actionType === 'imprimer'){
      setShowConfirmationModal(false);
      handleSubmit();  
      setShowPrintModal(true);
    }else if (actionType === 'sauvegarder') {
      setShowConfirmationModal(false);
      handleSubmit('reload_page');
      // navigate('/cheques-fournisseurs');
    }
  };
  
  
  const calculateCheckAmounts = (index_to_start_with = 0) => {
    if (paymentData.montantTotal && numberOfChecks) {
      const totalAmount = parseFloat(paymentData.montantTotal);
      const numChecks = parseInt(numberOfChecks, 10);
  
      const baseAmount = Math.floor(totalAmount / numChecks);
      const remainingAmount = totalAmount - baseAmount * numChecks;
  
      const updatedCheckGroupData = Array(numChecks).fill({}).map((_, index) => {
        if( index >= index_to_start_with){
          let num = '';
          if (checkType === 'Chéque') {
            num = currentCheckNumber + index + 1;
          }
    
          return {
            id: index + 1,
            num: num,
            montant: baseAmount + (index < remainingAmount ? 1 : 0),
            dueDate: '',
            type: checkType === 'Chéque' ? 'Chéque' : 'Traite',
            fournisseur_id: paymentData.fournisseur_id,
            payment_id: '',
          };
        }
      });
  
      setCheckGroupData(updatedCheckGroupData);
    }
  };
  
  const [montanterror, setMontantError] = useState('');
  
  const addCheck = (e) => {
    e.preventDefault();
    setFilteredData([]);
    calculateCheckAmounts();
  
    setCheckGroupData((prevData) =>
      prevData.map((item, index) => ({
        ...item,
        num: checkType === 'Chéque' ? Number(currentCheckNumber) + index + 1 : item.num,
      }))
    );
    setMontantError("")
  };

  const [checkType, setCheckType] = useState("Chéque");

  const handleCheckType = () => {
    calculateCheckAmounts();
    setCheckType("Chéque"); 
    setCheckGroupData( 
      checkGroupData.map((item, index) => ({
        id: index + 1,
        num: (Number(currentCheckNumber) + index + 1),
        montant: item.montant,
        dueDate: '',
        type: 'Chéque',
        fournisseur_id: paymentData.fournisseur_id,
        payment_id: '',
      }))
    )
  };

  const handleTraiteType = () => {
    setCheckType("Traite")
    setCheckGroupData( 
      checkGroupData.map((item, index) => ({
        id: index + 1,
        num: '',
        montant: item.montant,
        dueDate: '',
        type: 'Traite',
        fournisseur_id: paymentData.fournisseur_id,
        payment_id: '',
      }))
    )
  }

  const checkIfDateExists = async (dueDate) => {
    try {
      const response = await Checks.checkDueDateExists(dueDate);
      const { exists, message, checksWithinRange, checksAmountWithinRange } = response;
  
      if (exists) {
        if (checksWithinRange > 0) {
          return { exists: true, type: 'error', message: `Vous avez ${checksWithinRange} chèques à cette date avec un montant total de ${checksAmountWithinRange}dt` };
        }
      } else {
        if (checksWithinRange > 0) {
          return { exists: true, type: 'warning', message: `Vous avez ${checksWithinRange} chèques proches cette date avec un montant total de ${checksAmountWithinRange}dt` };
        }else{
          return { exists: false, message };
        }
      }
    } catch (error) {
      console.error('Error checking due date:', error);
      return { exists: false, message: 'An error occurred while checking the due date.' };
    }
  };
  const [inputErrors, setInputErrors] = useState({});


  const handleDateBlur = async (dueDate, inputId) => {
    try {
      const dateExists = await checkIfDateExists(dueDate);
      if (dateExists.exists) {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          [inputId]: dateExists,
        }));
      } else {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          [inputId]: '',
        }));
      }
    } catch (error) {
      console.error('Error checking due date:', error);
    }
  };
  

const handleMontanteBlur = (newValue, changed_input_id = null) => {
  let total_amount = 0;
  let totalMontantReste = 0;
  const montantValues = newValue.map((item, index) => {
    let montant = parseFloat(item.montant || 0 || 10);
    totalMontantReste += index+1 <= changed_input_id ? Number(montant) : 0;
    return montant
  });

  if (totalMontantReste != 0) {
    const difference = parseFloat(paymentData?.montantTotal) - totalMontantReste;
    if (checkGroupData.length >= 2) {
      if (difference >= 0) {
        const numChecks = checkGroupData.length - changed_input_id;
        const baseAmount = Math.floor(difference / numChecks);
        const remainingAmount = difference - baseAmount * numChecks;
        
        const updatedCheckGroupData = newValue.map((item, index) => {
          if (index >= changed_input_id) {
            item = {
              ...item,
              montant: Math.floor(difference / numChecks ) + ((index - changed_input_id) < remainingAmount ? 1 : 0),
            };
          }

          total_amount += item.montant
          return item;
        });

        setCheckGroupData(updatedCheckGroupData);
      }
    }
  }

  if( total_amount != paymentData.montantTotal){
    setMontantError("Le total ne correspond pas à montant Total. Vérifiez les valeurs");
  }else{
    setMontantError("");
  }
};

const formatNumberWithSpaces = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');
};

  const handleInputChange = (id, field, value) => {
    if (field === 'dueDate') {
      const formattedDate = value;
      setCheckGroupData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, [field]: formattedDate } : item
        )
      );
      handleDateBlur(formattedDate, id);
    } else if (field === 'montant') {
      value = value.replace(/\s/g, "")
      const formattedMontant = parseFloat(value || 0, 10);
      console.log('formattedMontant', formattedMontant)
      let newValue = checkGroupData.map((item) =>
        item.id === id ? { ...item, [field]: formattedMontant } : item
      )
      setCheckGroupData(newValue);
      handleMontanteBlur(newValue, id);
    } else {
      setCheckGroupData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, [field]: field === 'montant' ? parseInt(value, 10) : value } : item
        )
      );
    }

    setInputErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); 
  };
  const [settingimprimante, setSettingImprimante] = useState(null);

  const getImprimanteId = () => {
    const selectedPrinterId = localStorage.getItem('selectedPrinterId');
      ImprimanteService.getById(selectedPrinterId ?? 0)
        .then((imprimante) => {
          setSettingImprimante(imprimante.data);
        })
        .catch((error) => {
          console.error('Error retrieving selected Imprimante:', error);
        });
  };
  
  useEffect(() => {
    getImprimanteId();
  }, []);
  const [ newfornisseur, setNewFornisseur] = useState(' ');

  const isSaveDisabled = checkGroupData.some(item => !item.dueDate || !item.montant || !item.num )|| montanterror != '';
  const isPrintSaveDisabled = checkGroupData.some(item => !item.dueDate || !item.montant || !item.num )|| montanterror != '';


  const ConfermationPrint = ({ item, handleModal, fournisseurs,handleModalPrint,checkGroupData,paymentData }) => {
    const formatNumberWithSpaces = (number) => {
      return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };
      const getFournisseurName = (fournisseurId) => {
        const fournisseur = fournisseurs.find((f) => f.id === parseInt(fournisseurId, 10));
        return fournisseur ? fournisseur.nom : 'Unknown Fournisseur';
      };

    return (
      <div style={{ position: 'fixed', top: 10, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
        <div style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, 0%)', padding: '20px', borderRadius: '8px', width: '800px', height: '90vh' }}>
          <div className="relative w-full max-h-full">
            <div className="relative bg-white rounded-lg dark:bg-gray-700">
              <div className="check-num-print flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item[0].type === 'Chéque' ? 'Chèque(s)' : 'Traite(s)'}
                  {
                    item?.map((check, index) => (
                      <span key={'ChecksPrintModal'+index}>
                        {index > 0 && ', '}
                        #{check?.num} 
                      </span>
                    ))
                  }
                </h3>
                <button onClick={handleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6" style={{ maxHeight: '70vh', overflowY: 'scroll' }}>

                 <div >
                    <p className="text-lg font-bold">Confirmation</p>
                    <p>Veuillez confirmer votre action pour ces informations</p>
                  </div>
                
               <p>Fournisseur: {getFournisseurName(paymentData.fournisseur_id)}</p>
                <p>
                  Total montant: {formatNumberWithSpaces(paymentData.montantTotal)} DT
                </p>
                <p>
                   Nombre d'écheances: {item.length} 
                </p>
                <ul>
                  {item.map((check, index) => (
                    <li key={'CheckPrintModal' + index}>
                    #{check?.num} - Date: {check.dueDate}, montant: {formatNumberWithSpaces(check.montant)} DT
                    </li>
                  ))}
                </ul>
              </div>
              <div className="check-inputs-print flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <RegularButton
                  styleType="primary"
                  type="submit"
                  onClick={handleModalPrint}
                >
                  Confirmer
                </RegularButton>
                <RegularButton
                  styleType="secondary"  
                  onClick={handleModal}   
                >
                  Annuler
                </RegularButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <ContentWrapper>
      <div className='non-printable'>
      {isLoading ? (
        <div className="fixed-loader-container">
            <div className="fixed-loader"></div>
        </div>
      ) : (
        <div className='print-wrapper'>
          <div>
            <PageTitle>Imprimer - {checkType === 'Chéque' ? 'Chéque' : 'Traite'}</PageTitle>
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
                options={fournisseurs || ''}
                name="fournisseur_id"
                onChange={handleChange}
                object={false}
                defaultValue={newfornisseur?.id}
              />
              <Input
                label="Montant total:"
                placeholder="Montant en dinars"
                type="text"
                name="montantTotal"
                onChange={handleChange}
                // value={paymentData?.montantTotal || ''}
                value={paymentData?.montantTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ') ?? ''}
              />
              <Input
                  label="Nombre d'écheances:"
                  placeholder="0"
                  type="number"
                  name="dueDatesNumber"
                  onChange={handleChangeNumberOfChecks}
                  value={numberOfChecks || ''}
                />
              {/* )} */}
              <RegularButton
                styleType="print-btn"
                onClick={addCheck}
                // disabled={!isAddCheckDisabled}
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
              <div key={item.id} style={{marginBottom: '20px'}}>
                  <form key={index}>
                    <div className='check-print-form-container'>
                      <p>{index + 1}.</p>
                      <Input
                      label={checkType === 'Chéque' ? "Numéro de chèque:" : "Numéro de traite:"}
                      placeholder={checkType === 'Chéque' ? (parseInt(checkGroupData[index].num, 10) + 1).toString() : 'Num traite'}
                      type="text"
                      defaultValue={item.num}
                      name="num"
                      value={checkType ==='Chéque' ? checkGroupData[index].num : item.num}
                      onChange={(e) => {
                        // if (checkType === 'Traite') return; 
                        handleInputChange(item.id, 'num', e.target.value);
                      }}
                      readOnly={checkType === 'Traite'} 
                      />
                     <Input
                        label="Montant:"
                        placeholder="Montant en dinars"
                        type="text"
                        value={(checkGroupData[index].montant)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ')}
                        name="montant"
                        onChange={(e) => handleInputChange(item.id, 'montant', e.target.value)}
                        onBlur={() => handleMontanteBlur()}
                        error={montanterror ? { message: montanterror, type: 'error' } : null}
                      />
          {/* {JSON.stringify(checkGroupData)} */}
                      <Input
                        label="Date:"
                        type="date"
                        inputId={item.id}
                        defaultValue={item.dueDate}
                        value={item.dueDate}
                        name="dueDate"
                        onChange={(e) => handleInputChange(item.id, 'dueDate', e.target.value)}
                        onBlur={() => handleDateBlur(item.dueDate, item.id)} 
                        error={item?.dueDate != "" && inputErrors[item.id]}
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
              onClick={() => {
                setActionType('sauvegarder'); 
                handleModalConfirme(true);
              }}         
               disabled={isSaveDisabled}
              style={{
                opacity: isSaveDisabled ? '0.5' : '1',
              }}
            >
              <FaSave className='btn-icon-left' />
              Sauvegarder
            </RegularButton>

            <RegularButton
              styleType="print-save-btn"
              onClick={() => {
                setActionType('imprimer'); 
                handleModalConfirme(true);
              }}  
              disabled={isPrintSaveDisabled}
              style={{
                opacity: isPrintSaveDisabled ? '0.5' : '1',              }}
            >
              <BsWindowDock className='btn-icon-left' />
              Sauvegarder et Imprimer
            </RegularButton>
          </div>
          )
          }
        </div>
      )}
      </div>
      {showPrintModal && (
        checkType == 'Chéque' ?
          <PrintModal
            handleModal={() => setShowPrintModal(false)} 
            fournisseurs={fournisseurs}
            item={checkGroupData}
            settings={settings}
            showBottom={showBottom}
            settingimprimante={settingimprimante}
          />
        :
          <PrintModalTraite
            handleModal={() => setShowPrintModal(false)} 
            fournisseurs={fournisseurs}
            item={checkGroupData}
            settings={settings}
            showBottom={showBottom}
            settingimprimante={settingimprimante}
          />
      )}
      {showConfirmationModal && (
        <ConfermationPrint
          handleModal={() => setShowConfirmationModal(false)}
          fournisseurs={fournisseurs}
          item={checkGroupData}
          checkGroupData={checkGroupData}
          handleModalPrint={handleModalPrint}
          paymentData={paymentData}
        />
      )}
      {modal && <FournisseurModal handleModal={handleModal} refreshFournisseursList={refreshFournisseursList} setNewFornisseur={setNewFornisseur} />}
    </ContentWrapper>
  )
}

export default Print