import { useState } from 'react';

import OtpInput from "../components/OtpInput/OtpInput";

const CORRECT_OTP = "1789";

export default function OtpValidator() {

  const [otpSubmitted, setOtpSubmitted] = useState();

  const otpSubmittedHandler = otp => {
    setOtpSubmitted(otp);
  }

  const textOTP = otpSubmitted?.join("");
  console.log(textOTP, CORRECT_OTP);
  return (
		<div className="OtpValidator" style={{ textAlign: "center" }}>
			<h2 style={{ margin: "1rem 0rem" }}>
				<u>Otp Validator</u>
			</h2>

			<p style={{ color: "green" }}>
				<b>Correct Otp: {CORRECT_OTP}</b>
			</p>

			<OtpInput length={4} onComplete={otpSubmittedHandler} />
			{textOTP && (
				<div style={{ margin: "1rem 0rem" }}>
					<h4 style={{ color: "#555" }}>Otp Submitted: {textOTP}</h4>
					{CORRECT_OTP === textOTP && (
						<p style={{ color: "green" }}>
							<b>Matched</b>
						</p>
					)}
					{CORRECT_OTP !== textOTP && (
						<p style={{ color: "red" }}>
							<b>Mismatched</b>
						</p>
					)}
				</div>
			)}
		</div>
	);
}
