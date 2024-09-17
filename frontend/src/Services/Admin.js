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

// import axios from 'axios';

export async function AddSignalByAdmin(data, token) {
    try {
        const formData = new FormData();
        for (const key in data) {
            if (key === 'report' && data[key]) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key]);
            }
        }
 
        const res = await axios.post(`${Config.base_url}signal/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  
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




// get stock list and detail


export async function GetStockDetail(token) {
    try {
        const res = await axios.get(`${Config.base_url}stock/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return err;
    }
}


// get signal list 


export async function GetSignallist(token) {
    try {
        const res = await axios.get(`${Config.base_url}signal/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return err;
    }
}


// get signal detailperuser

export async function Signalperdetail(_id,token) {

    try {
        const res = await axios.get(`${Config.base_url}signal/detail/${_id}`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// delete signal 

export async function DeleteSignal(_id,token) {
    try {
        const res = await axios.get(`${Config.base_url}signal/delete/${_id}`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// for signal close api 


export async function SignalCloseApi(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}signal/closesignal`, data, { 
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



// basket list 


export async function BasketAllList(token) {
    try {
        const res = await axios.get(`${Config.base_url}basket/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return err;
    }
}



// add staff permission 

export async function addStaffpermission(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}user/update-permissions`,data, { 
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



// staff detail per id

export async function getstaffperuser(_id,token) {

    try {
        const res = await axios.get(`${Config.base_url}user/detail/${_id}`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// basket
// add basket 

export async function Addbasketplan(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}basket/add`, data, { 
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



// plan list 


export async function getplanlist(token) {

    try {
        const res = await axios.get(`${Config.base_url}plan/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// add plan 


export async function Addplanbyadmin(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}plan/add`, data, { 
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


// plan  plancategory list

export async function getcategoryplan(token) {

    try {
        const res = await axios.get(`${Config.base_url}plancategory/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// plan category add 

export async function Addplancategory(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}plancategory/add`, data, { 
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



//  update category plan 

export async function UpdateCategoryplan(data,token) {
    try {
        const res = await axios.put(`${Config.base_url}plancategory/update`,data ,{
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}


// delete plan category 


export async function deleteplancategory(_id,token) {
    try {
        const res = await axios.get(`${Config.base_url}plancategory/delete/${_id}`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}


// update plan status 

export async function updatecategorydstatus(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}plancategory/change-status`, data, { 
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


// delet api for service

export async function Deleteservices(_id,token) {
    try {
        const res = await axios.get(`${Config.base_url}service/delete/${_id}`, { 
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



// get stock list 

export async function getstocklist(token) {

    try {
        const res = await axios.get(`${Config.base_url}stock/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// add stock 

export async function AddstockbyAdmin(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}stock/add`, data, { 
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

// update stock


export async function Updatestock(data,token) {
    try {
        const res = await axios.put(`${Config.base_url}stock/update`, data, { 
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


// delet api for stock

export async function DeleteStock(_id,token) {
    try {
        const res = await axios.get(`${Config.base_url}stock/delete/${_id}`, { 
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



// change status of stock 

export async function Stockstatus(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}stock/change-status`, data, { 
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




// set stock data in bulk 

export async function Setstockinbulk(data,token) {
    
    try {
        const res = await axios.post(`${Config.base_url}stock/addbulkstock`, data, { 
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