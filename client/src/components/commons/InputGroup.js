import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
	name,
	type,
	placeholder,
	value,

	error,
	icon,
	onChange,
}) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input
				className={classnames("form-control form-control-lg", {
					"is-invalid": error,
				})}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>

			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,

	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	icon: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};
InputGroup.defaultProps = {
	type: "text",
};

export default InputGroup;
