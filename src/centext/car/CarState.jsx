import React, { useReducer } from 'react';
import { uuid } from 'uuidv4';
import carContext from './carContext';
import carReducer from './carReducer';
import {
  ADD_CAR,
  DELETE_CAR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CURRENT,
  FILTER_CAR,
  CLEAR_FILTER
} from '../types';
