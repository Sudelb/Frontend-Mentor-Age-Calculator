import React, {useEffect, useRef, useState} from 'react';
import MyIcon from './assets/icon-arrow.svg';

function AgeCalculator(){

    const [userDayInput, setUserDayInput] = useState("");
    const [userMonthInput, setUserMonthInput] = useState("");
    const [userYearInput, setUserYearInput] = useState("");

    const [ageDay, setAgeDay] = useState("--");
    const [ageMonth, setAgeMonth] = useState("--");
    const [ageYear, setAgeYear] = useState("--");

    const [dayErrorText, setDayErrorText] = useState("");
    const [monthErrorText, setMonthErrorText] = useState("");
    const [yearErrorText, setYearErrorText] = useState("");

    const [isDayError, setIsDayError] = useState(false);
    const [isMonthError, setIsMonthError] = useState(false);
    const [isYearError, setIsYearError] = useState(false);

    const [dayDisplay, setDayDisplay] = useState("days");
    const [monthDisplay, setMonthDisplay] = useState("months");
    const [yearDisplay, setYearDisplay] = useState("years");

    let errorCount = 0;

    const handleDayChange = (e) => {
        if(getFirstDigit(e.target.value) === '0'){
            const newValue = removeFirstDigit(e.target.value);
            setUserDayInput(newValue);
        }
        else{
            setUserDayInput(e.target.value);
        }
    };

    const handleMonthChange = (e) => {
        if(getFirstDigit(e.target.value) === '0'){
            const newValue = removeFirstDigit(e.target.value);
            setUserMonthInput(newValue);
        }
        else{
            setUserMonthInput(e.target.value);
        }
    };

    const handleYearChange = (e) => {
        if(getFirstDigit(e.target.value) === '0'){
            const newValue = removeFirstDigit(e.target.value);
            setUserYearInput(newValue);
        }
        else{
            setUserYearInput(e.target.value);
        }
    };

    function getFirstDigit(number){
        const numberStr = number.toString();
        const firstDigit = numberStr.charAt(0);
        number = parseInt(number, 10);
        return firstDigit;
    }

    function removeFirstDigit(number){
        const numberStr = number.toString();
        const newNumberStr = numberStr.slice(1);
        return parseInt(newNumberStr, 10);
    }

    function handleDayError(){
        errorCount++;
        setIsDayError(true);
        if(userDayInput  === ""){
            setDayErrorText("This field is required");
            setUserDayInput("");
        }
        else{
            setDayErrorText("Must be a valid day");
            setUserDayInput("");

        }
    }

    function handleMonthError(){
        errorCount++;
        setIsMonthError(true);
        if(userMonthInput  === ""){
            setMonthErrorText("This field is required");
            setUserMonthInput("");
        }
        else{
            setMonthErrorText("Must be a valid month");
            setUserMonthInput("");
        }
    }

    function handleYearError(){
        errorCount++;
        setIsYearError(true);
        if(userYearInput  === ""){
            setYearErrorText("This field is required");
            setUserYearInput("");
        }
        else if(userYearInput < 1000){
            setYearErrorText("Must be a valid year");
            setUserYearInput("");
        }
        else{
            setYearErrorText("Must be in the past");
            setUserYearInput("");
        }
    }

    function handleAgeCalculation(){

        errorCount = 0;

        setIsDayError(false);
        setIsMonthError(false);
        setIsYearError(false);

        setDayErrorText("");
        setMonthErrorText("");
        setYearErrorText("");

        const oddMonths = [4, 6, 9, 11];

        const currentDate = new Date();
        const userBirthDay = new Date(userYearInput, userMonthInput - 1, userDayInput);
        
        if (userDayInput > 31 || userDayInput < 1){
            handleDayError();
            console.log("Day error 1");
        }
        else if (userDayInput === 31 || oddMonths.includes(userMonthInput)){
            handleDayError();
            console.log("Day error 2");
        }
        else if (userMonthInput === "2" && !((userYearInput % 4 === 0 && userYearInput % 100 !== 0) || (userYearInput % 400 === 0)) && userDayInput > 28){
            handleDayError();
            console.log("Day error 3");
        }
        else if (userMonthInput === "2" && ((userYearInput % 4 === 0 && userYearInput % 100 !== 0) || (userYearInput % 400 === 0)) && userDayInput > 29){
            handleDayError();
            console.log("Day error 4");
        }
        
        if (userMonthInput > 12 || userMonthInput < 1){
            handleMonthError();
            console.log("Month error");
        }
        
        if (userYearInput > currentDate.getFullYear() || userYearInput < 1000){
            handleYearError();
            console.log("Year error");
        }

        console.log(errorCount);

        if (errorCount > 0){
            resetAll();
            return;
        }
        
        let day = currentDate.getDate() - userBirthDay.getDate();
        let month = currentDate.getMonth() - userBirthDay.getMonth();
        let year = currentDate.getFullYear() - userBirthDay.getFullYear();

        if (month < 0) {
            year--;
            month += 12;
        }

        if (day < 0) {
            month--;
            const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            day += previousMonth;
        }

        setAgeDay(day);
        setAgeMonth(month);
        setAgeYear(year);

        if(day === 1){
            setDayDisplay("day");
        }
    
        if(month === 1){
            setMonthDisplay("month");
        }
    
        if(year === 1){
            setYearDisplay("year");
        }
    }

    return(
        <div className='container'>

            <div className='inputs-labels'>

                <div className='box-day'>
                    <label className={isDayError ? "error-day-label" : "day-label"}>DAY</label>
                    <input className={isDayError ? "input-error" : "n-input"} onChange={(e) => handleDayChange(e)} type='number' value={userDayInput} placeholder='DD'/>
                    <label className='error-text'>{dayErrorText}</label>
                </div>

                <div className='box-month'>
                    <label className={isMonthError ? "error-month-label" : "month-label"}>MONTH</label>
                    <input className={isMonthError ? "input-error" : "n-input"} onChange={(e) => handleMonthChange(e)} type='number' value={userMonthInput} placeholder='MM'/>
                    <label className='error-text'>{monthErrorText}</label>
                </div>

                <div className='box-year'>
                    <label className={isYearError ? "error-year-label" : "year-label"}>YEAR</label>
                    <input className={isYearError ? "input-error" : "n-input"} onChange={(e) => handleYearChange(e)} type='number' value={userYearInput} placeholder='YYYY'/>
                    <label className='error-text'>{yearErrorText}</label>
                </div>

            </div>

            <img src={MyIcon} onClick={handleAgeCalculation}></img>

            <hr/>

            <div className='display-section'>
                <div className='year-display'>
                    <h1 className='age-number'>{ageYear}</h1>
                    <h1 className='age-display'>{yearDisplay}</h1>
                </div>

                <div className='month-display'>
                    <h1 className='age-number'>{ageMonth}</h1>
                    <h1 className='age-display'>{monthDisplay}</h1>
                </div>

                <div className='day-display'>
                    <h1 className='age-number'>{ageDay}</h1>
                    <h1 className='age-display'>{dayDisplay}</h1>
                </div>
                </div>

        </div>
        
    );
}

export default AgeCalculator