import React, { useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import PageTitle from '../components/PageTitle'
import '../assets/css/Print.css'
import RegularButton from '../components/Buttons/RegularButton'
import Input from '../components/Inputs/Input'
import Select from '../components/Inputs/Select'
import { fournisseursData } from '../data/MockData'
import { BsCheckLg } from 'react-icons/bs'
import RegularLink from '../components/RegularLink'
import RegularDivider from '../components/RegularDivider'
import CheckForm from '../components/Forms/CheckForm'

const Print = () => {

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
    console.log(checkGroupData);
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
        <form onSubmit={handleChecks}>
          <div className='print-form-container'>
            <Select
              label="Fournisseur:"
              title="Recherche fournisseurs"
              options={fournisseursData}
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
              type="submit"
            >
              <BsCheckLg />
            </RegularButton>
          </div>
        </form>
        <div className='link-wrapper'>
          <RegularLink
            content="Ajouter un nouveau fournisseur"
            link="/fournisseurs"
          />
        </div>
        <RegularDivider size="0.5px" />
        {checkGroupData.map((item, index) => (
          <div className='check-form'>
            <CheckForm
              item={item}
            />
          </div>
        ))}
      </div>
    </ContentWrapper>
  )
}

export default Print