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
import { createPayment } from '../actions/payments'
import { createCheck } from '../actions/checks'

const Print = () => {

  const fournisseurs = useSelector((state) => state.fournisseurs);

  const [modal, setModal] = useState(false);
  // const [dueDatesNumber, setDueDatesNumber] = useState(0);

  const handleModal = () => {
    setModal(!modal);
  }

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getFournisseurs());
  }, []);

  const [checkGroupData, setCheckGroupData] = useState([]);

  const [paymentData, setPaymentData] = useState({
    montantTotal: '',
    dueDatesNumber: '',
    fournisseur_id: '',
    checks: checkGroupData,
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    console.log("payment", paymentData);
  }

  const handleChecks = (e) => {
    e.preventDefault();
    // setDueDatesNumber(parseInt(checkData.dueDatesNumber, 10));
    const dueDatesNumber = parseInt(paymentData.dueDatesNumber, 10);
    setCheckGroupData(Array.from({ length: dueDatesNumber }, (_, index) => ({
      _id: index + 1,
      num: '',
      montant: '',
      dueDate: '',
      fournisseur_id: paymentData.fournisseur_id
    })));
    setPaymentData({ ...paymentData, checks: checkGroupData });
    console.log(paymentData);
  }

  // const addCheck = (e) => {
  //   e.preventDefault();
  //   setDueDatesNumber(dueDatesNumber + 1);
  //   setCheckData({ ...checkData, dueDatesNumber: dueDatesNumber });
  //   setCheckGroupData(Array.from({ length: dueDatesNumber }, (_, index) => ({
  //     id: index + 1,
  //     num: '',
  //     montant: '',
  //     dueDate: ''
  //   })));
  // }

  const handleInputChange = (id, field, value) => {
    setCheckGroupData(prevData =>
      prevData.map(item => (item._id === id ? { ...item, [field]: field === 'montant' ? parseInt(value, 10) : value } : item))
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    // You can process the formData array here, e.g., send it to the server.
    setPaymentData({ ...paymentData, checks: checkGroupData })
    console.log(paymentData);
    dispatch(createPayment(paymentData));
    for (let index = 0; index < checkGroupData.length; index++) {
      const element = checkGroupData[index];
      dispatch(createCheck(element));
    }
  };

  return (
    <ContentWrapper>
      <div className='print-wrapper'>
        <div>
          <PageTitle>Imprimer - Chéque</PageTitle>
        </div>
        <RegularDivider />
        <div className='print-btn-wrapper'>
          <RegularButton
            styleType="primary"
          >
            Chéque
          </RegularButton>
          <RegularButton
            styleType="secondary"
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
              object={true}
            />
            <Input
              label="Montant total:"
              placeholder="Montant en dinars"
              type="text"
              name="montantTotal"
              onChange={handleChange}
            />
            {/* {dueDatesNumber !== 0 ? (
              <Input
                label="Nombre d'écheances:"
                placeholder="0"
                value={dueDatesNumber}
                defaultValue={dueDatesNumber !== 0 && dueDatesNumber}
                type="number"
                name="dueDatesNumber"
                onChange={handleChange}
              />
            ) : ( */}
            <Input
              label="Nombre d'écheances:"
              placeholder="0"
              // defaultValue={dueDatesNumber !== 0 && dueDatesNumber}
              type="number"
              name="dueDatesNumber"
              onChange={handleChange}
            />
            {/* )} */}
            <RegularButton
              styleType="print-btn"
              onClick={handleChecks}
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
            <form key={item._id}>
              <div className='check-print-form-container'>
                <p>{index + 1}.</p>
                <Input
                  label="Numéro de chéque:"
                  placeholder="Num"
                  type="text"
                  defaultValue={item.num}
                  name="num"
                  onChange={(e) => handleInputChange(item._id, 'num', e.target.value)}
                />
                <Input
                  label="Montant:"
                  placeholder="Montant en dinars"
                  type="text"
                  defaultValue={item.montant}
                  name="montant"
                  onChange={(e) => handleInputChange(item._id, 'montant', e.target.value)}
                />
                <Input
                  label="Date:"
                  type="date"
                  defaultValue={item.dueDate}
                  name="dueDate"
                  onChange={(e) => handleInputChange(item._id, 'dueDate', e.target.value)}
                />
              </div>
            </form>
          ))}
        </div>
        {checkGroupData.length !== 0 && (
          <>
            {/* <div className='save-print-container'>
              <RegularButton
                styleType="print-add-btn"
                onClick={addCheck}
              >
                <AiOutlinePlus className='btn-icon-left' />
                Ajouter une autre écheance
              </RegularButton>
            </div> */}
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
          </>
        )}
      </div>
      {modal && <FournisseurModal handleModal={handleModal} />}
    </ContentWrapper>
  )
}

export default Print