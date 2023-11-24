import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';

const ResetPassword = ({ reset_password }) => {
    const [formData, setFormData] = useState({
        email: ''
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Your login logic here
            const response = await reset_password(email);
            if ([200, 201, 204].includes(response.status)) {
                    setSuccessMessage('Please check your email for the password reset URL.')
            }
            else{
                if (response && response.data) {
                    setError(response.data[0]);
                } else {
                    setError('An unexpected error occurred during login.');
                }
            }
        }
        catch (err) {
            // Handle other errors (e.g., network issues)
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='container mt-5'>
            <h1>Request Password Reset:</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);
