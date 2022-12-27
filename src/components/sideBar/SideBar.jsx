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
        'M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939z',
        'M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z'
      ],
      viewBox: '0 0 460.298 460.297',
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
        'M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939z',
        'M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z'
      ],
      viewBox: '0 0 460.298 460.297',
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
      label: 'Bookings',
      icon: [
        'm30 10v-3a3 3 0 0 0 -3-3h-4v-1a1 1 0 0 0 -2 0v1h-10v-1a1 1 0 0 0 -2 0v1h-4a3 3 0 0 0 -3 3v3z',
        'm2 12v15a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-15zm19.65 5.759-7 6a1 1 0 0 1 -1.357-.053l-3-3a1 1 0 0 1 1.414-1.414l2.346 2.346 6.3-5.4a1 1 0 1 1 1.3 1.519z'
      ],
      viewBox: '0 0 32 32',
      destination: '/bookings'
    },
    {
      label: 'Rents',
      icon: [
        'M195.805,213.251l-48.24-48.4c-3.12-3.102-8.16-3.102-11.28,0l-28.72,28.72c-3.102,3.12-3.102,8.16,0,11.28l4.88,4.88 l-102.24,102.32c-1.459,1.47-2.29,3.449-2.32,5.52l-0.8,42.48c0,4.418,3.582,8,8,8h33.6c2.126,0.012,4.17-0.823,5.68-2.32	l18.88-18.88c1.44-1.45,2.27-3.397,2.32-5.44l0.48-17.12l13.68,1.68c2.453,0.293,4.904-0.563,6.64-2.32l11.92-11.6 c1.316-1.308,2.136-3.034,2.32-4.88l1.52-16l19.52-4.32c3.158-0.693,5.589-3.218,6.16-6.4l3.92-21.68l20.96-3.28	c1.666-0.264,3.206-1.048,4.4-2.24l28.72-28.72C198.907,221.41,198.907,216.371,195.805,213.251z',
        'M346.685,75.811L346.685,75.811l-61.84-61.76c-14.332-16.812-39.579-18.822-56.39-4.49 c-1.613,1.375-3.115,2.877-4.49,4.49l-92.56,92.56c-6.504,6.678-6.504,17.322,0,24l98.4,98.4c6.678,6.504,17.322,6.504,24,0	l92.88-92.32C365.725,117.651,365.725,94.931,346.685,75.811z M312.172,115.364c-0.042,0.043-0.084,0.085-0.127,0.127l0.08,0.32	c-3.12,3.102-8.16,3.102-11.28,0l-55.6-55.6c-3.356-2.874-3.747-7.924-0.873-11.28s7.924-3.747,11.28-0.873	c0.313,0.268,0.605,0.56,0.873,0.873l55.52,55.12C315.204,107.14,315.261,112.205,312.172,115.364z'
      ],
      viewBox: '0 0 368 368',
      destination: '/rents'
    },
    {
      label: 'Cars',
      icon: [
        'M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z',
        'M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z',
        'M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12,0,0,1,12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z'
      ],
      viewBox: '0 0 512 512',
      destination: '/all-cars'
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
                  : element.destination === '/settings'
                  ? `/users/${user.id}`
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
