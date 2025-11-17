
import React from 'react';

const AgeCheck = ({ name, label, value, onChange, error }) => {
    return (
        <div className="age-check-group">
            <label className="check-label">{label}</label>
            <div className="radio-options">
                
                <label className={error ? 'radio-error' : ''}>
                    <input
                        type="radio"
                        name={name}
                        value="Yes"
                        checked={value === 'Yes'}
                        onChange={onChange}
                    />
                    Yes
                </label>
                
                <label className={error ? 'radio-error' : ''}>
                    <input
                        type="radio"
                        name={name}
                        value="No"
                        checked={value === 'No'}
                        onChange={onChange}
                    />
                    No
                </label>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AgeCheck;