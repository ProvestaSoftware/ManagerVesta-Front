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
import PaymentChecksTable from '../components/Tables/PaymentChecksTable'
import { paymentChecksData } from '../data/TableColumnsData'

const Print = () => {

  const fournisseurs = useSelector((state) => state.fournisseurs);
  const checks = useSelector((state) => state.checks);

  const [modal, setModal] = useState(false);
  // const [dueDatesNumber, setDueDatesNumber] = useState(0);

  const handleModal = () => {
    setModal(!modal);
  }

  const [filteredData, setFilteredData] = useState([]);

  const filterDataByFournisseurId = (entryData, fournisseurId) => {
    // console.log("entryData", entryData);
    const filteredArray = entryData.filter(entry => entry.fournisseur_id === parseInt(fournisseurId));
    // console.log("Filtered Array:", filteredArray);
    setFilteredData(filteredArray);
  };

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getFournisseurs());
    await dispatch(getChecks());
    // await filterDataByFournisseurId(checks, paymentData.fournisseur_id);
    // await dispatch(getPayments());
  }, []);

  const [checkGroupData, setCheckGroupData] = useState([]);
  // const testData = [
  //   {
  //     dueDate: "2023-08-27",
  //     fournisseur_id: 4,
  //     montant: 500,
  //     num: "888888",
  //     payment_id: 128,
  //     id: 1
  //   },
  //   {
  //     dueDate: "2023-08-27",
  //     fournisseur_id: 10,
  //     montant: 500,
  //     num: "111111",
  //     payment_id: 128,
  //     id: 2
  //   },
  // ];

  const [paymentData, setPaymentData] = useState({
    montantTotal: '',
    dueDatesNumber: '',
    fournisseur_id: '',
    checks: checkGroupData,
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    // console.log("paymentData", paymentData);
  }

  const handleChecks = async (e) => {
    e.preventDefault();
    // setDueDatesNumber(parseInt(checkData.dueDatesNumber, 10));
    const dueDatesNumber = parseInt(paymentData.dueDatesNumber, 10);
    await setCheckGroupData(Array.from({ length: dueDatesNumber }, (_, index) => ({
      _id: index + 1,
      num: '',
      montant: '',
      dueDate: '',
      type: checkType === "Chéque" ? "Chéque" : "Traite",
      fournisseur_id: paymentData.fournisseur_id,
    })));
    // console.log("checks", checks);
    await setPaymentData({ ...paymentData, checks: checkGroupData });
    await filterDataByFournisseurId(checks, paymentData.fournisseur_id);
    // console.log("paymentData", paymentData);
    // console.log("filteredData", filteredData);
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

  // const handleCreatePayment = async () => {
  //   try {
  //     const response = await dispatch(createPayment(paymentData));
  //     // await setPaymentId(response.id);
  //     await console.log('Server response:', response);
  //     // Now you can use the response data in your component's state or perform any other actions
  //   } catch (error) {
  //     console.log('Error:', error);
  //     // Handle the error, show a message, etc.
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can process the formData array here, e.g., send it to the server.
    await setPaymentData({ ...paymentData, checks: checkGroupData })
    // console.log("paymentData", paymentData);
    let response;
    try {
      response = await dispatch(createPayment(paymentData));
      // await setPaymentId(response.id);
      // await console.log('Server response:', response);
      // Now you can use the response data in your component's state or perform any other actions
    } catch (error) {
      console.log('Error:', error);
      // Handle the error, show a message, etc.
    }
    for (let index = 0; index < checkGroupData.length; index++) {
      let element = checkGroupData[index];
      element.payment_id = response.payment.id;
      await dispatch(createCheck(element));
    }

    await dispatch(getPayments());
    await dispatch(getChecks());
    await filterDataByFournisseurId(checks, paymentData.fournisseur_id);
  };

  const [checkType, setCheckType] = useState("Chéque");

  const handleCheckType = () => {
    setCheckType("Chéque")
  }

  const handleTraiteType = () => {
    setCheckType("Traite")
  }

  return (
    <ContentWrapper>
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
          {filteredData.length > 0 ? (
            <PaymentChecksTable
              columns={paymentChecksData}
              rows={filteredData}
            />
          ) :
            checkGroupData.map((item, index) => (
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

        {(filteredData.length === 0 && checkGroupData.length > 0) && (
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
        )
        }
      </div>
      {modal && <FournisseurModal handleModal={handleModal} />}
    </ContentWrapper>
  )
}

export default Print