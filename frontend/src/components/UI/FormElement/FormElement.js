import React from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from "@material-ui/core";

const FormElement = ({label, name, value, onChange, required, error, autoComplete, type}) => {
    return (
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                type={type}
                required={required}
                autoComplete={autoComplete}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={Boolean(error)}
                helperText={error}
            />
        </Grid>
    );
};

FormElement.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    error: PropTypes.string,
    autoComplete: PropTypes.string,
    type: PropTypes.string
};

export default FormElement;