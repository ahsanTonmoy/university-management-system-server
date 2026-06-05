export type AcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type AcademicSemesterCode = '01' | '02' | '03';
export type AcademicSemesterMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
// academic semester interface
export type TacademicSemester ={
    title: AcademicSemesterTitle;
    code: AcademicSemesterCode;
    year: string;
    startMonth: AcademicSemesterMonth;
    endMonth: AcademicSemesterMonth;
};