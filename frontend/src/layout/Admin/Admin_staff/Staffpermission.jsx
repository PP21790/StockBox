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
            errors.FullName = 'Please enter Full Name';
        }
        if (!values.Email) {
            errors.Email = 'Please enter Email';
        }
        if (!values.UserName) {
            errors.UserName = 'Please enter Username';
        }
        if (!values.PhoneNo) {
            errors.PhoneNo = 'Please enter Phone Number';
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
                    navigate('/admin/staff');
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
            console.error('An error occurred', error);
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
            adduser: false,
            edituser: false,
            deleteuser: false,
            viewuser: false,
            addservice: false,
        },
        validate,
        onSubmit,
    });

    useEffect(() => {
        if (clients.length > 0) {
            formik.setFieldValue('adduser', clients.includes('adduser'));
            formik.setFieldValue('edituser', clients.includes('edituser'));
            formik.setFieldValue('deleteuser', clients.includes('deleteuser'));
            formik.setFieldValue('viewuser', clients.includes('viewuser'));
            formik.setFieldValue('addservice', clients.includes('addservice'));
        }
    }, [clients]);

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
            name: 'adduser',
            label: 'Add User',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            check_box_true: formik.values.adduser,
        },
        {
            name: 'edituser',
            label: 'Edit User',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            check_box_true: formik.values.edituser,
        },
        {
            name: 'deleteuser',
            label: 'Delete User',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            check_box_true: formik.values.deleteuser,
        },
        {
            name: 'viewuser',
            label: 'View User',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            check_box_true: formik.values.viewuser,
        },
        {
            name: 'addservice',
            label: 'Add Service',
            type: 'checkbox',
            label_size: 12,
            col_size: 6,
            check_box_true: formik.values.addservice,
        },
    ];


    return (
        <div style={{ marginTop: '100px' }}>
            <DynamicForm
                fields={fields}
                page_title="Edit Staff"
                btn_name="Edit Staff"
                btn_name1="Cancel"
                formik={formik}
                btn_name1_route={'/admin/staff'}
                additional_field={<></>}
            />
        </div>
    );
};

export default Staffpermission;
