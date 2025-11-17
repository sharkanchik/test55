import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Обов'язковий імпорт стилів

const PhoneNumberInput = ({ name, value, onChange, error }) => {
    
    const handlePhoneChange = (newValue, country, e) => {
        onChange({ target: { name, value: newValue } });
    };

    return (
        <div className="phone-input-container">
            <PhoneInput
                country={'pl'} 
                value={value}
                onChange={handlePhoneChange}
                inputProps={{
                    name: name,
                    required: true,
                    className: error ? 'input-error' : '' 
                }}
                containerClass={error ? 'phone-error-container' : ''}
            />
             {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PhoneNumberInput;