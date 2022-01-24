import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
// import * as RiIcons from 'react-icons/ri';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    // className: 'data',
  },
  {
    title: 'Movies',
    path: 'movies',
    icon: <FaIcons.FaFilm />,
  },
  {
    title: 'TV Shows',
    path: 'tvshows',
    icon: <CgIcons.CgScreen />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
    // subNav: [
    //   {
    //     title: 'Top',
    //     path: '/tvshows',
    //   },
    //   {
    //     title: 'Action & Adventure',
    //     path: '/tvshows/actionadventure',
    //   },
    //   {
    //     title: 'Animation',
    //     path: '/tvshows/animation',
    //   },
    //   {
    //     title: 'Comedy',
    //     path: '/tvshows/comedy',
    //   },
    //   {
    //     title: 'Crime',
    //     path: '/tvshows/crime',
    //   },
    //   {
    //     title: 'Documentary',
    //     path: '/tvshows/documentary',
    //   },
    //   {
    //     title: 'Drama',
    //     path: '/tvshows/drama',
    //   },
    //   {
    //     title: 'Kids',
    //     path: '/tvshows/kids',
    //   },
    //   {
    //     title: 'Mystery',
    //     path: '/tvshows/mystery',
    //   },
    //   {
    //     title: 'Reality',
    //     path: '/tvshows/reality',
    //   },
    // ],
    // className: 'data',
  },
  {
    title: 'Favorite',
    path: 'favorite',
    icon: <MdIcons.MdFavorite />,
    // className: 'data',
  },
];

export default SidebarData;
