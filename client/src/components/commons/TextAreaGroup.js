import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextAreaGroup = ({
	name,

	placeholder,
	value,

	error,
	info,
	onChange,
}) => {
	return (
		<div className="form-group">
			<textarea
				className={classnames("form-control form-control-lg", {
					"is-invalid": error,
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextAreaGroup.propTypes = {
	name: PropTypes.string.isRequired,

	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default TextAreaGroup;
