import React from 'react';
import { Input } from '@rocketseat/unform';
import './styles.css';

export default function InputUnform({ contentLabel, nameInput, popOn, type, disabled, ...rest }) {
  return (
    <div className="label-float">
      <Input name={nameInput} type={type} placeholder="teste" disabled={disabled} />
      <label>{contentLabel}</label>
    </div>
  );
}
