import React from 'react';
import { PasswordSizeProp } from '../../../props/PasswordSizeProp';

const PasswordSizeRange: React.FC<PasswordSizeProp> = ({ min, max, current, setCurrentSize: setCurrentValue }) => {

    return (
        <input
            type="range"
            className="form-range"
            min={min}
            max={max}
            id="customRange"
            value={current}
            onChange={setCurrentValue}
        />
    );
};

export default PasswordSizeRange;
