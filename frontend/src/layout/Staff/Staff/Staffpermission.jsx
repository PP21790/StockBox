import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { addStaffpermission, getstaffperuser } from '../../../Services/Admin';

const Staffpermission = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { row } = location.state;
    const token = localStorage.getItem('token');
    const [clients, setClients] = useState([]);
    const _id = row._id;




    useEffect(() => {
        getAdminclient();
    }, []);
    

    const getAdminclient = async () => {
        try {
            const response = await getstaffperuser(_id, token);
            if (response.status) {
                setClients(response.data.permissions);
            }
        } catch (error) {
            console.log("Error fetching client permissions:", error);
        }
    };




    const validate = (values) => {
        let errors = {};

        if (!values.FullName) {
            errors.FullName = 'Please Enter Full Name';
        }
        if (!values.Email) {
            errors.Email = 'Please Enter Email';
        }
        if (!values.UserName) {
            errors.UserName = 'Please Enter Username';
        }
        if (!values.PhoneNo) {
            errors.PhoneNo = 'Please Enter Phone Number';
        }

        return errors;
    };

    const onSubmit = async (values) => {
        const permissions = Object.keys(values).filter(key => values[key] === true);

        const req = {
            permissions,
            id: row._id,
        };

        try {
            const response = await addStaffpermission(req, token);
            if (response.status) {
                Swal.fire({
                    title: 'Update Successful!',
                    text: response.message,
                    icon: 'success',
                    timer: 1500,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    navigate('/staff/staff');
                }, 1500);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: response.message,
                    icon: 'error',
                    timer: 1500,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.',
                icon: 'error',
                timer: 1500,
                timerProgressBar: true,
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            FullName: row?.FullName || '',
            UserName: row?.UserName || '',
            Email: row?.Email || '',
            PhoneNo: row?.PhoneNo || '',
            addclient: false,
            viewclient: false,
            viewdetail: false,
            editclient: false,
            deleteclient: false,
            clientchangestatus: false,
            viewuser: false,
            userPermissions: false,
            Servicepermission: false,
            addservice: false,
            editservice: false,
            viewservice: false,
            deleteservice: false,

        },
        validate,
        onSubmit,
    });

    useEffect(() => {
        if (clients.length > 0) {
            formik.setFieldValue('addclient', clients.includes('addclient'));
            formik.setFieldValue('viewclient', clients.includes('viewclient'));
            formik.setFieldValue('viewdetail', clients.includes('viewdetail'));
            formik.setFieldValue('editclient', clients.includes('editclient'));
            formik.setFieldValue('deleteclient', clients.includes('deleteclient'));
            formik.setFieldValue('clientchangestatus', clients.includes('clientchangestatus'));
            formik.setFieldValue('userPermissions', clients.includes('userPermissions'));


            
            formik.setFieldValue('Servicepermission', clients.includes('Servicepermission'));
            formik.setFieldValue('addservice', clients.includes('addservice'));
            formik.setFieldValue('editservice', clients.includes('editservice'));
            formik.setFieldValue('viewservice', clients.includes('viewservice'));
            formik.setFieldValue('deleteservice', clients.includes('deleteservice'));
           
           
        }
    }, [clients]);



    useEffect(() => {
        if (formik.values.userPermissions == true) {
            formik.setFieldValue('addclient', true);
            formik.setFieldValue('viewclient', true);
            formik.setFieldValue('viewdetail', true);
            formik.setFieldValue('editclient', true);
            formik.setFieldValue('deleteclient', true);
            formik.setFieldValue('clientchangestatus', true);
        }
        else {
            formik.setFieldValue('addclient', false);
            formik.setFieldValue('viewclient', false);
            formik.setFieldValue('viewdetail', false);
            formik.setFieldValue('editclient', false);
            formik.setFieldValue('deleteclient', false);
            formik.setFieldValue('clientchangestatus', false); 
        }

    }, [formik.values.userPermissions])


    useEffect(()=>{
        if (formik.values.Servicepermission == true) {
            formik.setFieldValue('addservice', true);
            formik.setFieldValue('editservice', true);
            formik.setFieldValue('viewservice', true);
            formik.setFieldValue('deleteservice', true);
           
        }
        else {
            formik.setFieldValue('addservice', false);
            formik.setFieldValue('editservice', false);
            formik.setFieldValue('viewservice', false);
            formik.setFieldValue('deleteservice', false);
        }
    },[formik.values.Servicepermission])


    const fields = [
        {
            name: 'FullName',
            label: 'Full Name',
            type: 'text',
            label_size: 6,
            col_size: 6,
            disable: true,
        },
        {
            name: 'UserName',
            label: 'User Name',
            type: 'text',
            label_size: 12,
            col_size: 6,
            disable: true,
        },
        {
            name: 'userPermissions',
            label: 'Clent Permissions',
            type: 'checkbox',
            label_size: 12,
            col_size: 12,
            check_box_true: formik.values.userPermissions,

        },
        {
            name: 'addclient',
            label: 'Add Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.addclient,
            check_box_true: formik.values.userPermissions || formik.values.addclient ? true : false,
        },
        {
            name: 'viewclient',
            label: 'View Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.viewclient,
            check_box_true: formik.values.userPermissions || formik.values.viewclient ? true : false,

        },
        {
            name: 'viewdetail',
            label: 'View Client Detail',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.viewdetail,
            check_box_true: formik.values.userPermissions || formik.values.viewdetail ? true : false,

        },
        {
            name: 'editclient',
            label: 'Edit Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.editclient,
            check_box_true: formik.values.userPermissions || formik.values.editclient ? true : false,
        },
        {
            name: 'deleteclient',
            label: 'Delete Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.deleteclient,
            check_box_true: formik.values.userPermissions || formik.values.deleteclient ? true : false,
        },
        {
            name: 'clientchangestatus',
            label: 'Client Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.clientchangestatus,
            check_box_true: formik.values.userPermissions || formik.values.clientchangestatus ? true : false,
        },
        {
            name: 'Servicepermission',
            label: 'Service Permissions',
            type: 'checkbox',
            label_size: 12,
            col_size: 12,
            check_box_true: formik.values.Servicepermission,
        },
        {
            name: 'addservice',
            label: 'Add Service',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.Servicepermission || formik.values.addservice ? true : false,
    
        },
        {
            name: 'viewservice',
            label: 'View Service',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.Servicepermission || formik.values.viewservice ? true : false,
        },
        {
            name: 'editservice',
            label: 'Edit Service',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.Servicepermission || formik.values.editservice ? true : false,
        },
        {
            name: 'deleteservice',
            label: 'Delete Service',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.Servicepermission || formik.values.deleteservice ? true : false,
        }
    ];

    return (
        <div style={{ marginTop: '100px' }}>
            <DynamicForm
                fields={fields}
                page_title="Edit Permission"
                btn_name="Edit Permission"
                btn_name1="Cancel"
                sumit_btn={true}
                formik={formik}
                btn_name1_route={'/staff/staff'}
                additional_field={<></>}
            />
        </div>
    );
};

export default Staffpermission;  
