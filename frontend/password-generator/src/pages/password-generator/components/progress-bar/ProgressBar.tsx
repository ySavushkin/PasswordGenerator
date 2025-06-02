import React from "react";

const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => {
    const getColor = (value: number) => {
        if (value <= 33) return "red";
        else if (value <= 66) return "orange";
        else return "green";
    };

    const barStyle = {
        width: `${percent}%`,
        backgroundColor: getColor(percent),
    };

    return (
        <div className="progress rounded-0 password-progress">
        <div
            id="passwordStrengthBar"
            className="progress-bar mb-0 mt-0"
            role="progressbar"
            style={barStyle}
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
        ></div>
        </div>
    );
};

export default ProgressBar;
