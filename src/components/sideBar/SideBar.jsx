import React from 'react';
import styles from './SideBar.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { useContext } from 'react';
import { userMenu, supervisorMenu, adminMenu } from '../assets/SvgList';

const SideBar = ({ setColorOnSideBarIcon, sideBarIndex }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  let menu = userMenu;
  const setMenu = () => {
    if (user.role === 'ADMIN') {
      menu = adminMenu;
    } else if (user.role === 'SUPERVISOR') {
      menu = supervisorMenu;
    } else if (user.role === 'USER') {
      menu = userMenu;
    }
  };
  user && setMenu();
  return (
    <>
      {menu && (
        <div className={styles.sideBarWrapper}>
          <div className={styles.sideBar}>
            {menu.map((element, index) => (
              <Link
                key={index}
                to={
                  (!user && element.destination === '/settings') ||
                  (!user && element.destination === '/my-bookings') ||
                  (!user && element.destination === '/my-rents') ||
                  (!user && element.destination === '/my-cars')
                    ? '/login'
                    : element.destination === '/settings'
                    ? `/users/${user.id}`
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
      )}
    </>
  );
};

SideBar.propTypes = {
  setColorOnSideBarIcon: PropTypes.func,
  sideBarIndex: PropTypes.number
};

export default SideBar;
