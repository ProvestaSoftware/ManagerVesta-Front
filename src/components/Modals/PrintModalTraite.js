import React, { useState, useEffect } from "react";
import TraiteImage from "../../assets/images/traite_vierge_2.jpg";
import "../../assets/css/PrintModal.css";
import RegularButton from "../Buttons/RegularButton";
import moment from "moment";
import { ImprimanteService } from "../../_services/imprimante.service";

const PrintModal = ({
  item,
  handleModal,
  fournisseurs,
  settings,
  showBottom,
  settingimprimante,
}) => {
  function numberToWordsFR(num) {
    // num = num.toString().replace(',', '.');

    function convert(num) {
      if (isNaN(num) || num < 0 || num > 999999999999) {
        return "------------";
      }

      let result = "";

      // handle millions
      if (num >= 1000000000) {
        result += convert(Math.floor(num / 1000000000)) + " milliard ";
        num %= 1000000000;
      }

      // handle millions
      if (num >= 1000000) {
        result += convert(Math.floor(num / 1000000)) + " million ";
        num %= 1000000;
      }

      // handle thousands
      if (num >= 1000) {
        result += convert(Math.floor(num / 1000)) + " mille ";
        num %= 1000;
      }

      // handle hundreds
      if (num >= 100) {
        result += convert(Math.floor(num / 100)) + " cent ";
        num %= 100;
      }

      // handle tens and units
      if (num >= 20) {
        var is_90_or_70 = false;
        switch (Math.floor(num / 10)) {
          case 9:
            result += "quatre-vingt";
            is_90_or_70 = true;
            break;
          case 8:
            result += "quatre-vingt";
            break;
          case 7:
            result += "soixante";
            is_90_or_70 = true;
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
            result += is_90_or_70 ? "dix-neuf" : "neuf";
            break;
          case 8:
            result += is_90_or_70 ? "dix-huit" : "huit";
            break;
          case 7:
            result += is_90_or_70 ? "dix-sept" : "sept";
            break;
          case 6:
            result += is_90_or_70 ? "seize" : "six";
            break;
          case 5:
            result += is_90_or_70 ? "quinze" : "cinq";
            break;
          case 4:
            result += is_90_or_70 ? "quatorze" : "quatre";
            break;
          case 3:
            result += is_90_or_70 ? "treize" : "trois";
            break;
          case 2:
            result += is_90_or_70 ? "douze" : "deux";
            break;
          case 1:
            result += is_90_or_70 ? "onze" : "un";
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

    let dinars = Math.floor(Number(num));
    let millimes = Math.round(Number(num - dinars) * 1000);

    let dinarsText = convert(dinars);
    let millimesText = convert(millimes);

    if (dinarsText && millimesText) {
      return dinarsText + " dinars et " + millimesText + " millimes";
    } else if (dinarsText) {
      return dinarsText + " dinars";
    } else if (millimesText) {
      return millimesText + " millimes";
    } else {
      return "zéro";
    }
  }

  React.useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  }, []);

  let printingStyles = "";

  useEffect(() => {
    const styleElement = document.createElement("style");

    // Define the printing styles based on the state variable
    printingStyles = `
    @media print {
      .traite {
        page-break-before: always !important; 
        margin-left: -${
          355 - Number(settingimprimante?.traite_margin_top || 0)
        }px !important;
        margin-top: ${
          340 + Number(settingimprimante?.traite_margin_left || 0)
        }px !important;
        transform: rotate(${
          Number(settingimprimante?.traite_rotation_degree) || 0
        }deg);
      }
      ${settingimprimante?.traite_extra_css ?? ""}
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

  function supprimerStylesImpression(html) {
    // Utiliser une expression régulière pour supprimer le bloc @media print
    let updatedString = html.replace(/@media print {[\s\S]*?}/g, "");
    updatedString = updatedString.replace(/}/g, "");
    return updatedString;
  }

  const printSection = () => {
    let printContents = "";

    printContents += printingStyles;

    item.forEach((_, index) => {
      const divToPrint = document.getElementById(`print-${index}`);

      if (divToPrint) {
        printContents += divToPrint.innerHTML;
        printContents += "</div>";
        printContents="<div class='h-[50vh]'>"+printContents+"</div>"
      }
    });

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = supprimerStylesImpression(printContents);
    console.log(supprimerStylesImpression(printContents));
    window.print();
    document.body.innerHTML = originalContents;
    if (showBottom) {
      window.location.reload();
    } else {
      window.location.href = "/payment";
    }
  };

  const rib = settings?.rib_bank.replace(/\s+/g, "");
  const segments1 = rib?.slice(0, 2);
  const segments2 = rib?.slice(2, 5);
  const segments3 = rib?.slice(5, rib?.length - 2);
  const segments4 = rib?.slice(-2);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "0%",
          left: "50%",
          transform: "translate(-50%, 0%)",
          padding: "20px",
          borderRadius: "8px",
          width: "100vh",
          height: "90vh",
          minWidth: "800px",
        }}
      >
        <div className="relative w-full max-h-full">
          <div className="relative bg-white rounded-lg dark:bg-gray-700">
            <div className="check-num-print flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {(item.type = "traite" ? "Traite(s)" : "Chéque(s)")} &nbsp;
                {item?.map((check, index) => (
                  <span key={"ChecksPrintModal" + index}>
                    {index > 0 && ", "}#{check?.num}
                  </span>
                ))}
              </h3>
              {showBottom && (
                <button
                  onClick={handleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                  data-modal-hide="editUserModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              )}
            </div>
            <div
              className="p-6 space-y-6"
              style={{ maxHeight: "70vh", overflowY: "scroll" }}
            >
              {/* <div className=" gap-6"> */}
              {item.map((check, index) => {
                const selectedFournisseur = fournisseurs.find(
                  (f) => f.id == check.fournisseur_id
                );
                const fournisseurNom = selectedFournisseur
                  ? selectedFournisseur.nom
                  : "";

                return (
                  <div
                    className={`print`}
                    id={`print-${index}`}
                    key={`print-${index}`}
                  >
                    {/* <span className='num_check_header'>Chéque n°{check.num}</span> */}
                    <div
                      key={index}
                      className="grid grid-cols-12 check traite"
                      id={`check-${index}`}
                      style={{
                        width: "687.87401575px",
                        // height: '509.92125984px',
                        display: "block",
                        border: "1px solid #ddd",
                        borderRadius: "3px",
                        pageBreakBefore: "always !important",
                      }}
                    >
                      <img src={TraiteImage} alt="Check" />
                      <div
                        className="extra_margin_parameters"
                        style={{
                          marginLeft: `${settings?.cheque_margin_left_trades}px`,
                          marginTop: `${settings?.cheque_margin_right_trades}px`,
                        }}
                      >
                        {/* <span className="check_data num_check" id={`montant-${index}`} style={{left: '80px', top: '28px'}}>
                            <b>{check?.num ?? '------'}</b>
                          </span> */}
                        <span
                          className="check_data date montant_due_top"
                          style={{ left: "220px", top: "63px" }}
                        >
                          {moment(check.dueDate).format("DD/MM/YYYY") ||
                            "--/--/----"}
                        </span>
                        <span
                          className="check_data date montant_le_top date_creation_top"
                          style={{ left: "350px", top: "64px" }}
                        >
                          {moment(check.created_at).format("DD/MM/YYYY") ||
                            "--/--/----"}
                        </span>
                        <span
                          className="check_data date montant_a_top top_pays"
                          style={{ left: "350px", top: "46px" }}
                        >
                          {settings?.paye_de_signature}
                        </span>

                        <span
                          className="check_data montant checkmontanttop"
                          id={`montant-${index}`}
                          style={{ left: "540px", top: "97px" }}
                        >
                          #
                          {(check?.montant || 0)
                            .toLocaleString("fr-FR", {
                              minimumFractionDigits: 3,
                              maximumFractionDigits: 3,
                            })
                            .toString()
                            .replace(",", ".")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                          #
                        </span>
                        <span
                          className="check_data montant segments_top segments1"
                          id={`montant-${index}`}
                          style={{ left: "200px", top: "97px" }}
                        >
                          {segments1}
                        </span>
                        <span
                          className="check_data montant segments_top segments2"
                          id={`montant-${index}`}
                          style={{ left: "245px", top: "97px" }}
                        >
                          {segments2}
                        </span>
                        <span
                          className="check_data montant segments_top"
                          id={`montant-${index}`}
                          style={{ left: "300px", top: "97px" }}
                        >
                          {segments3}
                        </span>
                        <span
                          className="check_data montant segments_top segments4_top"
                          id={`montant-${index}`}
                          style={{ left: "464px", top: "97px" }}
                        >
                          {segments4}
                        </span>

                        <span
                          className="check_data montant checkmontantbas"
                          id={`montant-${index}`}
                          style={{ left: "540px", top: "155px" }}
                        >
                          #
                          {(check?.montant || 0).toLocaleString("fr-FR", {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          })}
                          #
                        </span>

                        <span
                          className="check_data montant_to"
                          id={`montant_to-${index}`}
                          style={{
                            left: "360px",
                            top: "160px",
                            transform: "translate(-50%, 0%)",
                          }}
                        >
                          {fournisseurNom || "-------------------------------"}
                        </span>
                        <span
                          className="check_data montant_ecrit montant_ecrit_line1"
                          id={`montant_ecrit_line1-${index}`}
                          style={{
                            top: "190px",
                            lineHeight: "15px",
                            width: "650px",
                            textAlign: "center",
                          }}
                        >
                          {`${numberToWordsFR(check?.montant || 0)}`}
                        </span>
                        {/* <span className="check_data montant_ecrit montant_ecrit_line2" id={`montant_ecrit_line2-${index}`} style={{left: 'calc(50% + 30px)', top: '90px'}}>
                            {`${numberToWordsFR(check?.montant || 0)} dinars`.split(' ').slice(4).join(' ')}
                          </span> */}
                        <div
                          className="middle_dates_div"
                          style={{ position: "absolute", top: "0" }}
                        >
                          <span
                            className="check_data date created_at"
                            id={`montant_le-${index}`}
                            style={{ left: "130px", top: "225px" }}
                          >
                            {moment(check.created_at).format("DD/MM/YYYY") ||
                              "--/--/----"}
                          </span>
                          <span
                            className="check_data date dueDate"
                            id={`montant_le-${index}`}
                            style={{ left: "235px", top: "225px" }}
                          >
                            {moment(check.dueDate).format("DD/MM/YYYY") ||
                              "--/--/----"}
                          </span>
                          <span
                            className="check_data date paye montant_a_bottom"
                            style={{
                              left: "10px",
                              top: "229px",
                              width: "100px",
                              lineHeight: "12px",
                            }}
                          >
                            {settings?.paye_de_signature}
                          </span>
                        </div>

                        <span
                          className="check_data date business_name"
                          style={{
                            left: "330px",
                            top: "300px",
                            maxWidth: "100px",
                            maxHeight: "100px",
                            textAlign: "center",
                          }}
                        >
                          {settings?.business_name}
                        </span>
                        <span
                          className="check_data date bankname"
                          style={{
                            left: "570px",
                            top: "280px",
                            width: "200px",
                            textAlign: "center",
                            transform: "translate(-50%, 0%)",
                          }}
                        >
                          {settings?.bank_name}
                        </span>

                        <div
                          className="bottom_segments_div"
                          style={{ position: "absolute", top: "0" }}
                        >
                          <span
                            className="check_data date segments_bottom segments11"
                            id={`montant_le-${index}`}
                            style={{ left: "22px", top: "265px" }}
                          >
                            {segments1}
                          </span>
                          <span
                            className="check_data date segments_bottom segments22"
                            id={`montant_le-${index}`}
                            style={{ left: "50px", top: "265px" }}
                          >
                            {segments2}
                          </span>
                          <span
                            className="check_data date segments_bottom segments33"
                            id={`montant_le-${index}`}
                            style={{ left: "95px", top: "265px" }}
                          >
                            {segments3}
                          </span>
                          <span
                            className="check_data date segments_bottom segments44"
                            id={`montant_le-${index}`}
                            style={{ left: "275px", top: "265px" }}
                          >
                            {segments4}
                          </span>
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
                Imprimer {item.length > 1 ? "les traites" : "la traite"}
              </RegularButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
