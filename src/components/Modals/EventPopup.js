import React from 'react';
import moment from 'moment';

const EventPopup = ({ event, onClose }) => {
  const { montant, type, status } = event;

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
  return (
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
    </div>
  );
};

export default EventPopup;
