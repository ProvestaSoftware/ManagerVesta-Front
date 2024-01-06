import React, { useState, useEffect } from 'react';
import atbImage from '../../assets/images/ATBcheck2.jpg';
import '../../assets/css/PrintModal.css';
import RegularButton from '../Buttons/RegularButton';
import moment from 'moment'
import { ImprimanteService } from '../../_services/imprimante.service';

const PrintModal = ({ item, handleModal, fournisseurs, settings,showBottom,settingimprimante }) => {

  console.log('settingimprimante',settingimprimante)
   
  function numberToWordsFR(num) {
    num = num.toString().replace(/\s/g, '');
    num = num.toString().replace(' ', '');
    num = num.toString().replace(',', '.');
  
    num = Number(num);
  
    function convertUnder100(n) {
      const units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];
      const teens = ["", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
      const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante-dix", "soixante-dix", "quatre-vingt-dix"];
  
      if (n === 0) {
        return "";
      } else if (n < 10) {
        return units[n];
      } else if (n >= 10 && n < 20) {
        return teens[n - 10];
      } else {
        const ten = Math.floor(n / 10);
        const unit = n % 10;
        const tenWord = (ten === 7 || ten === 9) ? tens[ten - 1] : tens[ten];
        const unitWord = (unit > 0) ? `-${units[unit]}` : "";
        return tenWord + unitWord;
      }
    }
  
    function convert(num, isMillion) {
      if (isNaN(num) || num < 0 || num > 999999999999) {
        return "------------";
      }
  
      let result = "";
  
      // Handle millions
      if (num >= 1000000) {
        result += convertUnder100(Math.floor(num / 1000000)) + (isMillion ? " million " : " million ");
        num %= 1000000;
      }
  
      // Handle thousands
      if (num >= 1000) {
        result += convertUnder100(Math.floor(num / 1000)) + " mille ";
        num %= 1000;
      }
  
      // Handle hundreds
      if (num >= 100) {
        let hundreds = Math.floor(num / 100);
        result += (hundreds > 1 ? convertUnder100(hundreds) + " " : "") + "cent" + (num % 100 === 0 && hundreds > 1 ? "s " : " ");
        num %= 100;
      }
  
      // Handle tens and units
      result += convertUnder100(num);
  
      return result.trim();
    }
  
    let dinars = Math.floor(num);
    let millimes = Math.round((num - dinars) * 1000);
  
    let dinarsText = convert(dinars, false);
    let millimesText = convert(millimes, true);
  
    return dinarsText + " dinars et " + millimesText + " millimes";
  }
  
  
  // Examples
  console.log(numberToWordsFR(1279));      // Output: "mille deux cent soixante-dix-neuf dinars"
  console.log(numberToWordsFR(670));       // Output: "six cent soixante-dix dinars"
  console.log(numberToWordsFR(6090150));   // Output: "six millions quatre-vingt-dix mille cent cinquante dinars"
  console.log(numberToWordsFR(690));       // Output: "six cent quatre-vingt-dix dinars"
  console.log(numberToWordsFR(690150));    // Output: "six cent quatre-vingt-dix mille cent cinquante dinars"
         // Output: "six cent quatre-vingt-dix dinars"
  

  React.useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }, []);

  const printSection = () => {
    let printContents = '';
    item.forEach((_, index) => {
      const divToPrint = document.getElementById(`print-${index}`);
      
      if (divToPrint) {
        printContents += '<div style="page-break-before: always">';
        printContents += divToPrint.innerHTML;
        printContents += '</div>';
      }
    });

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    if (showBottom) {
      window.location.reload();
    } else {
      window.location.href = '/payment';
    }
  };

  useEffect(() => {
    const styleElement = document.createElement('style');
    const printingStyles = `
        @media print {
          .check {
            position: relative !important;
            left: ${Number(settingimprimante?.cheque_margin_top)}px !important;
            
            /* THIS IS THE TOP SIDE OF THE PAPER IN REAL MODE - IF YOU WANNA INCREASE THE MARGIN, REDUCE MORE PX*/
            margin-left: -0px !important;

            /* THIS IS THE RIGHT SIDE OF THE PAPER IN REAL MODE - IF YOU WANNA INCREASE THE MARGIN, ADD MORE PX */
            margin-top: ${180 + (Number(settingimprimante?.cheque_margin_left) || 0)}px;

            transform: rotate(${Number(settingimprimante?.cheque_rotation_degree) || 0}deg);
          }
          ${settingimprimante?.cheque_extra_css ?? ''}
        }
    `;

    // Set the styles for the <style> element
    styleElement.innerHTML = printingStyles;

    // Append the <style> element to the <head> section
    document.head.appendChild(styleElement);

    // Cleanup: Remove the <style> element when the component unmounts
    return () => {
        document.head.removeChild(styleElement);
    };
  }, [settings]);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <div style={{ position: 'fixed', top: '0%', left: '50%', transform: 'translate(-50%, 0%)', padding: '20px', borderRadius: '8px', width: '100vh', height: '90vh',maxWidth:'800px' }}>
        <div className="relative w-full max-h-full">
          <div className="relative bg-white rounded-lg dark:bg-gray-700">
            <div className="check-num-print flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cheque(s) &nbsp;
                {
                  item?.map((check, index) => 
                    <span key={'ChecksPrintModal'+index}>
                      {index > 0 && ', '}
                      #{check?.num} 
                    </span>
                  )}
              </h3>
              {showBottom && (
                <button
                  onClick={handleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                  data-modal-hide="editUserModal"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              )}
            </div>
            <div className="p-6 space-y-6" style={{maxHeight: '70vh', overflowY: 'scroll'}}>
              {/* <div className=" gap-6"> */}
                {item.map((check, index) => {
                  const selectedFournisseur = fournisseurs.find(f => f.id == check.fournisseur_id);
                  const fournisseurNom = selectedFournisseur ? selectedFournisseur.nom : '';

                  return (
                    <div className={`check-only-main-div print`} id={`print-${index}`} key={`print-${index}`}>  
                      {/* <span className='num_check_header'>Chéque n°{check.num}</span> */}
                      <div 
                        key={index} 
                        className="grid grid-cols-12 check check-only"  
                        id={`check-${index}`} 
                        style={{ 
                          width: '687.87401575px', 
                          height: '309.92125984px', 
                          display: 'block', 
                          border: '1px solid #ddd', 
                          borderRadius: '3px', 
                          pageBreakBefore: 'always'
                        }}
                      >
                        <img src={atbImage} alt="Check" />
                        <div className='extra_margin_parameters' style={{marginLeft: `${settings.cheque_margin_left}px`, marginTop: `${settings.cheque_margin_right}px`}}>
                          <span className="check_data num_check" id={`montant-${index}`} style={{left: '80px', top: '28px'}}>
                            <b>{check?.num ?? '------'}</b>
                          </span>
                          <span className="check_data montant check-only-amount" id={`montant-${index}`} style={{left: '540px', top: '21px'}}>
                            {/* {check?.montant?.toLocaleString('fr-FR') || '------------'} */}
                            #{
                              (check?.montant || 0).toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).toString().replace(',', '.').replace(/\B(?=(\d{3})+(?!\d))/g,' ')
                            }#
                          </span>
                          <span className="check_data montant_ecrit montant_ecrit_line1" id={`montant_ecrit_line1-${index}`} style={{left: 'calc(50% + 30px)', top: '65px', textWrap: 'nowrap'}}>
                            {`${numberToWordsFR((check?.montant || 0).toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).toString().replace(',', '.').replace(/\B(?=(\d{3})+(?!\d))/g,' '))}`.split(' ', 4).join(' ')}
                          </span>
                          <span className="check_data montant_ecrit montant_ecrit_line2" id={`montant_ecrit_line2-${index}`} style={{left: 'calc(50% + 30px)', top: '90px'}}>
                            {`${numberToWordsFR((check?.montant || 0).toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).toString().replace(',', '.').replace(/\B(?=(\d{3})+(?!\d))/g,' '))}`.split(' ').slice(4).join(' ')}
                          </span>
                          <span className="check_data montant_to" id={`montant_to-${index}`} style={{left: '110px', top: '120px'}}>
                            {fournisseurNom || '----------------------------------------------------'}
                          </span>
                          <div className='bottom_date_div' style={{position: 'absolute', top: 0, left: '0'}}>
                            <span className="check_data date montant_a_fr" style={{left: '230px'}}>{settings.paye_de_signature ?? 'Kélibia'}</span>
                            <span className="check_data date montant_le" id={`montant_le-${index}`} style={{left: '315px'}}>
                              {moment(check.dueDate).format('DD/MM/YYYY') || '--/--/----'}
                            </span>
                            <span className="check_data date montant_a_ar" style={{left: '430px'}}>{settings.paye_de_signature_ar ?? 'قليبية'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="check-inputs-print flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <RegularButton
                styleType="primary"
                type="submit"
                onClick={printSection}
              >
                Imprimer {item.length > 1 ? 'les chéques' : 'le chéque'}
              </RegularButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintModal;
