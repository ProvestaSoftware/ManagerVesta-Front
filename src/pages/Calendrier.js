import React, { useEffect, useState } from 'react';
import ContentWrapper from '../components/ContentWrapper';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PageTitle from '../components/PageTitle';
import RegularDivider from '../components/RegularDivider';
import '../assets/css/Calendrier.css';
import { useDispatch, useSelector } from 'react-redux';
import { getChecks } from '../actions/checks';
import { ChecksClients } from '../_services/checksclients.service';
import Skeleton from 'react-loading-skeleton'

const localizer = momentLocalizer(moment);

const Calendrier = () => {
    const checks = useSelector((state) => state.checks);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const [checkclient, setCheckClient] = useState([]);

    const getData = () => {
        setLoader(true)
        ChecksClients.getAll()
          .then(res => {
            setCheckClient(res.data)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            setLoader(false)
          })
      }
    
      useEffect(() => {
        getData()
      }, [])

    useEffect(() => {
        // Fetch data here
        dispatch(getChecks())
            .then(() => {
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false); 
            });
    }, [dispatch]);
console.log('checkclient',checkclient)
    const today = new Date(); 

    const events = [...checks, ...checkclient].map((eventItem) => ({
        id: eventItem.id,
        title: `${eventItem.montant} DT`,
        start: new Date(eventItem.dueDate),
        end: new Date(eventItem.dueDate),
        type: eventItem?.type,
        status:eventItem?.status,
        client: eventItem
    }));
console.log('events',events)
    const eventStyleGetter = (event) => {

        let backgroundColor;

        const isChequeClient = event?.client?.client && event?.type === 'Chèque';
        const isTraireClient = event?.client?.client && event?.type === 'Traite';
        const isChequeFournisseur = event?.client?.fournisseur && event?.type === 'Chèque';
        const isTraiteFournisseur = event?.client?.fournisseur && event?.type === 'Traite';

        const isImpaye = event?.status === 'Impayé';

        if (isChequeClient) {
            backgroundColor = '#13ab50';
        } else if (isTraireClient) {
            backgroundColor = '#cfd323';
        } else if (isChequeFournisseur) {
            backgroundColor = '#00a3ff';
        } else if (isTraiteFournisseur) {
            backgroundColor = '#0c498f';
        }

        if (event?.start < today && isImpaye) {
            return {
                style: {
                    color: '#be0c0c',
                    border: '2px solid #be0c0c',
                    opacity: 0.7,
                    backgroundColor : backgroundColor
                },
            };
        }else if(event?.start < today ){
            return {
                style: {
                    opacity: 0.5,
                    backgroundColor : backgroundColor
                },
            };
        }

        return {
             style: {
                backgroundColor,
            },
        };
    };

    return (
        <ContentWrapper>
            <div className='calendar-wrapper'>
                <div>
                    <PageTitle>Calendrier</PageTitle>
                </div>
                <RegularDivider />
                {loader ? (
                   <Skeleton count={5} />
                    ) : (
                        <Calendar
                            titleAccessor="title"
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            eventPropGetter={eventStyleGetter}
                            style={{ height: '500px', marginTop: '20px', border: '1px solid #ddd', borderRadius: '5px' }}
                            />
                )}
                <div className="legend">
                    <span className="legend-item" style={{ marginRight: '20px' }}>
                        <span className="legend-color" style={{ backgroundColor: '#00a3ff', display: 'inline-block', width: '15px', height: '15px', marginRight: '5px', borderRadius: '50%' }}></span>
                        Chèque Fournisseur
                    </span>
                    <span className="legend-item" style={{ marginRight: '20px' }}>
                        <span className="legend-color" style={{ backgroundColor: '#0c498f', display: 'inline-block', width: '15px', height: '15px', marginRight: '5px', borderRadius: '50%' }}></span>
                        Traire Fournisseur
                    </span>
                    <span className="legend-item" style={{ marginRight: '20px' }}>
                        <span className="legend-color" style={{ backgroundColor: '#13ab50', display: 'inline-block', width: '15px', height: '15px', marginRight: '5px', borderRadius: '50%' }}></span>
                        Chèque Client
                    </span>
                    <span className="legend-item" style={{ marginRight: '20px' }}>
                        <span className="legend-color" style={{ backgroundColor: '#cfd323', display: 'inline-block', width: '15px', height: '15px', marginRight: '5px', borderRadius: '50%' }}></span>
                        Traire Client
                    </span>
                    <span className="legend-item" style={{ marginRight: '20px' }}>
                        <span className="legend-color" style={{ backgroundColor: 'red', display: 'inline-block', width: '15px', height: '15px', marginRight: '5px', borderRadius: '50%' }}></span>
                        Date de chèque dépassée
                    </span>
                </div>
            </div>
        </ContentWrapper>
    );
};

export default Calendrier;
