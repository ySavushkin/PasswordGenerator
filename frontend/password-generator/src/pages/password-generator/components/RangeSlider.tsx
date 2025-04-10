import React, { useState } from "react";
import { RangeSliderProp } from "../../../props/RangeSliderProp";

const RangeSlider: React.FC<RangeSliderProp> = ({ setCurrentValue }) => {
    const [value, setValue] = useState(16); 
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(Number(newValue));
        setCurrentValue(Number(newValue));
    };
  
    return (
        <input
            type="range"
            className="form-range"
            min="1"
            max="32"
            id="customRange"
            value={value}
            onChange={handleChange}
        />
    );
  };

export default RangeSlider;
