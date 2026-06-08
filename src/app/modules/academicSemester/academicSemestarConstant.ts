import { TacademicSemesterCode, TacademicSemesterTitle } from "./academicSemesterInterface";
// academic semester constants
export const academicSemesterTitle: TacademicSemesterTitle[] = ['Autumn', 'Summer', 'Fall'];
export const academicSemesterCode: TacademicSemesterCode[] = ['01', '02', '03'];
export const academicSemesterMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const academicSemesterTitleCodeMapper: {
  [key : string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03'
};
