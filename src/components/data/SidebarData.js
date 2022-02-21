import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
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
  },
  {
    title: 'Favorite',
    path: 'favorite',
    icon: <MdIcons.MdFavorite />,
  },
];

export default SidebarData;
