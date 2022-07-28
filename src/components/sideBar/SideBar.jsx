import React from 'react';
import styles from './SideBar.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { useContext } from 'react';

const SideBar = ({ setColorOnSideBarIcon, sideBarIndex }) => {
  const userMenu = [
    {
      label: 'Dashboard',
      icon: [
        'm498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0'
      ],
      viewBox: '0 0 512 512',
      destination: '/'
    },
    {
      label: 'User Settings',
      icon: [
        'm22.683 9.394-1.88-.239c-.155-.477-.346-.937-.569-1.374l1.161-1.495c.47-.605.415-1.459-.122-1.979l-1.575-1.575c-.525-.542-1.379-.596-1.985-.127l-1.493 1.161c-.437-.223-.897-.414-1.375-.569l-.239-1.877c-.09-.753-.729-1.32-1.486-1.32h-2.24c-.757 0-1.396.567-1.486 1.317l-.239 1.88c-.478.155-.938.345-1.375.569l-1.494-1.161c-.604-.469-1.458-.415-1.979.122l-1.575 1.574c-.542.526-.597 1.38-.127 1.986l1.161 1.494c-.224.437-.414.897-.569 1.374l-1.877.239c-.753.09-1.32.729-1.32 1.486v2.24c0 .757.567 1.396 1.317 1.486l1.88.239c.155.477.346.937.569 1.374l-1.161 1.495c-.47.605-.415 1.459.122 1.979l1.575 1.575c.526.541 1.379.595 1.985.126l1.494-1.161c.437.224.897.415 1.374.569l.239 1.876c.09.755.729 1.322 1.486 1.322h2.24c.757 0 1.396-.567 1.486-1.317l.239-1.88c.477-.155.937-.346 1.374-.569l1.495 1.161c.605.47 1.459.415 1.979-.122l1.575-1.575c.542-.526.597-1.379.127-1.985l-1.161-1.494c.224-.437.415-.897.569-1.374l1.876-.239c.753-.09 1.32-.729 1.32-1.486v-2.24c.001-.757-.566-1.396-1.316-1.486zm-10.683 7.606c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z'
      ],
      viewBox: '0 0 24 24',
      destination: '/settings'
    },
    {
      label: 'Most Popular',
      icon: [
        'M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z'
      ],
      viewBox: '0 0 18 18',
      destination: '/popular'
    },
    {
      label: 'Return car',
      icon: [
        'M248.625,89.25V0l-127.5,127.5l127.5,127.5V140.25c84.15,0,153,68.85,153,153c0,84.15-68.85,153-153,153	c-84.15,0-153-68.85-153-153h-51c0,112.2,91.8,204,204,204s204-91.8,204-204S360.825,89.25,248.625,89.25z'
      ],
      viewBox: '0 0 497.25 497.25',
      destination: '/return-car'
    }
  ];

  const adminMenu = [
    {
      label: 'Dashboard',
      icon: [
        'm498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0'
      ],
      viewBox: '0 0 512 512',
      destination: '/'
    },
    {
      label: 'Users',
      icon: [
        'M48.355,17.922c3.705,2.323,6.303,6.254,6.776,10.817c1.511,0.706,3.188,1.112,4.966,1.112 c6.491,0,11.752-5.261,11.752-11.751c0-6.491-5.261-11.752-11.752-11.752C53.668,6.35,48.453,11.517,48.355,17.922z M40.656,41.984 c6.491,0,11.752-5.262,11.752-11.752s-5.262-11.751-11.752-11.751c-6.49,0-11.754,5.262-11.754,11.752S34.166,41.984,40.656,41.984 z M45.641,42.785h-9.972c-8.297,0-15.047,6.751-15.047,15.048v12.195l0.031,0.191l0.84,0.263 c7.918,2.474,14.797,3.299,20.459,3.299c11.059,0,17.469-3.153,17.864-3.354l0.785-0.397h0.084V57.833 C60.688,49.536,53.938,42.785,45.641,42.785z M65.084,30.653h-9.895c-0.107,3.959-1.797,7.524-4.47,10.088 c7.375,2.193,12.771,9.032,12.771,17.11v3.758c9.77-0.358,15.4-3.127,15.771-3.313l0.785-0.398h0.084V45.699 C80.13,37.403,73.38,30.653,65.084,30.653z M20.035,29.853c2.299,0,4.438-0.671,6.25-1.814c0.576-3.757,2.59-7.04,5.467-9.276 c0.012-0.22,0.033-0.438,0.033-0.66c0-6.491-5.262-11.752-11.75-11.752c-6.492,0-11.752,5.261-11.752,11.752 C8.283,24.591,13.543,29.853,20.035,29.853z M30.589,40.741c-2.66-2.551-4.344-6.097-4.467-10.032 c-0.367-0.027-0.73-0.056-1.104-0.056h-9.971C6.75,30.653,0,37.403,0,45.699v12.197l0.031,0.188l0.84,0.265 c6.352,1.983,12.021,2.897,16.945,3.185v-3.683C17.818,49.773,23.212,42.936,30.589,40.741z'
      ],
      viewBox: '0 0 80 80',
      destination: '/users'
    },
    {
      label: 'Rentals',
      icon: [
        'M195.805,213.251l-48.24-48.4c-3.12-3.102-8.16-3.102-11.28,0l-28.72,28.72c-3.102,3.12-3.102,8.16,0,11.28l4.88,4.88 l-102.24,102.32c-1.459,1.47-2.29,3.449-2.32,5.52l-0.8,42.48c0,4.418,3.582,8,8,8h33.6c2.126,0.012,4.17-0.823,5.68-2.32	l18.88-18.88c1.44-1.45,2.27-3.397,2.32-5.44l0.48-17.12l13.68,1.68c2.453,0.293,4.904-0.563,6.64-2.32l11.92-11.6 c1.316-1.308,2.136-3.034,2.32-4.88l1.52-16l19.52-4.32c3.158-0.693,5.589-3.218,6.16-6.4l3.92-21.68l20.96-3.28	c1.666-0.264,3.206-1.048,4.4-2.24l28.72-28.72C198.907,221.41,198.907,216.371,195.805,213.251z',
        'M346.685,75.811L346.685,75.811l-61.84-61.76c-14.332-16.812-39.579-18.822-56.39-4.49 c-1.613,1.375-3.115,2.877-4.49,4.49l-92.56,92.56c-6.504,6.678-6.504,17.322,0,24l98.4,98.4c6.678,6.504,17.322,6.504,24,0	l92.88-92.32C365.725,117.651,365.725,94.931,346.685,75.811z M312.172,115.364c-0.042,0.043-0.084,0.085-0.127,0.127l0.08,0.32	c-3.12,3.102-8.16,3.102-11.28,0l-55.6-55.6c-3.356-2.874-3.747-7.924-0.873-11.28s7.924-3.747,11.28-0.873	c0.313,0.268,0.605,0.56,0.873,0.873l55.52,55.12C315.204,107.14,315.261,112.205,312.172,115.364z'
      ],
      viewBox: '0 0 368 368',
      destination: '/rentals'
    },

    {
      label: 'Add car',
      icon: [
        'm467 211h-166v-166c0-24.853-20.147-45-45-45s-45 20.147-45 45v166h-166c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45v-166h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z'
      ],
      viewBox: '0 0 512 512',
      destination: '/add-car'
    },
    {
      label: 'Return car',
      icon: [
        'M248.625,89.25V0l-127.5,127.5l127.5,127.5V140.25c84.15,0,153,68.85,153,153c0,84.15-68.85,153-153,153	c-84.15,0-153-68.85-153-153h-51c0,112.2,91.8,204,204,204s204-91.8,204-204S360.825,89.25,248.625,89.25z'
      ],
      viewBox: '0 0 497.25 497.25',
      destination: '/return-car'
    }
  ];

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  let menu = [];
  user && user.isAdmin ? (menu = adminMenu) : (menu = userMenu);
  return (
    <div className={styles.sideBarWrapper}>
      <div className={styles.sideBar}>
        {menu.map((element, index) => (
          <Link
            key={index}
            to={
              user
                ? element.destination === '/return-car'
                  ? `/return-car/${user.id}`
                  : element.destination
                : element.destination
            }
            title={element.label}>
            <div className={styles.navElement} onClick={() => setColorOnSideBarIcon(index + 1)}>
              <div className={styles.menuIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={index + 1 === sideBarIndex ? styles.blue : undefined}
                  viewBox={element.viewBox}>
                  <path fillRule="evenodd" clipRule="evenodd" />
                  {element.icon.map((element, index) => (
                    <g key={index}>
                      <path d={element} />
                    </g>
                  ))}
                </svg>
              </div>
              <div className={styles.menuText}>
                <p>{element.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

SideBar.propTypes = {
  setColorOnSideBarIcon: PropTypes.func,
  sideBarIndex: PropTypes.number
};

export default SideBar;
