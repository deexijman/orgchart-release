function getRoles(domain){
    return `http://localhost:4000/api/org/roles?DOMAIN=${domain}`
}

function getDepartment(domain){
    return `http://localhost:4000/api/org/dept?DOMAIN=${domain}`
}

function getSeniorNames(designation, department){
    return `http://localhost:4000/api/org/senior?ROLE=${designation}&DEPARTMENT=${department}`
}

function getOrganizationChart(){
    return 'http://localhost:4000/api/org/orgchart'
}

function getCompleteUsersData(){
    return "http://localhost:4000/api/org/allusers"
}

function authenticationEndpoint(){
    return 'http://localhost:4000/api/auth/login'
}

function addUserEndpoint(){
    return "http://localhost:4000/api/user/register"
}

function sameDesignationEndpoint(){
    return "http://localhost:4000/api/org/samedesignation"
}

function getEmployeesReportingTo(){
    return "http://localhost:4000/api/org/reportingto"
}

function getAllUsers(){
    return "http://localhost:4000/api/org/allusers"
}

export {
    getRoles,
    getDepartment,
    getSeniorNames,
    getOrganizationChart,
    getCompleteUsersData,
    authenticationEndpoint,
    addUserEndpoint,
    sameDesignationEndpoint,
    getEmployeesReportingTo,
    getAllUsers
}