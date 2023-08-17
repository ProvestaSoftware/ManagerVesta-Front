import React, { useState } from 'react'
import atbImage from '../../assets/images/ATBcheck.jpg'
import '../../assets/css/PrintModal.css'

const PrintModal = ({ item, handleModal }) => {

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

    const [amount, setAmount] = useState('');
    const [fournisseur, setFournisseur] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    const handleAmountChange = (event) => {
        const amountValue = parseInt(event.target.value);
        if (isNaN(amountValue)) {
            setAmount('--------------');
        } else {
            setAmount(amountValue.toLocaleString('en'));
            const letters = numberToWordsFR(amountValue) + ' dinars';
            setMontantEcritLine1(letters.slice(0, 17));
            setMontantEcritLine2(letters.slice(17));
        }
    };

    const handleFournisseurChange = (event) => {
        setFournisseur(event.target.value);
    };

    const printSection = () => {
        window.print();
    };

    const setMontantEcritLine1 = (text) => {
        document.getElementById('montant_ecrit_line1').innerText = text;
    };

    const setMontantEcritLine2 = (text) => {
        document.getElementById('montant_ecrit_line2').innerText = text;
    };

    React.useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        setFormattedDate(formattedDate);
        document.getElementById('montant_le').innerText = formattedDate;
    }, []);


    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                borderRadius: '8px',
                width: 'auto',
                height: 'auto',
            }}>
                <div class="relative w-full max-w-2xl max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Cheque #{item.num}
                            </h3>
                            <button onClick={handleModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-6 space-y-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div className="check" id="mySection" style={{ width: '687.87401575px', height: '309.92125984px' }}>
                                    <img src={atbImage} style={{ width: '100%', height: '100%' }} alt="Check" />
                                    <span className="check_data montant" id="montant">
                                        {amount || '------------'}
                                    </span>
                                    <span className="check_data montant_ecrit montant_ecrit_line1" id="montant_ecrit_line1">
                                        {formattedDate || '--------------------'}
                                    </span>
                                    <span className="check_data montant_ecrit montant_ecrit_line2" id="montant_ecrit_line2">
                                        {'------------------------------------------------'}
                                    </span>
                                    <span className="check_data montant_to" id="montant_to">
                                        {fournisseur || '----------------------------------------------------'}
                                    </span>
                                    <span className="check_data date montant_a_fr">Kélibia</span>
                                    <span className="check_data date montant_a_ar">قليبية</span>
                                    <span className="check_data date montant_le" id="montant_le">
                                        --/--/----
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <input
                                type="number"
                                placeholder="Montant ( dt )"
                                min="1"
                                max="999999999"
                                id="amount"
                                onChange={handleAmountChange}
                                style={{ height: '30px', marginBottom: '20px' }}
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Fournisseur"
                                id="fournisseur"
                                onChange={handleFournisseurChange}
                                style={{ height: '30px', marginBottom: '20px' }}
                            />
                            <br />
                            <input
                                type="submit"
                                value="Imprimer chéque"
                                style={{
                                    height: 'auto',
                                    marginBottom: '20px',
                                    background: '#6ea8cc',
                                    color: '#fff',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    padding: '14px'
                                }}
                                onClick={printSection}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintModal