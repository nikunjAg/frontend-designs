import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import classes from "./style.module.css";

const OtpInput = (props) => {
	const { length, onComplete } = props;

    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);

    const nextFocusHandler = (curr_index, curr_otp) => {

        if (curr_index - 1 >= 0 && !curr_otp[curr_index - 1] && inputRefs.current[curr_index - 1]) {
            inputRefs.current[curr_otp.indexOf("")].focus();
            return;
        }

        if (curr_index + 1 < length && !curr_otp[curr_index + 1] && inputRefs.current[curr_index + 1]) {
            inputRefs.current[curr_index + 1].focus();
            return;
        }

        const nextEmptyIndex = curr_otp.indexOf("", curr_index + 1);
        if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
            inputRefs.current[nextEmptyIndex].focus();
        }

    }

    const inputChangeHandler = (event, index) => {
        const value = parseInt(event.target.value.at(-1));

        if (isNaN(value)) return;

        const updatedOtp = [...otp.slice(0, index), value, ...otp.slice(index + 1)];
        setOtp(updatedOtp);

        if (updatedOtp.join('').length === length) {
            onComplete(updatedOtp);
        } else {
            nextFocusHandler(index, updatedOtp);
        }

    }

    const keyDownHandler = (event, index) => {
        const { key } = event;

        if (key === 'Backspace') {

            if (otp[index]) {
                const updatedOtp = [...otp.slice(0, index), "", ...otp.slice(index + 1)];
                setOtp(updatedOtp);
            } else if (index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }

        }

    }

    const clickHandler = (index) => {
        const el = inputRefs.current[index];
        el.setSelectionRange(1, 1, "forward");
    }


	return <div className={classes.OtpWrapper}>
        {
            otp.map((val, index) => 
                <input
                    type="text"
                    key={index}
                    className={classes.OtpInput}
                    ref={(inputRef) => inputRefs.current[index] = inputRef}
                    value={val}
                    onChange={(e) => inputChangeHandler(e, index)}
                    onKeyDown={(e) => keyDownHandler(e, index)}
                    onClick={() => clickHandler(index)}
                />
            )
        }
    </div>;
};

export default OtpInput;

OtpInput.propTypes = {
	length: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
};
