import React, { useState } from 'react';
import atbImage from '../../assets/images/ATBcheck.jpg';
import '../../assets/css/PrintModal.css';
import RegularButton from '../Buttons/RegularButton';

const PrintModal = ({ item, handleModal, fournisseurs }) => {
  const [formattedDate, setFormattedDate] = useState('');
console.log('fournisseurs',fournisseurs)
console.log('item',item)
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
    setFormattedDate(formattedDate);
  }, []);

  const printSection = () => {
    window.print();
  };

  // const printSection = () => {
  //   const printWindow = window.open('', '_blank');
  //   printWindow.document.write('<html><head><title>Print</title></head><body>');

  //   item.forEach((check, index) => {
  //     const selectedFournisseur = fournisseurs.find((f) => f.id == check.fournisseur_id);
  //     const fournisseurNom = selectedFournisseur ? selectedFournisseur.nom : '';

  //     printWindow.document.write(`
  //       <div style="width: 687.87401575px; height: 309.92125984px; display: block; page-break-before: ${index === 0 ? 'auto' : 'always'};">
  //         <img src="${atbImage}" style="width: 100%; height: 100%;" alt="Check" />
  //         <span class="check_data montant" id="montant-${index}">
  //           ${check?.montant || '------------'}
  //         </span>
  //         <span class="check_data montant_ecrit montant_ecrit_line1" id="montant_ecrit_line1-${index}">
  //           ${numberToWordsFR(check?.montant || 0).slice(0, 17)}
  //         </span>
  //         <span class="check_data montant_ecrit montant_ecrit_line2" id="montant_ecrit_line2-${index}">
  //           ${numberToWordsFR(check?.montant || 0).slice(17)}
  //         </span>
  //         <span class="check_data montant_to" id="montant_to-${index}">
  //           ${fournisseurNom || '----------------------------------------------------'}
  //         </span>
  //         <span class="check_data date montant_a_fr">Kélibia</span>
  //         <span class="check_data date montant_a_ar">قليبية</span>
  //         <span class="check_data date montant_le" id="montant_le-${index}">
  //           ${formattedDate || '--/--/----'}
  //         </span>
  //       </div>
  //     `);
  //   });

  //   printWindow.document.write('</body></html>');
  //   printWindow.document.close();
  //   printWindow.print();
  // };
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', borderRadius: '8px', width: '90%', height: 'auto' }}>
        <div className="relative w-full max-h-full">
          <div className="relative bg-white rounded-lg dark:bg-gray-700">
            <div className="check-num-print flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cheque #{item[0]?.num}
              </h3>
              <button onClick={handleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6" style={{maxHeight: '700px', overflow: 'scroll'}}>
              {/* <div className=" gap-6"> */}
                {item.map((check, index) => {
                  const selectedFournisseur = fournisseurs.find(f => f.id == check.fournisseur_id);
                  const fournisseurNom = selectedFournisseur ? selectedFournisseur.nom : '';

                  return (
                    <div className='print'>  
                      <div key={index} className="grid grid-cols-12 check"  id={`check-${index}`} style={{ width: '687.87401575px', height: '309.92125984px', display: 'block' }}>
                        <img src={atbImage} style={{ width: '100%', height: '100%' }} alt="Check" />
                        <span className="check_data montant" id={`montant-${index}`}>
                          {check?.montant || '------------'}
                        </span>
                        <span className="check_data montant_ecrit montant_ecrit_line1" id={`montant_ecrit_line1-${index}`}>
                          {numberToWordsFR(check?.montant || 0).slice(0, 17)}
                        </span>
                        <span className="check_data montant_ecrit montant_ecrit_line2" id={`montant_ecrit_line2-${index}`}>
                          {numberToWordsFR(check?.montant || 0).slice(17)}
                        </span>
                        <span className="check_data montant_to" id={`montant_to-${index}`}>
                          {fournisseurNom || '----------------------------------------------------'}
                        </span>
                        <span className="check_data date montant_a_fr">Kélibia</span>
                        <span className="check_data date montant_a_ar">قليبية</span>
                        <span className="check_data date montant_le" id={`montant_le-${index}`}>
                          {formattedDate || '--/--/----'}
                        </span>
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
                Imprimer chéque
              </RegularButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintModal;
