import React from 'react';
import moment from 'moment';
import PrintModal from './PrintModal';
import PrintModalTraite from './PrintModalTraite'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SettingService } from '../../_services/setting.service';
import { getFournisseurs } from '../../actions/fournisseurs';

const EventPopup = ({ event, onClose,settingimprimante }) => {
  const { montant, type, status } = event;
console.log('event',event)
  const popupStyle = {
    backgroundColor: event.backgroundColor,
    color: 'white',
  };

  let eventTypeTitle;
  switch (type) {
    case 'Chèque':
      eventTypeTitle = 'Chèque';
      break;
    case 'Traite':
      eventTypeTitle = 'Traite';
      break;
    default:
      eventTypeTitle = 'Event';
  }

  if (event.cheque) {
    eventTypeTitle += event.cheque.fournisseur ? ' Fournisseur' : ' Client';
  }

  const isImpaye = status === 'Impayé';

  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  const dispatch = useDispatch();
  const [settings, setSettings] = useState(null);

  const getCurrentCheckNumber = async () => {
    try {
      const settingData = await SettingService.index();
      if (settingData && settingData.data.current_cheque_number) {
        setSettings(settingData.data);
      }
    } catch (error) {
      console.error('Error fetching current check number:', error);
    }
  };

  useEffect(() => {
    getCurrentCheckNumber();
  }, []);

  const fournisseurs = useSelector((state) => state.fournisseurs);
  useEffect(() => {
    dispatch(getFournisseurs());
  }, []);
  const handleModalPrint = () => {
      setShowPrintModal(true);
  };


  return (
    <>
    <div className="event-popup" style={popupStyle}>
        <div className="event-popup-title" style={{ color: isImpaye ? 'white' : 'white' }}>
            {eventTypeTitle} Details
        </div>
      <div className="event-popup-text">
            <div>
                <strong style={{ color: isImpaye ? 'white' : 'white' }}>Banque:</strong>{' '}
                    <span style={{ color: isImpaye ? 'white' : 'white' }}>
                    {event?.cheque?.fournisseur ? event?.cheque?.fournisseur?.banque : event?.cheque?.client?.banque}
                    </span>
            </div>
            <div>
                <strong style={{ color: isImpaye ? 'white' : 'white' }}>Num Chéque:</strong>{' '}
                    <span style={{ color: isImpaye ? 'white' : 'white' }}>
                        #{event?.cheque ? event?.cheque?.num : ''}
                    </span>
            </div>
            <div>
                <strong style={{ color: isImpaye ? 'white' : 'white' }}>Nom:</strong>{' '}
                    <span style={{ color: isImpaye ? 'white' : 'white' }}>
                    {event?.cheque?.fournisseur ? event?.cheque?.fournisseur?.nom : event?.cheque?.client?.nom}
                    </span>
            </div>
            <div>
                <strong style={{ color: isImpaye ? 'white' : 'white' }}>Montant:</strong>{' '}
                <span style={{ color: isImpaye ? 'white' : 'white' }}>{montant}</span>
            </div>
            <div>
                <strong style={{ color:'white' }}>Type:</strong>{' '}
                <span style={{ color: isImpaye ? 'white' : 'white' }}>{type}</span>
            </div>
            <div>
                <strong style={{ color: isImpaye ? 'red' : 'white' }}>Status:</strong>{' '}
                <span style={{ color: isImpaye ? 'red' : 'white' }}>{status}</span>
            </div>
            <div>
                <strong style={{ color: isImpaye ? 'white' : 'white' }}>Num Chéque:</strong>{' '}
                    <span style={{ color: isImpaye ? 'white' : 'white' }}>
                        #{event?.cheque ? event?.cheque?.num : ''}
                    </span>
            </div>
            <div>
                <strong style={{ color: isImpaye ? 'white' : 'white' }}>Date d'échéance:</strong>{' '}
                    <span style={{ color: isImpaye ? 'white' : 'white' }}>
                    {event?.cheque ? moment(event?.cheque?.dueDate).format('DD MMMM YYYY') : ''}
                    </span>
            </div>
            <div>
            <strong style={{ color: isImpaye ? 'white' : 'white' }}>Créé à:</strong>{' '}
                <span style={{ color: isImpaye ? 'white' : 'white' }}>
                {event?.cheque ? moment(event?.cheque?.created_at).format('DD MMMM YYYY') : ''}
                </span>
            </div>
    </div>

 
      <button onClick={onClose}>Close</button>

        {type === 'Chèque' && (
            <button   onClick={handleModalPrint}>
              Imprimer Chéque
            </button>
          )}
          {type === 'Traite' && (
            <button  onClick={handleModalPrint}>
              Imprimer Traite
            </button>
          )}
      
    </div>

      {showPrintModal && (
        type === 'Chèque' ? (
          <PrintModal
            handleModal={() => setShowPrintModal(false)}
            fournisseurs={fournisseurs}
            item={[event?.cheque]}
            settings={settings}
            showBottom={showBottom}
            settingimprimante={settingimprimante}
          />
        ) : (
          <PrintModalTraite
            handleModal={() => setShowPrintModal(false)}
            fournisseurs={fournisseurs}
            item={[event?.cheque]}
            settings={settings}
            showBottom={showBottom}
            settingimprimante={settingimprimante}
          />
        )
      )}
      </>
  );
};

export default EventPopup;
