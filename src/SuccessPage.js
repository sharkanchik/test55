import React from 'react';
import { useLocation } from 'react-router-dom';
import './susStyle.css';
const SuccessPage = () => {
    const location = useLocation();
    const formData = location.state?.formData || {};

    const {
        surname = '[Not Entered]',
        firstName = '[Not Entered]',
        fullMiddleName = '',
        socialInsuranceNumber = '[Not Entered]',
        presentAddress = '[Not Entered]',
        city = '[Not Entered]',
        province = '',
        postalCode = '',
        howLong = '',
        // Previous
        previousAddress = '',
        pcity = '',
        pprovince = '',
        ppostalCode = '',
        phowLong = '',
        phoneNumber = '[Not Entered]',
        isOverLegally = 'N/A',
        isOverBondable = 'N/A',
        isOver18 = 'N/A',
        isUnder18 = 'N/A',
        isUnder65 = 'N/A',
       typeWork = '[Not Entered]',
        Division = '[Not Entered]',
        Competition = '[Not Entered]',
        wage = '[Not Entered]',
        goal = '[Not Entered]',
        isOverEmployed = 'N/A',
        Where2 = '',
        Company = '',
        isOverRelatives = 'N/A',
        where1 = '',
        Aspen = '[Not Entered]',
        isOverRelcate = 'N/A',
        isOverTravel = 'N/A',
        isOverShift = 'N/A',
        isOverSaturday = 'N/A',
        isOverSunday = 'N/A',
        isOver10h = 'N/A',
        isOver12h = 'N/A',
        whenField = '[Not Entered]',
        hasdriversLicense = 'N/A',
        province2 = '',
        DL = '',
        Class = '',
        psychological = '[Not Entered]',
        emergencyContact = '[Not Entered]',
        Adress1 = '',
        City1 = '',
        Province1 = '',
        socialInsuranceNumber1 = '', 
        workType = [],
        // OSVI
        highSchool = {},
        technicalSchool = {},
        college = {},
        additionalSkills = '[Not Entered]',
        highSchoolGrades = [],
    } = formData;

    const fullName = `${firstName} ${fullMiddleName} ${surname}`.trim();
    const currentFullLocation = `${presentAddress}${city ? ', ' + city : ''}${province ? ', ' + province : ''}${postalCode ? ', ' + postalCode : ''}`.trim().replace(/,\s*,/g, ', ').replace(/,\s*$/g, '');
    const previousFullLocation = `${previousAddress}${pcity ? ', ' + pcity : ''}${pprovince ? ', ' + pprovince : ''}${ppostalCode ? ', ' + ppostalCode : ''}`.trim().replace(/,\s*,/g, ', ').replace(/,\s*$/g, '');

    const renderEducationDetails = (levelData, label) => {
        const details = [];
        if (levelData.name) details.push(`School: ${levelData.name}`);
        if (levelData.yearCompleted) details.push(`Completed: ${levelData.yearCompleted}`);
        if (levelData.yearsFrom || levelData.yearsTo) details.push(`Attended: ${levelData.yearsFrom || '-'} to ${levelData.yearsTo || '-'}`);
        if (levelData.degree) details.push(`Degree/Cert: ${levelData.degree}`);

        if (details.length > 0) {
            return (
                <li key={label}>
                    <strong>{label}:</strong>
                    <ul>
                        {details.map((detail, index) => <li key={index}>{detail}</li>)}
                    </ul>
                </li>
            );
        }
        return null;
    };


    return (
        <main>
            <div className="container">
                <div className="header">
                    <div className="left">
                        <div className="wrapper-img">
                            <img src="https://th.bing.com/th/id/OIP.NZKX_lBB5s_NHz1iXny8rQHaE8?w=262&h=180&c=7&r=0&o=7&pid=1.7&rm=3" className="profile-img" alt="Profile" />
                        </div>
                        <div className="name">
                            <h2 id="cv-full-name">{fullName}</h2>
                            <span>
                                antiSocial Insurance Number: {socialInsuranceNumber}
                            </span>
                        </div>
                    </div>
                    <div className="right">
                        <span>
                            Phone: {phoneNumber}
                        </span>
                        <p id="cv-location">
                            Current Address: {currentFullLocation} ({howLong ? `for ${howLong}` : 'N/A'})
                        </p>
                        {previousAddress && (
                            <p>
                                Previous Address: {previousFullLocation} ({phowLong ? `for ${phowLong}` : 'N/A'})
                            </p>
                        )}
                    </div>
                </div>

                <hr className="hr" />

                <div className="infoo">
                    <section className="two-side-wr">
                        <div className="left-side">
                            <h2>Job Interest & Availability</h2>
                        </div>
                        <div className="right-side">
                            <p><strong>Applying For:</strong> {typeWork} (Div: {Division} / Comp: {Competition})</p>
                            <p><strong>Desired Wage/Salary:</strong> {wage}</p>
                            <p><strong>Future Goal:</strong> {goal}</p>
                            <p><strong>Work Type Accepted:</strong> {workType.length > 0 ? workType.join(', ') : 'None selected'}</p>
                            <p><strong>Start Date:</strong> {whenField}</p>
                            <br />
                            <p><strong>Relocate:</strong> {isOverRelcate} | <strong>Travel:</strong> {isOverTravel} | <strong>Shift Work:</strong> {isOverShift}</p>
                            <p><strong>Saturday:</strong> {isOverSaturday} | <strong>Sunday:</strong> {isOverSunday} | <strong>10h Shifts:</strong> {isOver10h} | <strong>12h Shifts:</strong> {isOver12h}</p>
                        </div>
                    </section>
                    <hr className="hr" />
                    <section className="two-side-wr">
                        <div className="left-side">
                            <h2>Authorization & Background</h2>
                        </div>
                        <div className="right-side">
                            <p><strong>Legally Entitled to Work in Canada?</strong> {isOverLegally}</p>
                            <p><strong>Bondable?</strong> {isOverBondable}</p>
                            <p><strong>Age:</strong> Over 18: {isOver18}, 16 years: {isUnder18}, Under 65: {isUnder65}</p>
                            <p><strong>Applied to AP/Industry Before?</strong> {isOverEmployed} (Where: {Where2}, Company: {Company})</p>
                            <p><strong>Relatives at AP?</strong> {isOverRelatives} (Where: {where1})</p>
                            <p><strong>Why Aspen:</strong> {Aspen}</p>
                            <p><strong>Driver's License:</strong> {hasdriversLicense} (Prov: {province2}, DL#: {DL}, Class: {Class})</p>
                            <p><strong>Handicaps:</strong> {psychological}</p>
                        </div>
                    </section>
                    <hr className="hr" />

                    <section className="two-side-wr">
                        <div className="left-side">
                            <h2>Emergency Contact</h2>
                        </div>
                        <div className="right-side">
                            <p><strong>Contact Name:</strong> {emergencyContact}</p>
                            <p><strong>Phone:</strong> {socialInsuranceNumber1 || '[Not Entered]'}</p>
                            <p><strong>Address:</strong> {`${Adress1}${City1 ? ', ' + City1 : ''}${Province1 ? ', ' + Province1 : ''}` || '[Not Entered]'}</p>
                        </div>
                    </section>
                    <hr className="hr" />

                    <section className="two-side-wr">
                        <div className="left-side">
                            <h2>Education</h2>
                        </div>
                        <div className="right-side" id="cv-education">
                            <ul>
                                {renderEducationDetails(highSchool, 'High School')}
                                {renderEducationDetails(technicalSchool, 'Technical/Vocational School')}
                                {renderEducationDetails(college, 'College or University')}
                                {highSchoolGrades.length > 0 && (
                                    <li>
                                        <strong>High School Grades Included:</strong> {highSchoolGrades.join(', ')}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </section>
                    <hr className="hr" />

                    <section className="two-side-wr">
                        <div className="left-side">
                            <h2>Additional Skills</h2>
                        </div>
                        <div className="right-side" id="cv-additional-skills">
                            {additionalSkills}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default SuccessPage;
