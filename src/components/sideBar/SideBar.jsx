import React from 'react';
import styles from './SideBar.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { useContext } from 'react';

const SideBar = ({ setColorOnSideBarIcon, sideBarIndex }) => {
  const userMenuArray = [
    {
      label: 'Dashboard',
      icon: 'm498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0',
      viewBox: '0 0 512 512',
      destination: '/'
    },
    {
      label: 'Settings',
      icon: 'm22.683 9.394-1.88-.239c-.155-.477-.346-.937-.569-1.374l1.161-1.495c.47-.605.415-1.459-.122-1.979l-1.575-1.575c-.525-.542-1.379-.596-1.985-.127l-1.493 1.161c-.437-.223-.897-.414-1.375-.569l-.239-1.877c-.09-.753-.729-1.32-1.486-1.32h-2.24c-.757 0-1.396.567-1.486 1.317l-.239 1.88c-.478.155-.938.345-1.375.569l-1.494-1.161c-.604-.469-1.458-.415-1.979.122l-1.575 1.574c-.542.526-.597 1.38-.127 1.986l1.161 1.494c-.224.437-.414.897-.569 1.374l-1.877.239c-.753.09-1.32.729-1.32 1.486v2.24c0 .757.567 1.396 1.317 1.486l1.88.239c.155.477.346.937.569 1.374l-1.161 1.495c-.47.605-.415 1.459.122 1.979l1.575 1.575c.526.541 1.379.595 1.985.126l1.494-1.161c.437.224.897.415 1.374.569l.239 1.876c.09.755.729 1.322 1.486 1.322h2.24c.757 0 1.396-.567 1.486-1.317l.239-1.88c.477-.155.937-.346 1.374-.569l1.495 1.161c.605.47 1.459.415 1.979-.122l1.575-1.575c.542-.526.597-1.379.127-1.985l-1.161-1.494c.224-.437.415-.897.569-1.374l1.876-.239c.753-.09 1.32-.729 1.32-1.486v-2.24c.001-.757-.566-1.396-1.316-1.486zm-10.683 7.606c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z',
      viewBox: '0 0 24 24',
      destination: '/settings'
    },
    {
      label: 'Popular',
      icon: 'M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z',
      viewBox: '0 0 18 18',
      destination: '/popular'
    },
    {
      label: 'Return car',
      icon: 'M248.625,89.25V0l-127.5,127.5l127.5,127.5V140.25c84.15,0,153,68.85,153,153c0,84.15-68.85,153-153,153	c-84.15,0-153-68.85-153-153h-51c0,112.2,91.8,204,204,204s204-91.8,204-204S360.825,89.25,248.625,89.25z',
      viewBox: '0 0 497.25 497.25',
      destination: '/return-car'
    }
  ];

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <div className={styles.sideBarWrapper}>
      <div className={styles.sideBar}>
        {userMenuArray.map((element, index) => (
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
                  <path fillRule="evenodd" clipRule="evenodd" d={element.icon} />
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
