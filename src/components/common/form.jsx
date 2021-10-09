import React from 'react';
import Joi from 'joi-browser';

import Input from './Input';
import Select from './Select';

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let e of error.details) errors[e.path[0]] = e.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const { error } = Joi.validate({ [name]: value }, { [name]: this.schema[name] });
    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];

    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call server and submit
    this.doSubmit();
  };

  renderInput(name, label, type = 'text', disabled = false) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        disabled={disabled}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, label, options, disabled = false) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        disabled={disabled}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderButton(label, disabled = false) {
    return (
      <button disabled={disabled || this.validate()} type="submit" className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
