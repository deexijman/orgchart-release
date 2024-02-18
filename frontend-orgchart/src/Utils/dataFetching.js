import { getOrganizationChart, sameDesignationEndpoint, getEmployeesReportingTo } from './endpoints.js';
import axios from 'axios';

const callReportingToData = async ({ email, setReportingTo }) => {
    try {

        const response = await axios.post(getEmployeesReportingTo(),
            {
                email: email
            })

        setReportingTo(response.data.data)
    }
    catch (error) {
        console.log("Error response", error.response)
    }
}

const callChartData = async ({ email, reportsTo, setUserData }) => {
    try {
        const response = await axios.post(getOrganizationChart(),
            {
                email: email,
                reportsTo: reportsTo
            })

        setUserData(response.data.reverse())
    }
    catch (error) {
        console.log("Error response", error.response)
    }

}

const callSameDesignationData = async ({ email, reportsTo, setSameDesignation }) => {

    try {

        const response = await axios.post(sameDesignationEndpoint(),
            {
                email: email,
                reportsTo: reportsTo
            })

        setSameDesignation(response.data.data)

    }
    catch (error) {
        console.log("Error response", error.response)
    }

}

export {

    callChartData,
    callSameDesignationData,
    callReportingToData
    
}