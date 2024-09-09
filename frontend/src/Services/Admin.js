import axios from 'axios';
import * as Config from "../Utils/config";



export async function GetClient(token) {
    try {
        const res = await axios.get(`${Config.base_url}client/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return err;
    }
}



// add user 



export async function AddClient(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}user/add`, data, { 
            headers: {
                data:{},
                'Authorization': `${token}`,
            },
            
        });
       
        return res?.data;
    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message; 
    }
}



// get list for staaf

export async function GetStaff(token) {
    try {
        const res = await axios.get(`${Config.base_url}user/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return err;
    }
}



// delete staaf


export async function deleteStaff(_id,token) {
    try {
        const res = await axios.get(`${Config.base_url}user/delete/${_id}`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// update staff


export async function UpdateStaff(data,token) {
    try {
        const res = await axios.put(`${Config.base_url}user/update`,data ,{
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}