import React, { useState } from 'react';
import RangeSlider from './components/RangeSlider';
import './PasswordGenerator.css';

const PasswordGenerator: React.FC = () => {

    const [rangeValue, setRangeValue] = useState<number>(16);

    const handleDataFromRange = (data: number) => {
        setRangeValue(data);
    };

    return (
        <>
            <label htmlFor="customRange" className="form-label text-white">
                Password Length <strong></strong>
            </label>

            <RangeSlider setCurrentValue={handleDataFromRange}/>

            <input type="number" className="form-control" id="exampleInputText" value={rangeValue}/>

            <div className="checkbox text-white">
                <label><input type="checkbox" value=""/>Uppercase</label>
            </div>
            <div className="checkbox text-white">
                <label><input type="checkbox" value=""/>Lowercase</label>
            </div>
            <div className="checkbox text-white disabled">
                <label><input type="checkbox" value="" disabled/>Numbers</label>
            </div>
            <div className="checkbox text-white disabled">
                <label><input type="checkbox" value="" disabled/>Symbols</label>
            </div>
        </>
    );
};

export default PasswordGenerator;
