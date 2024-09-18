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


        if ("Forbidden" == err.response?.data || err.message) {
            localStorage.clear()
            window.location.reload()
        }
        return err;
    }
}





export async function AddStaffClient(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}user/add`, data, {
            headers: {
                data: {},
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


export async function deleteStaff(_id, token) {
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


export async function UpdateStaff(data, token) {
    try {

        const res = await axios.put(`${Config.base_url}user/update`, data, {
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

export async function UpdateClient(data, token) {
    try {
        const res = await axios.put(`${Config.base_url}client/update`, data, {
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

export async function deleteClient(_id, token) {
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

export async function AddClient(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}client/add`, data, {
            headers: {
                data: {},
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

export async function AddService(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}service/add`, data, {
            headers: {
                data: {},
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

export async function UpdateService(data, token) {
    try {
        const res = await axios.put(`${Config.base_url}service/update`, data, {
            headers: {
                data: {},
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


export async function UpdateServiceStatus(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}service/change-status`, data, {
            headers: {
                data: {},
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

export async function UpdateClientStatus(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}client/change-status`, data, {
            headers: {
                data: {},
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

export async function updateStaffstatus(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}user/change-status`, data, {
            headers: {
                data: {},
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

export async function Signalperdetail(_id, token) {

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

export async function DeleteSignal(_id, token) {
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


export async function SignalCloseApi(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}signal/closesignal`, data, {
            headers: {
                data: {},
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

export async function addStaffpermission(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}user/update-permissions`, data, {
            headers: {
                data: {},
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

export async function getstaffperuser(_id, token) {

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

export async function Addbasketplan(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}basket/add`, data, {
            headers: {
                data: {},
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


export async function Addplanbyadmin(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}plan/add`, data, {
            headers: {
                data: {},
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

export async function Addplancategory(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}plancategory/add`, data, {
            headers: {
                data: {},
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

export async function UpdateCategoryplan(data, token) {
    try {
        const res = await axios.put(`${Config.base_url}plancategory/update`, data, {
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


export async function deleteplancategory(_id, token) {
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

export async function updatecategorydstatus(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}plancategory/change-status`, data, {
            headers: {
                data: {},
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

export async function Deleteservices(_id, token) {
    try {
        const res = await axios.get(`${Config.base_url}service/delete/${_id}`, {
            headers: {
                data: {},
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

export async function AddstockbyAdmin(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}stock/add`, data, {
            headers: {
                data: {},
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


export async function Updatestock(data, token) {
    try {
        const res = await axios.put(`${Config.base_url}stock/update`, data, {
            headers: {
                data: {},
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

export async function DeleteStock(_id, token) {
    try {
        const res = await axios.get(`${Config.base_url}stock/delete/${_id}`, {
            headers: {
                data: {},
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

export async function Stockstatus(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}stock/change-status`, data, {
            headers: {
                data: {},
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

export async function Setstockinbulk(data, token) {
    const formData = new FormData();
    formData.append('add_by', data.add_by);
    formData.append('file', data.file);
    try {
        const res = await axios.post(`${Config.base_url}stock/addbulkstock`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error uploading CSV:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// get blogs list 


export async function getblogslist(token) {

    try {
        const res = await axios.get(`${Config.base_url}blogs/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// add blogs by admin 


export async function Addblogsbyadmin(data, token) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('add_by', data.add_by);
    try {
        const res = await axios.post(`${Config.base_url}blogs/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error uploading CSV:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}


// update blogs

export async function Updateblogsbyadmin(data, token) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('id', data.id);
    try {
        const res = await axios.post(`${Config.base_url}blogs/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error uploading CSV:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



//blogs status 

export async function changeblogsstatus(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}blogs/change-status`, data, {
            headers: {
                data: {},
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}

// blogs delete 

// delete news 

export async function DeleteBlogs(_id, token) {
    try {
        const res = await axios.get(`${Config.base_url}blogs/delete/${_id}`, {
            headers: {
                data: {},
                'Authorization': `${token}`,
            },
        });

        return res?.data;

    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}




// get news list 


export async function getnewslist(token) {

    try {
        const res = await axios.get(`${Config.base_url}news/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// add News by admin 


export async function AddNewsbyadmin(data, token) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('add_by', data.add_by);
    try {
        const res = await axios.post(`${Config.base_url}news/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error uploading CSV:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// update news 

export async function UpdateNewsbyadmin(data, token) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('id', data.id);
    try {
        const res = await axios.post(`${Config.base_url}news/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error uploading CSV:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// news status

export async function changeNewsStatus(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}news/change-status`, data, {
            headers: {
                data: {},
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// delete news 

export async function DeleteNews(_id, token) {
    try {
        const res = await axios.get(`${Config.base_url}news/delete/${_id}`, {
            headers: {
                data: {},
                'Authorization': `${token}`,
            },
        });

        return res?.data;

    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// FAQ


// get FAQ list 


export async function getFaqlist(token) {

    try {
        const res = await axios.get(`${Config.base_url}faq/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}



// add faq 

export async function AddFaq(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}faq/add`, data, {
            headers: {
                data: {},
                'Authorization': `${token}`,
            },

        });

        return res?.data;
    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// update faq 

export async function UpdateFaq(data, token) {
    try {
        const res = await axios.put(`${Config.base_url}faq/update`, data, {
            headers: {
                data: {},
                'Authorization': `${token}`,
            },

        });

        return res?.data;
    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// Faq delete 


export async function DeleteFAQ(_id, token) {
    try {
        const res = await axios.get(`${Config.base_url}faq/delete/${_id}`, {
            headers: {
                data: {},
                'Authorization': `${token}`,
            },
        });

        return res?.data;

    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// Change Faq status 

// status

export async function changeFAQStatus(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}faq/change-status`, data, {
            headers: {
                data: {},
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error adding client:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}



// add coupon

export async function Addcouponbyadmin(data, token) {
    const formData = new FormData();
   
    formData.append('add_by', data.add_by);
    formData.append('image', data.image);
    formData.append('name',data.name );
    formData.append('code',data.code );
    formData.append('type',data.type );
    formData.append('value',data.value );
    formData.append('startdate',data.startdate );
    formData.append('enddate',data.enddate );
    formData.append('minpurchasevalue',data.minpurchasevalue );
    formData.append('mincouponvalue',data.mincouponvalue );
    formData.append('description',data.description);

    try {
        const res = await axios.post(`${Config.base_url}coupon/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`,
            },
        });

        return res?.data;
    } catch (err) {
        console.error('Error uploading CSV:', err.response?.data || err.message);
        return err.response?.data || err.message;
    }
}


// get coupon list 

export async function getcouponlist(token) {

    try {
        const res = await axios.get(`${Config.base_url}coupon/list`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return res?.data;
    } catch (err) {
        return { error: err.response?.data || err.message };
    }
}
