import { BsCoin, BsFillLightningChargeFill } from "react-icons/bs";
import RegularDivider from "../components/RegularDivider";
import { FaArrowsAltV } from "react-icons/fa";
import { ImDroplet } from "react-icons/im";
import profileImage from '../assets/images/fourat.jpg';

export const checkTypeData = [
    {
        id: '1',
        nom: 'Tous',
    },
    {
        id: '2',
        nom: 'Chèque',
    },
    {
        id: '3',
        nom: 'Traite',
    },
]

export const fournisseursData = [
    {
        id: '1',
        nom: 'Fourat Abdellatif',
        email: 'fourat.abdellatif@esprit.tn',
        numTel: '26699906',
        rib: '12345678',
        banque: 'ATB',
        created_at: '14/03/2023',
    },
    {
        id: '2',
        nom: 'Walid Sammoud',
        email: 'fourat.abdellatif@esprit.tn',
        numTel: '26699906',
        rib: '12345678',
        banque: 'STB',
        created_at: '14/03/2023',
    },
    {
        id: '3',
        nom: 'Khaled Sammoud',
        email: 'fourat.abdellatif@esprit.tn',
        numTel: '26699906',
        rib: '12345678',
        banque: 'BNA',
        created_at: '14/03/2023',
    },
    {
        id: '4',
        nom: 'Zaher Hmaid',
        email: 'fourat.abdellatif@esprit.tn',
        numTel: '26699906',
        rib: '12345678',
        banque: 'BNA',
        created_at: '14/03/2023',
    },
]

export const clientsData = [
    {
        id: '1',
        nom: 'Fourat Abdellatif',
        email: 'fourat.abdellatif@esprit.tn',
        numTel: '26699906',
        rib: '12345678',
        banque: 'ATB',
        created_at: '14/03/2023',
    },
    {
        id: '2',
        nom: 'Walid Sammoud',
        email: 'fourat.abdellatif@esprit.tn',
        numTel: '26699906',
        rib: '12345678',
        banque: 'STB',
        created_at: '14/03/2023',
    },
    {
        id: '3',
        nom: 'Khaled Sammoud',
        email: 'fourat.abdellatif@esprit.tn',
        numTel: '26699906',
        rib: '12345678',
        banque: 'BNA',
        created_at: '14/03/2023',
    },
    {
        id: '4',
        nom: 'Zaher Hmaid',
        email: 'fourat.abdellatif@esprit.tn',
        numTel: '26699906',
        rib: '12345678',
        banque: 'BNA',
        created_at: '14/03/2023',
    },
]

export const checksData = [
    {
        id: '1',
        num: '123456',
        montant: '10.000',
        fournisseur: 'Foulen',
        type: 'Cheque',
        created_at: '14/03/2023',
        dueDate: '14/03/2023',
        status: 'Payé',
    },
    {
        id: '2',
        num: '234567',
        montant: '5.000',
        fournisseur: 'Foulen 2',
        type: 'Traite',
        created_at: '14/03/2023',
        dueDate: '14/03/2023',
        status: 'En Attente',
    },
    {
        id: '3',
        num: '987654',
        montant: '10.000',
        fournisseur: 'Foulen',
        type: 'Traite',
        created_at: '14/03/2023',
        dueDate: '14/03/2023',
        status: 'Payé',
    },
    {
        id: '4',
        num: '852741',
        montant: '10.000',
        fournisseur: 'Foulen',
        type: 'Traite',
        created_at: '14/03/2023',
        dueDate: '14/03/2023',
        status: 'Impayé',
    },
]

export const eventsData = [
    {
        id: 1,
        title: 'Meeting',
        start: new Date(2023, 6, 21, 10, 0),
        end: new Date(2023, 6, 21, 12, 0),
    },
    {
        id: 2,
        title: 'Event',
        start: new Date(2023, 6, 22, 15, 0),
        end: new Date(2023, 6, 22, 17, 30),
    },
    // Add more events as needed
];

export const statsData = [
    {
        id: 1,
        title: 'Impressions Total',
        amount: '120',
        unity: '',
        icon: <BsFillLightningChargeFill style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: '#599FCA',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#ffffff',
        backgroundColor: '#ee8432',
        divider: <RegularDivider color="#ffffff" size="0.5px" width="50%" />,
    },
    {
        id: 2,
        title: 'Chèques',
        amount: '100',
        unity: '',
        icon: <FaArrowsAltV style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: 'rgba(255, 126, 134, 0.10)',
            color: '#6ea8cc',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#000000',
        backgroundColor: '#ffffff',
        divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
    },
    {
        id: 3,
        title: 'Traites',
        amount: '20',
        unity: '',
        icon: <ImDroplet style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: 'rgba(161, 98, 247, 0.10)',
            color: '#A162F7',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#000000',
        backgroundColor: '#ffffff',
        divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
    },
    {
        id: 4,
        title: 'Montant Sortant',
        amount: '120.000',
        unity: 'DT',
        icon: <BsFillLightningChargeFill style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: '#1A569B',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#ffffff',
        backgroundColor: '#2663a9',
        divider: <RegularDivider color="#ffffff" size="0.5px" width="50%" />,
    },
    {
        id: 5,
        title: 'Montant des Chèques',
        amount: '100.000',
        unity: 'DT',
        icon: <BsCoin style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: 'rgba(246, 204, 13, 0.10)',
            color: '#F6CC0D',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#000000',
        backgroundColor: '#ffffff',
        divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
    },
    {
        id: 6,
        title: 'Montant des Traits',
        amount: '20.000',
        unity: 'DT',
        icon: <BsCoin style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: 'rgba(246, 204, 13, 0.10)',
            color: '#F6CC0D',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#000000',
        backgroundColor: '#ffffff',
        divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
    },
    {
        id: 7,
        title: 'Montant Entrant',
        amount: '140.000',
        unity: 'DT',
        icon: <BsFillLightningChargeFill style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: '#599FCA',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#ffffff',
        backgroundColor: '#ee8432',
        divider: <RegularDivider color="#ffffff" size="0.5px" width="50%" />,
    },
    {
        id: 8,
        title: 'Montant des Chèques',
        amount: '110.000',
        unity: 'DT',
        icon: <BsCoin style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: 'rgba(246, 204, 13, 0.10)',
            color: '#F6CC0D',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#000000',
        backgroundColor: '#ffffff',
        divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
    },
    {
        id: 9,
        title: 'Montant des Traits ',
        amount: '30.000',
        unity: 'DT',
        icon: <BsCoin style={{
            margin: 'auto',
            display: 'block',
            backgroundColor: 'rgba(246, 204, 13, 0.10)',
            color: '#F6CC0D',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '6px'
        }} />,
        color: '#000000',
        backgroundColor: '#ffffff',
        divider: <RegularDivider color="#000000" size="0.5px" width="50%" />,
    },
]

export const connectedUserData = {
    id: 1,
    nom: "Abdellatif",
    prenom: "Fourat",
    email: "fourat.abdellatif@esprit.tn",
    profilePicture: profileImage,
}