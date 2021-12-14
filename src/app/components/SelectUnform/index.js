import React from 'react';
import { Select } from '@rocketseat/unform';
import './styles.css';

export default function SelectUnform({ contentLabel, nameInput, ...rest }) {
  return (
    <div className="label-float">
      <Select name={nameInput} type="text" placeholder=" " {...rest}/>
      <label>{contentLabel}</label>
    </div>
  )
}