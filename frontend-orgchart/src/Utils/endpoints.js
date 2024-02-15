function getRoles(domain){
    return `http://localhost:4000/api/getroles?DOMAIN=${domain}`
}

function getDepartment(domain){
    return `http://localhost:4000/api/getdept?DOMAIN=${domain}`
}


function getSeniorNames(designation, department){
    return `http://localhost:4000/api/listseniornames?ROLE=${designation}&DEPARTMENT=${department}`
}

function getOrganizationChart(){
    return 'http://localhost:4000/api/getorgchart'
}

function getCompleteUsersData(){
    return "http://localhost:4000/api/getallusers"
}

function authenticationEndpoint(){
    return 'http://localhost:4000/api/login'
}

function addUserEndpoint(){
    return "http://localhost:4000/api/adduser"
}

export {
    getRoles,
    getDepartment,
    getSeniorNames,
    getOrganizationChart,
    getCompleteUsersData,
    authenticationEndpoint,
    addUserEndpoint
}