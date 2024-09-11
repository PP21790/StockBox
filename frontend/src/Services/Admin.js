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



export async function AddStaffClient(data,token) {
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


// update client 

export async function UpdateClient(data,token) {
    try {
        const res = await axios.put(`${Config.base_url}client/update`,data ,{
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}


// delete client 


export async function deleteClient(_id,token) {
    try {
        const res = await axios.get(`${Config.base_url}client/delete/${_id}`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}


// add client

export async function AddClient(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}client/add`, data, { 
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


// add signal by admin


export async function AddSignalByAdmin(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}signal/add`, data, { 
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




// service list


export async function GetService(token) {
    try {
        const res = await axios.get(`${Config.base_url}service/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return err;
    }
}


// service add

export async function AddService(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}service/add`, data, { 
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


// update service 

export async function UpdateService(data,token) {
    try {
        const res = await axios.put(`${Config.base_url}service/update`, data, { 
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


// update service status


export async function UpdateServiceStatus(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}service/change-status`, data, { 
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


// update client status

export async function UpdateClientStatus(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}client/change-status`, data, { 
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


// update staff status


export async function updateStaffstatus(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}user/change-status`, data, { 
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


// get service list for  signal page 


// export async function GetService(token) {
//     try {
//         const res = await axios.get(`${Config.base_url}service/list`, {
//             headers: {
//                 'Authorization': `${token}`
//             },
//         });
//         return res?.data;
//     } catch (err) {
//         return err;
//     }
// }