import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
	name,
	type,
	placeholder,
	value,
	label,
	error,
	info,
	onChange,
	disabled,
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={classnames("form-control form-control-lg", {
					"is-invalid": error,
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
	type: "text",
};

export default TextFieldGroup;
