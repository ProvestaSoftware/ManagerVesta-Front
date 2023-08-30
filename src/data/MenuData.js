import { AiFillCalendar } from 'react-icons/ai'
import { ImStatsDots } from 'react-icons/im'
import { IoGrid, IoPrint, IoSettingsSharp } from 'react-icons/io5'
import { HiNewspaper } from 'react-icons/hi'
import { LuNewspaper } from 'react-icons/lu'
import { FaUserTie, FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { MdOutlineNetworkPing } from 'react-icons/md'

export const sidebarMenuData = [
    {
        title: 'Accueil',
        link: 'accueil',
        icon: <IoGrid />
    },
    {
        title: 'Imprimer',
        link: 'imprimer',
        icon: <IoPrint />
    },
    {
        title: 'Ch / Tr fournisseurs ',
        link: 'cheques-fournisseurs',
        icon: <HiNewspaper />
    },
    {
        title: 'Calendrier',
        link: 'calendrier',
        icon: <AiFillCalendar />
    },
    {
        title: 'Fournisseurs',
        link: 'fournisseurs',
        icon: <FaUserTie />
    },
    {
        title: 'Ch / Tr clients',
        link: 'cheques-clients',
        icon: <LuNewspaper />
    },
    {
        title: 'Clients',
        link: 'clients',
        icon: <FaUser />
    },
    {
        title: 'Statistiques',
        link: 'stats',
        icon: <ImStatsDots />
    },
    {
        title: 'KPIs',
        link: 'kpis',
        icon: <MdOutlineNetworkPing />
    },
]

export const sidebarBottomMenuData = [
    {
        title: 'Paramètres',
        link: 'parametres',
        icon: <IoSettingsSharp />
    },
    {
        title: 'Se déconnecter',
        icon: <BiLogOut />
    },
]

export const dropdownMenuData = [
    {
        title: 'Accueil',
        link: 'accueil',
        icon: <IoGrid />
    },
    {
        title: 'Paramètres',
        link: 'parametres',
        icon: <IoSettingsSharp />
    },
    {
        title: 'Se déconnecter',
        icon: <BiLogOut />
    },
]

export const dropdownCheckStatusData = [
    {
        id: '1',
        nom: 'Payé',
    },
    {
        id: '2',
        nom: 'En Attente',
    },
    {
        id: '3',
        nom: 'Impayé',
    },
]