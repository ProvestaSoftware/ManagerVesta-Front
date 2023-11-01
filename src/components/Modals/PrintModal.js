import React, { useState, useEffect } from 'react';
import atbImage from '../../assets/images/ATBcheck2.jpg';
import '../../assets/css/PrintModal.css';
import RegularButton from '../Buttons/RegularButton';
import moment from 'moment'
import { ImprimanteService } from '../../_services/imprimante.service';

const PrintModal = ({ item, handleModal, fournisseurs, settings,showBottom,settingimprimante }) => {

  console.log('settingimprimante',settingimprimante)
   
  function numberToWordsFR(num) {
    if (isNaN(num) || num < 1 || num > 999999999) {
        return "------------";
    }

    let result = "";

    // handle millions
    if (num >= 1000000) {
        result += numberToWordsFR(Math.floor(num / 1000000)) + " million ";
        num %= 1000000;
    }

    // handle thousands
    if (num >= 1000) {
        result += numberToWordsFR(Math.floor(num / 1000)) + " mille ";
        num %= 1000;
    }

    // handle hundreds
    if (num >= 100) {
        result += numberToWordsFR(Math.floor(num / 100)) + " cent ";
        num %= 100;
    }

    // handle tens and units
    if (num >= 20) {
        switch (Math.floor(num / 10)) {
            case 9:
                result += "quatre-vingt";
                break;
            case 8:
                result += "quatre-vingt";
                break;
            case 7:
                result += "soixante";
                break;
            case 6:
                result += "soixante";
                break;
            case 5:
                result += "cinquante";
                break;
            case 4:
                result += "quarante";
                break;
            case 3:
                result += "trente";
                break;
            case 2:
                result += "vingt";
                break;
            default:
                result += "";
        }

        if (num % 10 !== 0) {
            result += "-";
        }

        switch (num % 10) {
            case 9:
                result += "neuf";
                break;
            case 8:
                result += "huit";
                break;
            case 7:
                result += "sept";
                break;
            case 6:
                result += "six";
                break;
            case 5:
                result += "cinq";
                break;
            case 4:
                result += "quatre";
                break;
            case 3:
                result += "trois";
                break;
            case 2:
                result += "deux";
                break;
            case 1:
                result += "un";
                break;
            default:
                result += "";
        }
    } else {
        switch (num) {
            case 19:
                result += "dix-neuf";
                break;
            case 18:
                result += "dix-huit";
                break;
            case 17:
                result += "dix-sept";
                break;
            case 16:
                result += "seize";
                break;
            case 15:
                result += "quinze";
                break;
            case 14:
                result += "quatorze";
                break;
            case 13:
                result += "treize";
                break;
            case 12:
                result += "douze";
                break;
            case 11:
                result += "onze";
                break;
            case 10:
                result += "dix";
                break;
            case 9:
                result += "neuf";
                break;
            case 8:
                result += "huit";
                break;
            case 7:
                result += "sept";
                break;
            case 6:
                result += "six";
                break;
            case 5:
                result += "cinq";
                break;
            case 4:
                result += "quatre";
                break;
            case 3:
                result += "trois";
                break;
            case 2:
                result += "deux";
                break;
            case 1:
                result += "un";
                break;
            default:
                result += "";
        }
    }

    return result;
    }

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
    // Dynamically create a <style> element
    const styleElement = document.createElement('style');

    // Define the printing styles based on the state variable
    const printingStyles = `
        @media print {
          .check {

            margin-left: -${189 - (Number(settingimprimante?.cheque_margin_top) || 0)}px !important;
            margin-top: ${189 + (Number(settingimprimante?.cheque_margin_left) || 0)}px;
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
                    <div className={`print`} id={`print-${index}`} key={`print-${index}`}>  
                      {/* <span className='num_check_header'>Chéque n°{check.num}</span> */}
                      <div 
                        key={index} 
                        className="grid grid-cols-12 check"  
                        id={`check-${index}`} 
                        style={{ 
                          width: '687.87401575px', 
                          height: '309.92125984px', 
                          display: 'block', 
                          border: '1px solid #ddd', 
                          borderRadius: '3px', 
                          pageBreakBefore: 'always',
                          '@media print': {
                            marginTop: '189px !important',
                            marginLeft: '-189px !important',
                          },
                        }}
                      >
                        <img src={atbImage} alt="Check" />
                        <div className='extra_margin_parameters' style={{marginLeft: `${settings.cheque_margin_left}px`, marginTop: `${settings.cheque_margin_right}px`}}>
                          <span className="check_data num_check" id={`montant-${index}`} style={{left: '80px', top: '28px'}}>
                            <b>{check?.num ?? '------'}</b>
                          </span>
                          <span className="check_data montant" id={`montant-${index}`} style={{left: '540px', top: '21px'}}>
                            {/* {check?.montant?.toLocaleString('fr-FR') || '------------'} */}
                            #{(check?.montant || 0).toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}#
                          </span>
                          <span className="check_data montant_ecrit montant_ecrit_line1" id={`montant_ecrit_line1-${index}`} style={{left: 'calc(50% + 30px)', top: '65px'}}>
                            {`${numberToWordsFR(check?.montant || 0)} dinars`.split(' ', 4).join(' ')}
                          </span>
                          <span className="check_data montant_ecrit montant_ecrit_line2" id={`montant_ecrit_line2-${index}`} style={{left: 'calc(50% + 30px)', top: '90px'}}>
                            {`${numberToWordsFR(check?.montant || 0)} dinars`.split(' ').slice(4).join(' ')}
                          </span>
                          <span className="check_data montant_to" id={`montant_to-${index}`} style={{left: '110px', top: '120px'}}>
                            {fournisseurNom || '----------------------------------------------------'}
                          </span>
                          <span className="check_data date montant_a_fr" style={{left: '230px'}}>{settings.paye_de_signature ?? 'Kélibia'}</span>
                          <span className="check_data date montant_le" id={`montant_le-${index}`} style={{left: '315px'}}>
                            {moment(check.dueDate).format('DD/MM/YYYY') || '--/--/----'}
                          </span>
                          <span className="check_data date montant_a_ar" style={{left: '430px'}}>{settings.paye_de_signature_ar ?? 'قليبية'}</span>
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
