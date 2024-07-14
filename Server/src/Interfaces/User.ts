export interface User {
    role?:'STUDENT' | 'INSTRUCTOR' | 'TEACHER'
    firstName: string;
    lastName: string;
    email: string;
    password:string;
}