import React from "react";

const RangeSlider: React.FC = () => {


    return (
        <>
            <label htmlFor="customRange2" className="form-label">Example range</label>
            <input type="range" className="form-range" min="0" max="5" id="customRange2"/>
        </>
    );
};

export default RangeSlider;
