## Brief Project Structure

```
/
|-- client/		
    |-- public/
        |-- index.html            #First webpage of the project
    |-- src/
        |-- components/           #Contains all the required components of project
            |-- Navbar/               #Contains UI for navbar
            |-- common/               #Contains UI for common coomon features of admin and student
            |-- admin/                #Contains UI for features of admin
            |-- student/              #Contains UI for features of student
        |-- images/               #Contains images used in the project
        |-- context/              #Contains context file
        |-- pages/                #Contains all the different pages
            |-- Authentication/       #Contains pages related to authentication
            |-- home/                 #Contains home page
        |-- services/             #Contains all the api functions used in the project
|    
|-- server/
    |-- controller/          #Contains all the controllers of project
        |-- adminconroller.js     #Contains all the functions related to admin
        |-- companycontroller.js  #Contains all the functions related to companies
        |-- jobcontroller.js      #Contains all the functions related to companies
        |-- studentconroller.js   #Contains all the functions related to students
    |-- database/            #To establish connection between database and backend
    |-- route/               #Contains all routes used in project
    |-- server.js            #Main file of server folder
```

## APIs

| Routes | parameters | body | Description |
| -------- | -------- | -------- | -------- |
| `POSt` /loginadmin | | password | Take password as input and login admin if credentials are correct |
| `POST` /adminupdate | | password | Updates password of admin|
| `POST` /addstudent | | name , email , password , enrolment no. , cgpa , semester , course , mobile , gender , resume | Take the details as input and create student profile |
| `GET` /getallstudent | | | Returns the array of all students |
| `POST` /updatestudent | | name , email , password , cgpa , semester , course , mobile , gender , resume | Take the details as input and update student |
| `POST` /getstudent | | studentId | Get student by given id |
| `POST` /deletestudent | | studentId | Delete the student with given id |
| `POST` /addcompany | | name , type , description | Allows admin to add company |
| `GET` /getallcompany | | | Returns array of all companies |
| `GET` /getcompany | companyId | | Get the required company having this id |
| `POST` /updatecompany | | companyId | Allows admin to update the particular company having this id |
| `POST` /deletecompany | | companyId | Allows admin to delete the particular company having this id |
| `POST` /addjob | | name , description , salary , company_name | Take the details and allows admin to add a new company |
| `GET` /getalljob | | | Returns array of all jobs |
| `GET` /getjob | JobId | | Returns the job having this id |
| `POST` /deletejob | | jobId | Allows admin to delete job having this id |
| `POST` /updatejob | | jobId | Allows admin to update job having this id|
| `POST` /applyjob | | enrolment number , student name , jobId , jobName , companyName | Allows a particular student to apply for a particular job |
| `GET` /viewapplyjob | studentId | | Allows student to view the jobs he/she has applied |
|`GET` /getallapplyjob | | | Allows admin to view which job has been applied by which student |  
