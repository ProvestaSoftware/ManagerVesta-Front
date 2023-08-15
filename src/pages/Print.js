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
import { FaSave } from 'react-icons/fa'
import RegularLink from '../components/RegularLink'
import RegularDivider from '../components/RegularDivider'
import { useDispatch, useSelector } from 'react-redux'
import { getFournisseurs } from '../actions/fournisseurs'
import FournisseurModal from '../components/Modals/FournisseurModal'

const Print = () => {

  const fournisseurs = useSelector((state) => state.fournisseurs);

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  }

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getFournisseurs());
  }, []);

  const [checkData, setCheckData] = useState({
    fournisseur: '',
    montant: '',
    dueNumber: '',
  });
  
  const [checkGroupData, setCheckGroupData] = useState([]);

  const handleChange = (e) => {
    setCheckData({ ...checkData, [e.target.name]: e.target.value });
    console.log(checkData);
  }

  const handleChecks = (e) => {
    e.preventDefault();
    const dueNumber = parseInt(checkData.dueNumber, 10);
    setCheckGroupData(Array.from({ length: dueNumber }, (_, index) => ({
      id: index + 1,
      num: '',
      montant: checkData.montant / dueNumber,
      dueDate: ''
    })));
    // console.log(checkGroupData);
  }

  const handleInputChange = (id, field, value) => {
    setCheckGroupData(prevData =>
      prevData.map(item => (item.id === id ? { ...item, [field]: field === 'montant' ? parseInt(value, 10) : value } : item))
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    // You can process the formData array here, e.g., send it to the server.
    console.log(checkGroupData);
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
              name="fournisseur"
              onChange={handleChange}
            />
            <Input
              label="Montant total:"
              placeholder="Montant en dinars"
              type="text"
              name="montant"
              onChange={handleChange}
            />
            <Input
              label="Nombre d'écheances:"
              placeholder="0"
              type="number"
              name="dueNumber"
              onChange={handleChange}
            />
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
            <form key={item.id}>
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
                />
                <Input
                  label="Date:"
                  type="date"
                  defaultValue={item.dueDate}
                  name="dueDate"
                  onChange={(e) => handleInputChange(item.id, 'dueDate', e.target.value)}
                />
              </div>
            </form>
          ))}
        </div>
        {checkGroupData.length !== 0 && (
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
        )}
      </div>
      {modal && <FournisseurModal handleModal={handleModal} />}
    </ContentWrapper>
  )
}

export default Print