import React from 'react';
import { PasswordSizeProp } from '../../../props/PasswordSizeProp';

const PasswordSizeInput: React.FC<PasswordSizeProp> = ({ min, max, current, setCurrentSize: setCurrentValue }) => {

    return (
        <input
            type="number"
            className="form-control"
            min={min}
            max={max}
            id="exampleInputText"
            value={current}
            onChange={setCurrentValue}
        />
    );
};

export default PasswordSizeInput;
