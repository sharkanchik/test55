import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';
import AgeCheck from './AgeCheck';
import PhoneNumberInput from './PhoneNumberInput';

const REQUIRED_FIELDS = [
    'surname',
    'firstName',
    'presentAddress',
    'isOverLegally',
    'isOverBondable',
    'isUnder18',
    'isUnder65',

];

const ApplicationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        surname: '',
        firstName: '',
        fullMiddleName: '',
        socialInsuranceNumber: '',
        presentAddress: '',
        city: '',
        province: '',
        postalCode: '',
        howLong: '',
        //previous address block
        previousAddress: '',
        pcity: '',
        pprovince: '',
        ppostalCode: '',
        phowLong: '',
        //
        phoneNumber: '',
        isOverLegally: '', 
        isOverBondable: '', 
        isOver18: '', 
        isUnder18: '',
        isUnder65: '', 
        typeWork: '',
        Division: '',
        Competition: '',
        wage: '',
        goal: '',
        isOverEmployed: '', 
        Where2: '',
        Company: '',
        isOverRelatives: '', 
        where1: '',
        Aspen: '',
        isOverRelcate: '',
        isOverTravel: '',
        isOverShift: '',
        isOverSaturday: '',
        isOverSunday: '',
        isOver10h: '', 
        isOver12h: '', 
        whenField: '', 
        hasdriversLicense: '',
        province2: '',
        DL: '',
        Class: '', 
        psychological: '', 
        emergencyContact: '',
        Adress1: '',
        City1: '', 
        Province1: '', 
        socialInsuranceNumber1: '',
        workType: [], 
        //check osvita
        highSchool: {
            name: '', yearCompleted: '', yearsFrom: '', yearsTo: '', degree: ''
        },
        technicalSchool: {
            name: '', yearCompleted: '', yearsFrom: '', yearsTo: '', degree: ''
        },
        college: {
            name: '', yearCompleted: '', yearsFrom: '', yearsTo: '', degree: ''
        },
        university: {
            name: '', yearCompleted: '', yearsFrom: '', yearsTo: '', degree: ''
        },
        additionalSkills: '',
        highSchoolGrades: [], 
    });


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    const handleEducationChange = (level, field) => (e) => {
        setFormData(prevData => ({
            ...prevData,
            [level]: {
                ...prevData[level],
                [field]: e.target.value,
            }
        }));
    };

    const handleGradeChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevData => {
            let newGrades = [...prevData.highSchoolGrades];
            if (checked) {
                newGrades.push(value);
            } else {
                newGrades = newGrades.filter(grade => grade !== value);
            }
            return {
                ...prevData,
                highSchoolGrades: newGrades,
            };
        });
    };
    
    // ДОДАНО: Обробник для чекбоксів типу роботи
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setFormData(prevData => {
            let newWorkType = [...prevData.workType];

            if (checked) {
                newWorkType.push(value);
            } else {
                newWorkType = newWorkType.filter(type => type !== value);
            }

            return {
                ...prevData,
                workType: newWorkType,
            };
        });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        REQUIRED_FIELDS.forEach(field => {
                        if (typeof formData[field] === 'string' && (!formData[field] || formData[field].trim() === '')) {
                newErrors[field] = 'This field is required.';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form data is valid. Navigating:', formData);

            navigate('./success', {
                state: { formData: formData }
            });

        } else {
            console.log('Validation failed. Please fill in required fields.');
            const firstErrorField = Object.keys(errors).find(key => errors[key]);
            if (firstErrorField) {
                 document.getElementById(firstErrorField)?.focus();
            }
        }
    };

    const renderField = (name, label) => (
        <div className="input-line">
            <label htmlFor={name} className="label">{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className={errors[name] ? 'input-error' : ''}
            />
            {errors[name] && <p className="error-message">{errors[name]}</p>}
        </div>
    );
    
    const renderEducationRow = (level, label) => (
        <tr key={level}>
            <td className="education-level-cell">
                {label}
                {level === 'highSchool' && (
                    <div className="grade-checkboxes">
                        {[9, 10, 11, 12].map(grade => (
                            <label key={grade}>
                                <input
                                    type="checkbox"
                                    value={grade.toString()}
                                    checked={formData.highSchoolGrades.includes(grade.toString())}
                                    onChange={handleGradeChange}
                                />
                                {grade}
                            </label>
                        ))}
                    </div>
                )}
            </td>
            <td>
                <input type="text" onChange={handleEducationChange(level, 'name')} value={formData[level].name} className="education-input" />
            </td>
            <td>
                <input type="text" onChange={handleEducationChange(level, 'yearCompleted')} value={formData[level].yearCompleted} className="education-input" />
            </td>
            <td>
                <input type="text" onChange={handleEducationChange(level, 'yearsFrom')} value={formData[level].yearsFrom} className="education-input" />
            </td>
            <td>
                <input type="text" onChange={handleEducationChange(level, 'yearsTo')} value={formData[level].yearsTo} className="education-input" />
            </td>
            <td>
                <input type="text" onChange={handleEducationChange(level, 'degree')} value={formData[level].degree} className="education-input" />
            </td>
        </tr>
    );


    return (
        <form onSubmit={handleSubmit} className="application-form">
            <h2 style={{ textAlign: 'center' }}>Please attach your resume to this application form and complete this application in your own handwriting.</h2>

            <div className="form-row first-row field-group">
                {renderField('surname', 'Surname *')}
                {renderField('firstName', 'First Name *')}
                {renderField('fullMiddleName', 'Full Middle Name')}
                {renderField('socialInsuranceNumber', 'Social Insurance Number')}
            </div>

            <div className="form-row second-row five-columns">
                {renderField('presentAddress', 'Present Address *')}
                {renderField('city', 'City')}
                {renderField('province', 'Province')}
                {renderField('postalCode', 'Postal Code')}
                {renderField('howLong', 'How Long?')}
            </div>

            <div className="form-row third-row five-columns">
                {renderField('previousAddress', 'Previous Address')}
                {renderField('pcity', 'City')}
                {renderField('pprovince', 'Province')}
                {renderField('ppostalCode', 'Postal Code')}
                {renderField('phowLong', 'How Long?')}
            </div>

            <div className="form-row age-check-row two-columns-desktop">

                <div className="form-cell age-input-group">

                    <label htmlFor="phoneNumber">Phone Number </label>

                    <PhoneNumberInput
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber}
                    />
                    <AgeCheck
                        name="isOverLegally"
                        label="Are legally entitled to work in Canada?"
                        value={formData.isOverLegally}
                        onChange={handleChange}
                        error={errors.isOverLegally}
                    />
                    <AgeCheck
                        name="isOverBondable"
                        label="Are you bondable?"
                        value={formData.isOverBondable}
                        onChange={handleChange}
                        error={errors.isOverBondable}
                    />
                </div>

                <div className="form-cell age-check-container">
                    <p className="check-title">At some operations there is an age requirement
                        Do you meet this requirement?</p>

                    <AgeCheck
                        name="isOver18"
                        label="18 years"
                        value={formData.isOver18}
                        onChange={handleChange}
                        error={errors.isOver18}
                    />


                    <AgeCheck
                        name="isUnder18"
                        label="16 years"
                        value={formData.isUnder18}
                        onChange={handleChange}
                        error={errors.isUnder18}
                    />
                    <AgeCheck
                        name="isUnder65"
                        label="Are you less than 65? "
                        value={formData.isUnder65}
                        onChange={handleChange}
                        error={errors.isUnder65}
                    />

                </div>


            </div>
            <div className="section-header">
                JOB INTEREST
            </div>
            <div className=" grid-container1">
                {renderField('typeWork', 'What type of work are you applying for?')}
                {renderField('Division', 'Division')}
                {renderField('Competition', 'Competition/Reference number')}

            </div>

            <div className="grid-container2">
                {renderField('wage', 'Wage/Salary Desired')}
                {renderField('goal', 'Future job goal with this company')}

            </div>

            <div className="field-group in" >
                <AgeCheck
                    name="isOverEmployed"
                    label="
		Have you applied for or requested employment with Aspen Planers Ltd. or within this industry before?
		"
                    value={formData.isOverEmployed}
                    onChange={handleChange}
                    error={errors.isOverEmployed}

                />

                {renderField('Where2', 'Where?')}
                {renderField('Company', 'other company?')}


            </div>
            <div className="field-group in " >


                <AgeCheck
                    className="radio-options "
                    name="isOverRelatives"
                    label=" 		Do you have any relatives working for Aspen Planers Ltd. or any of the AP Group of Companies?"
                    value={formData.isOverRelatives}
                    onChange={handleChange}
                    error={errors.isOverRelatives}

                />
                <div className="lab">
                    {renderField('where1', 'where?')}
                </div>
            </div>
            <div className="input-line">
                {renderField('Aspen', 'Why have you applied to Aspen Planers Ltd.')}

            </div>

            <div className=" grid-container1">
                <AgeCheck
                    className="radio-options"
                    name="isOverRelcate"
                    label=" 		Are you willing to relocate?"
                    value={formData.isOverRelcate}
                    onChange={handleChange}
                    error={errors.isOverRelcate}

                />
                <AgeCheck
                    className="radio-options"
                    name="isOverTravel"
                    label=" 		Are you willing to travel?"
                    value={formData.isOverTravel}
                    onChange={handleChange}
                    error={errors.isOverTravel}

                />
                <AgeCheck
                    className="radio-options"
                    name="isOverShift"
                    label=" 		 Will accept shift work?"
                    value={formData.isOverShift}
                    onChange={handleChange}
                    error={errors.isOverShift}

                />
            </div>
            <div className=" grid-container1">
                <AgeCheck
                    className="radio-options"
                    name="isOverSaturday"
                    label=" 		Will work on Saturdays?"
                    value={formData.isOverSaturday}
                    onChange={handleChange}
                    error={errors.isOverSaturday}

                />
                <AgeCheck
                    className="radio-options"
                    name="isOverSunday"
                    label=" 		Work on Sunday?"
                    value={formData.isOverSunday}
                    onChange={handleChange}
                    error={errors.isOverSunday}

                />
                <AgeCheck
                    className="radio-options"
                    name="isOver10h"
                    label=" 		Will you work 10 hour shifts?"
                    value={formData.isOver10h}
                    onChange={handleChange}
                    error={errors.isOver10h}

                />
            </div>
            <div className=" grid-container">
                <AgeCheck
                    className="radio-options"
                    name="isOver12h"
                    label=" 		Will you work 12 hour shifts?"
                    value={formData.isOver12h}
                    onChange={handleChange}
                    error={errors.isOver12h}

                />
                <div className="form-row single-line-field">
                    <div className="underline-field-wrapper">
                        <label
                            htmlFor="whenField"
                            className="field-label"

                        >
                            When could you start? 		</label>
                        <input
                            type="text"
                            id="whenField"
                            name="whenField"
                            value={formData.whenField}
                            onChange={handleChange}
                            className={`underline-input ${errors.whenField ? 'input-error-underline' : ''}`}
                        />
                    </div>
                    {errors.whenField && <p className="error-message">{errors.whenField}</p>}
                </div>
                <AgeCheck
                    className="radio-options"
                    name="hasdriversLicense"
                    label=" 		Do you hold a valid driver's license?"
                    value={formData.hasdriversLicense}
                    onChange={handleChange}
                    error={errors.hasdriversLicense}

                />
            </div>
            <div className=" grid-container">
                {renderField('province2', 'Province of issue:')}
                {renderField('DL', 'DL#:')}
                {renderField('Class', 'Class:')}

            </div>
            <div className="input-line">
                {renderField('psychological', 'Describe any physical or mental handicaps that would interfere with your ability to do the essential components of the job you are applying for.')}

            </div>
            <div className="input-line">
                {renderField('emergencyContact', 'In case of emergency, whom should we contact? (Please advise human resources dept. of any changes)')}

            </div>
            <div className="form-row first-row field-group">
                {renderField('Adress1', 'Address')}
                {renderField('City1', 'City')}
                {renderField('Province1', 'Province')}
                {renderField('socialInsuranceNumber1', 'Phone Number')}
            </div>
            <div className="form-row work-type-row">
                <div className="work-type-wrapper">
                    <span className="work-type-question">What type of work will you accept?</span>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="workType"
                            value="Permanent"
                            checked={formData.workType.includes('Permanent')}
                            onChange={handleCheckboxChange}
                        />
                        Permanent
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="workType"
                            value="Temporary"
                            checked={formData.workType.includes('Temporary')}
                            onChange={handleCheckboxChange}
                        />
                        Temporary
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="workType"
                            value="Part-time"
                            checked={formData.workType.includes('Part-time')}
                            onChange={handleCheckboxChange}
                        />
                        Part-time
                    </label>
                </div>
            </div>

            <div className="education-section">
                <h3 className="section-header">EDUCATION/SKILLS</h3>

                <div className="education-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="education-level-cell"></th>
                                <th>School Name and Address</th>
                                <th>Year Completed</th>
                                <th>Years Attended From</th>
                                <th>To</th>
                                <th>Degree/Certificate Held</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderEducationRow('highSchool', 'High School Grade Completed')}
                            {renderEducationRow('technicalSchool', 'Technical/Vocational School')}
                            {renderEducationRow('college', 'College or University')}
                        </tbody>
                    </table>
                </div>



            </div>
            <div className="skills-area">
                <h3>Please wtight your ADDITIONAL SKILLS</h3>
                <textarea
                    name="additionalSkills"
                    value={formData.additionalSkills}
                    onChange={handleChange}
                />
                <p className="note-text">
                    **NOTE: you will be required to provide proof of all credentials before being hired.**
                </p>
            </div>

            <div className="form-actions">
                <button type="submit">Submit Application</button>
            </div>
        </form>


    );
};

export default ApplicationForm;