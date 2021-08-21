import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
import * as RiIcons from 'react-icons/ri';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    className: 'data',
  },
  {
    title: 'Movies',
    path: '#',
    icon: <FaIcons.FaFilm />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Top',
        path: '/movies',
      },
      {
        title: 'Action',
        path: '/movies/action',
      },
      {
        title: 'Adventure',
        path: '/movies/adventure',
      },
      {
        title: 'Animation',
        path: '/movies/animation',
      },
      {
        title: 'Comedy',
        path: '/movies/comedy',
      },
      {
        title: 'Documentary',
        path: '/movies/documentary',
      },
      {
        title: 'Drama',
        path: '/movies/drama',
      },
      {
        title: 'Fantasy',
        path: '/movies/fantasy',
      },
      {
        title: 'Horror',
        path: '/movies/horror',
      },
      {
        title: 'Romance',
        path: '/movies/romance',
      },
      {
        title: 'Science Fiction',
        path: '/movies/scifi',
      },
    ],
    className: 'data',
  },
  {
    title: 'TV Shows',
    path: '#',
    icon: <CgIcons.CgScreen />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Top',
        path: '/tvshows',
      },
      {
        title: 'Action & Adventure',
        path: '/tvshows/actionadventure',
      },
      {
        title: 'Animation',
        path: '/tvshows/animation',
      },
      {
        title: 'Comedy',
        path: '/tvshows/comedy',
      },
      {
        title: 'Crime',
        path: '/tvshows/crime',
      },
      {
        title: 'Documentary',
        path: '/tvshows/documentary',
      },
      {
        title: 'Drama',
        path: '/tvshows/drama',
      },
      {
        title: 'Kids',
        path: '/tvshows/kids',
      },
      {
        title: 'Mystery',
        path: '/tvshows/mystery',
      },
      {
        title: 'Reality',
        path: '/tvshows/reality',
      },
    ],
    className: 'data',
  },
  {
    title: 'Favorite',
    path: '/favorite',
    icon: <MdIcons.MdFavorite />,
    className: 'data',
  },
];

export default SidebarData;
