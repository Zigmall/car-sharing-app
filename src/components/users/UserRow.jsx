import React from 'react';
import style from './Users.module.scss';
import PropTypes from 'prop-types';
import { GET_ALL_USERS } from '../../queries/queries';
import { DELETE_USER } from '../../mutations/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const UserRow = ({ user }) => {
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { deleteUserId: user.id },
    refetchQueries: [{ query: GET_ALL_USERS }]
  });

  const handleDelete = () => {
    const txt = 'Are you sure you want to delete this user?';
    confirm(txt) && deleteUser();
  };
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/user/${user.id}`);
  };

  return (
    <>
      <tr>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td>
        <td>
          <button
            onClick={handleEdit}
            className={[style.button__wrapper, style.button__edit].join(' ')}>
            Edit User
          </button>
        </td>
        <td>
          <button
            onClick={handleDelete}
            className={[style.button__wrapper, style.button__delete].join(' ')}>
            Delete User
          </button>
        </td>
      </tr>
    </>
  );
};

UserRow.propTypes = {
  user: PropTypes.object,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  mobile: PropTypes.string
};

export default UserRow;
