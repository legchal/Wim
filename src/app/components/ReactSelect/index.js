import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import { Popover, Icon} from 'antd';
import './styles.css';

import { useField } from '@rocketseat/unform';

export default function ReactSelect({
  name,
  label,
  className,
  options,
  multiple,
  ...rest
}) {
  const [visiblePopOver, setVisiblePopOver] = useState(false);
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef !== null ? selectRef.id : '';
    return selectValue;
  }

  useEffect(() => {
    if(error) {
     setVisiblePopOver(true);
    }
  }, [error])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <div className="label-float">
      <Popover
        placement="bottom"
        content={
        <div>
          <label>
            <Icon type="warning" style={{ color: '#ffd700', fontSize: '25px'}}/>
          &nbsp;&nbsp; Necessário selecionar um e-mail!
          </label>
        </div>}
        trigger="click"
        visible={visiblePopOver}
      >
      <Select
        name={fieldName}
        aria-label={fieldName}
        placeholder={''}
        options={options}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.email}
        className="react-select"
        onFocus={() => setVisiblePopOver(false)}
        {...rest}
      />
    </Popover>
      {label && <label htmlFor={fieldName}>{label}</label>}
    </div>
  );
}