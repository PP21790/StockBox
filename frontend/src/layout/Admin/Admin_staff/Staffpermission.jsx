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

            userPermissions: false,
            addclient: false,
            viewclient: false,
            viewdetail: false,
            editclient: false,
            deleteclient: false,
            clientchangestatus: false,


            planpermission: false,
            addplan: false,
            editplan: false,
            viewplan: false,
            deleteplan: false,
            planstatus: false,

            signalstatus: false,
            deletesignal: false,
            editsignal: false,
            viewsignal: false,
            addsignal: false,
            Signalpermission: false,

            Staffpermission: false,
            addstaff: false,
            editstaff: false,
            viewstaff: false,
            deletestaff: false,
            staffstatus: false,
            
            newspermission: false,
            addnews: false,
            editnews: false,
            viewnews: false,
            deletenews: false,
            newsstatus: false,


            bannerpermission: false,
            addbanner: false,
            editbanner: false,
            viewbanner: false,
            deletebanner: false,
            bannerstatus: false,
           

            couponpermission: false,
            addcoupon: false,
            editcoupon: false,
            viewcoupon: false,
            deletecoupon: false,
            couponstatus: false,


            blogspermission: false,
            addblogs: false,
            editblogs: false,
            viewblogs: false,
            deleteblogs: false,
            blogsstatus: false,


            
            faqpermission: false,
            addfaq: false,
            editfaq: false,
            viewfaq: false,
            deletefaq: false,
            faqstatus: false,


            categorypermission: false,
            addcategory: false,
            editcategory: false,
            viewcategory: false,
            deletecategory: false,
            categorystatus: false,


        },
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



            formik.setFieldValue('planpermission', clients.includes('planpermission'));
            formik.setFieldValue('addplan', clients.includes('addplan'));
            formik.setFieldValue('editplan', clients.includes('editplan'));
            formik.setFieldValue('deleteplan', clients.includes('deleteplan'));
            formik.setFieldValue('planstatus', clients.includes('planstatus'));
            formik.setFieldValue('viewplan', clients.includes('viewplan'));


            formik.setFieldValue('Signalpermission', clients.includes('Signalpermission'));
            formik.setFieldValue('addsignal', clients.includes('addsignal'));
            formik.setFieldValue('editsignal', clients.includes('editsignal'));
            formik.setFieldValue('viewsignal', clients.includes('viewsignal'));
            formik.setFieldValue('deletesignal', clients.includes('deletesignal'));
            formik.setFieldValue('signalstatus', clients.includes('signalstatus'));



            formik.setFieldValue('Staffpermission', clients.includes('Staffpermission'));
            formik.setFieldValue('addstaff', clients.includes('addstaff'));
            formik.setFieldValue('editstaff', clients.includes('editstaff'));
            formik.setFieldValue('viewstaff', clients.includes('viewstaff'));
            formik.setFieldValue('deletestaff', clients.includes('deletestaff'));
            formik.setFieldValue('staffstatus', clients.includes('staffstatus'));



            formik.setFieldValue('newspermission', clients.includes('newspermission'));
            formik.setFieldValue('addnews', clients.includes('addnews'));
            formik.setFieldValue('editnews', clients.includes('editnews'));
            formik.setFieldValue('viewnews', clients.includes('viewnews'));
            formik.setFieldValue('deletenews', clients.includes('deletenews'));
            formik.setFieldValue('newsstatus', clients.includes('newsstatus'));


           
            formik.setFieldValue('bannerpermission', clients.includes('bannerpermission'));
            formik.setFieldValue('addbanner', clients.includes('addbanner'));
            formik.setFieldValue('editbanner', clients.includes('editbanner'));
            formik.setFieldValue('viewbanner', clients.includes('viewbanner'));
            formik.setFieldValue('deletebanner', clients.includes('deletebanner'));
            formik.setFieldValue('bannerstatus', clients.includes('bannerstatus'));


             
            formik.setFieldValue('couponpermission', clients.includes('couponpermission'));
            formik.setFieldValue('addcoupon', clients.includes('addcoupon'));
            formik.setFieldValue('editcoupon', clients.includes('editcoupon'));
            formik.setFieldValue('viewcoupon', clients.includes('viewcoupon'));
            formik.setFieldValue('deletecoupon', clients.includes('deletecoupon'));
            formik.setFieldValue('couponstatus', clients.includes('couponstatus'));


            formik.setFieldValue('blogspermission', clients.includes('blogspermission'));
            formik.setFieldValue('addblogs', clients.includes('addblogs'));
            formik.setFieldValue('editblogs', clients.includes('editblogs'));
            formik.setFieldValue('viewblogs', clients.includes('viewblogs'));
            formik.setFieldValue('deleteblogs', clients.includes('deleteblogs'));
            formik.setFieldValue('blogsstatus', clients.includes('blogsstatus'));

              
            formik.setFieldValue('faqpermission', clients.includes('faqpermission'));
            formik.setFieldValue('addfaq', clients.includes('addfaq'));
            formik.setFieldValue('editfaq', clients.includes('editfaq'));
            formik.setFieldValue('viewfaq', clients.includes('viewfaq'));
            formik.setFieldValue('deletefaq', clients.includes('deletefaq'));
            formik.setFieldValue('faqstatus', clients.includes('faqstatus'));


            formik.setFieldValue('categorypermission', clients.includes('categorypermission'));
            formik.setFieldValue('addcategory', clients.includes('addcategory'));
            formik.setFieldValue('editcategory', clients.includes('editcategory'));
            formik.setFieldValue('viewcategory', clients.includes('viewcategory'));
            formik.setFieldValue('deletecategory', clients.includes('deletecategory'));
            formik.setFieldValue('categorystatus', clients.includes('categorystatus'));


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

   
    useEffect(() => {
        if (formik.values.Signalpermission == true) {
            formik.setFieldValue('signalstatus', true);
            formik.setFieldValue('viewsignal', true);
            formik.setFieldValue('addsignal', true);
            formik.setFieldValue('editsignal', true);
            formik.setFieldValue('deletesignal', true);

        }
        else {
            formik.setFieldValue('signalstatus', false);
            formik.setFieldValue('viewsignal', false);
            formik.setFieldValue('addsignal', false);
            formik.setFieldValue('editsignal', false);
            formik.setFieldValue('deletesignal', false);

        }

    }, [formik.values.Signalpermission])


    useEffect(() => {
        if (formik.values.categorypermission == true) {
            formik.setFieldValue('categorystatus', true);
            formik.setFieldValue('viewcategory', true);
            formik.setFieldValue('addcategory', true);
            formik.setFieldValue('editcategory', true);
            formik.setFieldValue('deletecategory', true);

        }
        else {
            formik.setFieldValue('categorystatus', false);
            formik.setFieldValue('viewcategory', false);
            formik.setFieldValue('addcategory', false);
            formik.setFieldValue('editcategory', false);
            formik.setFieldValue('deletecategory', false);

        }

    }, [formik.values.categorypermission])



    useEffect(() => {
        if (formik.values.planpermission == true) {
            formik.setFieldValue('addplan', true);
            formik.setFieldValue('editplan', true);
            formik.setFieldValue('deleteplan', true);
            formik.setFieldValue('viewplan', true);
            formik.setFieldValue('planstatus', true);

        }
        else {
            formik.setFieldValue('addplan', false);
            formik.setFieldValue('editplan', false);
            formik.setFieldValue('deleteplan', false);
            formik.setFieldValue('viewplan', false);
            formik.setFieldValue('planstatus', false);

        }

    }, [formik.values.planpermission])



    useEffect(() => {
        if (formik.values.Staffpermission == true) {
            formik.setFieldValue('addstaff', true);
            formik.setFieldValue('editstaff', true);
            formik.setFieldValue('viewstaff', true);
            formik.setFieldValue('deletestaff', true);
            formik.setFieldValue('staffstatus', true);

        }
        else {
            formik.setFieldValue('addstaff', false);
            formik.setFieldValue('editstaff', false);
            formik.setFieldValue('viewstaff', false);
            formik.setFieldValue('deletestaff', false);
            formik.setFieldValue('staffstatus', false);

        }

    }, [formik.values.Staffpermission])



    useEffect(() => {
        if (formik.values.bannerpermission == true) {
            formik.setFieldValue('addbanner', true);
            formik.setFieldValue('editbanner', true);
            formik.setFieldValue('viewbanner', true);
            formik.setFieldValue('deletebanner', true);
            formik.setFieldValue('bannerstatus', true);

        }
        else {
            formik.setFieldValue('addbanner', false);
            formik.setFieldValue('editbanner', false);
            formik.setFieldValue('viewbanner', false);
            formik.setFieldValue('deletebanner', false);
            formik.setFieldValue('bannerstatus', false);

        }

    }, [formik.values.bannerpermission])

  
    useEffect(() => {
        if (formik.values.couponpermission == true) {
            formik.setFieldValue('addcoupon', true);
            formik.setFieldValue('editcoupon', true);
            formik.setFieldValue('viewcoupon', true);
            formik.setFieldValue('deletecoupon', true);
            formik.setFieldValue('couponstatus', true);

        }
        else {
            formik.setFieldValue('addcoupon', false);
            formik.setFieldValue('editcoupon', false);
            formik.setFieldValue('viewcoupon', false);
            formik.setFieldValue('deletecoupon', false);
            formik.setFieldValue('couponstatus', false);

        }

    }, [formik.values.couponpermission])

   
    useEffect(() => {
        if (formik.values.blogspermission == true) {
            formik.setFieldValue('addblogs', true);
            formik.setFieldValue('editblogs', true);
            formik.setFieldValue('viewblogs', true);
            formik.setFieldValue('deleteblogs', true);
            formik.setFieldValue('blogsstatus', true);

        }
        else {
            formik.setFieldValue('addblogs', false);
            formik.setFieldValue('editblogs', false);
            formik.setFieldValue('viewblogs', false);
            formik.setFieldValue('deleteblogs', false);
            formik.setFieldValue('blogsstatus', false);

        }

    }, [formik.values.blogspermission])

   


    useEffect(() => {
        if (formik.values.faqpermission == true) {
            formik.setFieldValue('addfaq', true);
            formik.setFieldValue('editfaq', true);
            formik.setFieldValue('viewfaq', true);
            formik.setFieldValue('deletefaq', true);
            formik.setFieldValue('faqstatus', true);

        }
        else {
            formik.setFieldValue('addfaq', false);
            formik.setFieldValue('editfaq', false);
            formik.setFieldValue('viewfaq', false);
            formik.setFieldValue('deletefaq', false);
            formik.setFieldValue('faqstatus', false);

        }

    }, [formik.values.faqpermission])
  

    useEffect(() => {
        if (formik.values.newspermission == true) {
            formik.setFieldValue('addnews', true);
            formik.setFieldValue('editnews', true);
            formik.setFieldValue('viewnews', true);
            formik.setFieldValue('deletenews', true);
            formik.setFieldValue('newsstatus', true);

        }
        else {
            formik.setFieldValue('addnews', false);
            formik.setFieldValue('editnews', false);
            formik.setFieldValue('viewnews', false);
            formik.setFieldValue('deletenews', false);
            formik.setFieldValue('newsstatus', false);

        }

    }, [formik.values.newspermission])

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
            label: 'All Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.userPermissions,
            bold: true


        },
        {
            name: 'addclient',
            label: 'Add Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addclient,
            check_box_true: formik.values.userPermissions || formik.values.addclient ? true : false,
        },
        {
            name: 'viewclient',
            label: 'View Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewclient,
            check_box_true: formik.values.userPermissions || formik.values.viewclient ? true : false,

        },
        {
            name: 'viewdetail',
            label: 'View Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewdetail,
            check_box_true: formik.values.userPermissions || formik.values.viewdetail ? true : false,

        },
        {
            name: 'editclient',
            label: 'Edit Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editclient,
            check_box_true: formik.values.userPermissions || formik.values.editclient ? true : false,
        },
        {
            name: 'deleteclient',
            label: 'Delete Client',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteclient,
            check_box_true: formik.values.userPermissions || formik.values.deleteclient ? true : false,
        },
        {
            name: 'clientchangestatus',
            label: 'Client Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.clientchangestatus,
            check_box_true: formik.values.userPermissions || formik.values.clientchangestatus ? true : false,
        },
        {
            name: 'planpermission',
            label: 'All Plan',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.planpermission,
            bold: true
        },
        {
            name: 'addplan',
            label: 'Add Plan',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addPlan,
            check_box_true: formik.values.planpermission || formik.values.addplan ? true : false,

        },
        {
            name: 'viewplan',
            label: 'View Plan',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewPlan,
            check_box_true: formik.values.planpermission || formik.values.viewplan ? true : false,
        },
        {
            name: 'editplan',
            label: 'Edit Plan',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editPlan,
            check_box_true: formik.values.planpermission || formik.values.editplan ? true : false,
        },
        {
            name: 'deleteplan',
            label: 'Delete Plan',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deletePlan,
            check_box_true: formik.values.planpermission || formik.values.deleteplan ? true : false,
        },
        {
            name: 'planstatus',
            label: 'Plan Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deletePlan,
            check_box_true: formik.values.planpermission || formik.values.planstatus ? true : false,
        },


        {
            name: 'Signalpermission',
            label: 'All Signal',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.Signalpermission,
            bold: true
        },
        {
            name: 'addsignal',
            label: 'Add Signal',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.Signalpermission || formik.values.addsignal ? true : false,

        },
        {
            name: 'viewsignal',
            label: 'View Signal',
            type: 'checkbox',
            label_size: 12,
            col_size: 5,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.Signalpermission || formik.values.viewsignal ? true : false,
        },
        {
            name: 'editsignal',
            label: 'Edit Signal',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.Signalpermission || formik.values.editsignal ? true : false,
        },
        {
            name: 'deletesignal',
            label: 'Delete Signal',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.Signalpermission || formik.values.deletesignal ? true : false,
        },
        {
            name: 'signalstatus',
            label: 'Signal Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.Signalpermission || formik.values.signalstatus ? true : false,
        },


        {
            name: 'Staffpermission',
            label: 'All Staff',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.Staffpermission,
            bold: true
        },
        {
            name: 'addstaff',
            label: 'Add Staff',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.Staffpermission || formik.values.addstaff ? true : false,

        },
        {
            name: 'viewstaff',
            label: 'View Staff',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.Staffpermission || formik.values.viewstaff ? true : false,
        },
        {
            name: 'editstaff',
            label: 'Edit Staff',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.Staffpermission || formik.values.editstaff ? true : false,
        },
        {
            name: 'deletestaff',
            label: 'Delete Staff',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.Staffpermission || formik.values.deletestaff ? true : false,
        },
        {
            name: 'staffstatus',
            label: 'Staff Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.Staffpermission || formik.values.staffstatus ? true : false,
        },


        {
            name: 'newspermission',
            label: 'All news',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.newspermission,
            bold: true
        },
        {
            name: 'addnews',
            label: 'Add news',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.newspermission || formik.values.addnews ? true : false,

        },
        {
            name: 'viewnews',
            label: 'View news',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.newspermission || formik.values.viewnews ? true : false,
        },
        {
            name: 'editnews',
            label: 'Edit news',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.newspermission || formik.values.editnews ? true : false,
        },
        {
            name: 'deletenews',
            label: 'Delete news',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.newspermission || formik.values.deletenews ? true : false,
        },
        {
            name: 'newsstatus',
            label: 'News Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.newspermission || formik.values.newsstatus ? true : false,
        },


        {
            name: 'bannerpermission',
            label: 'All Banner',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.bannerpermission,
            bold: true
        },
        {
            name: 'addbanner',
            label: 'Add banner',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.bannerpermission || formik.values.addbanner ? true : false,

        },
        {
            name: 'viewbanner',
            label: 'View banner',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.bannerpermission || formik.values.viewbanner ? true : false,
        },
        {
            name: 'editbanner',
            label: 'Edit banner',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.bannerpermission || formik.values.editbanner ? true : false,
        },
        {
            name: 'deletebanner',
            label: 'Delete banner',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.bannerpermission || formik.values.deletebanner ? true : false,
        },
        {
            name: 'bannerstatus',
            label: 'banner Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.bannerpermission || formik.values.bannerstatus ? true : false,
        },


        {
            name: 'couponpermission',
            label: 'All Coupon',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.couponpermission,
            bold: true
        },
        {
            name: 'addcoupon',
            label: 'Add coupon',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.couponpermission || formik.values.addcoupon ? true : false,

        },
        {
            name: 'viewcoupon',
            label: 'View coupon',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.couponpermission || formik.values.viewcoupon ? true : false,
        },
        {
            name: 'editcoupon',
            label: 'Edit coupon',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.couponpermission || formik.values.editcoupon ? true : false,
        },
        {
            name: 'deletecoupon',
            label: 'Delete coupon',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.couponpermission || formik.values.deletecoupon ? true : false,
        },
        {
            name: 'couponstatus',
            label: 'Coupon Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.couponpermission || formik.values.couponstatus ? true : false,
        },

        {
            name: 'blogspermission',
            label: 'All Blogs',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.blogspermission,
            bold: true
        },
        {
            name: 'addblogs',
            label: 'Add blogs',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.blogspermission || formik.values.addblogs ? true : false,

        },
        {
            name: 'viewblogs',
            label: 'View blogs',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.blogspermission || formik.values.viewblogs ? true : false,
        },
        {
            name: 'editblogs',
            label: 'Edit blogs',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.blogspermission || formik.values.editblogs ? true : false,
        },
        {
            name: 'deleteblogs',
            label: 'Delete blogs',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.blogspermission || formik.values.deleteblogs ? true : false,
        },
        {
            name: 'blogsstatus',
            label: 'Blogs Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.blogspermission || formik.values.blogsstatus ? true : false,
        },
     

        {
            name: 'faqpermission',
            label: 'All Faq',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.faqpermission,
            bold: true
        },
        {
            name: 'addfaq',
            label: 'Add faq',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.faqpermission || formik.values.addfaq ? true : false,

        },
        {
            name: 'viewfaq',
            label: 'View faq',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.faqpermission || formik.values.viewfaq ? true : false,
        },
        {
            name: 'editfaq',
            label: 'Edit faq',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.faqpermission || formik.values.editfaq ? true : false,
        },
        {
            name: 'deletefaq',
            label: 'Delete faq',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.faqpermission || formik.values.deletefaq ? true : false,
        },
        {
            name: 'faqstatus',
            label: 'Faq Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.faqpermission || formik.values.faqstatus ? true : false,
        },
        {
            name: 'categorypermission',
            label: 'All category',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            check_box_true: formik.values.categorypermission,
            bold: true
        },
        {
            name: 'addcategory',
            label: 'Add category',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.addservice,
            check_box_true: formik.values.categorypermission || formik.values.addcategory ? true : false,

        },
        {
            name: 'viewcategory',
            label: 'View category',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.viewservice,
            check_box_true: formik.values.categorypermission || formik.values.viewcategory ? true : false,
        },
        {
            name: 'editcategory',
            label: 'Edit category',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.editservice,
            check_box_true: formik.values.categorypermission || formik.values.editcategory ? true : false,
        },
        {
            name: 'deletecategory',
            label: 'Delete category',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.categorypermission || formik.values.deletecategory ? true : false,
        },
        {
            name: 'categorystatus',
            label: 'category Status',
            type: 'checkbox',
            label_size: 12,
            col_size: 2,
            // check_box_true: formik.values.deleteservice,
            check_box_true: formik.values.categorypermission || formik.values.categorystatus ? true : false,
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
                btn_name1_route={'/admin/staff'}
                additional_field={<></>}
            />
        </div>
    );
    
};

export default Staffpermission;  
