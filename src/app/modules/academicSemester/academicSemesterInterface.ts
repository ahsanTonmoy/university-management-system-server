export type TacademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type TacademicSemesterCode = '01' | '02' | '03';
export type TacademicSemesterMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
// academic semester interface
export type TacademicSemester ={
    title: TacademicSemesterTitle;
    code: TacademicSemesterCode;
    year: string;
    startMonth: TacademicSemesterMonth;
    endMonth: TacademicSemesterMonth;
};