import React from 'react'
import DynamicForm from '../../../components/FormicForm'


const EditClient = () => {

    const formik = useFormik({
        initialValues: {
          fullName: "",
          username: "",
          email: "",
          phone: "",
          broker: null,
          groupservice: null,
          licence: null,
          parent_id: null,
          parent_role: null,
          demat_userid: null,
          api_key: null,
          Service_Type: 0,
          balance: 0,
          per_trade_value: null,
          Employees: null,
        },
    
        validate: (values) => {
          let errors = {};
    
          if (!values.fullName) {
            errors.fullName = valid_err.FULLNAME_ERROR;
          } else if (!isValidName(values.fullName)) {
            errors.fullName = valid_err.INVALID_ERROR;
          }
          if (!values.email) {
            errors.email = valid_err.EMPTY_EMAIL_ERROR;
          } else if (!isValidEmail(values.email)) {
            errors.email = valid_err.INVALID_EMAIL_ERROR;
          }
          if (!values.username) {
            errors.username = valid_err.USERNAME_ERROR;
          }
    
          if (!values.phone) {
            errors.phone = valid_err.CONTACT_ERROR;
          } else if (!isValidContact(values.phone)) {
            errors.phone = valid_err.INVALID_CONTACT_ERROR;
          }
    
          if (!values.broker && values.licence != 1) {
            errors.broker = "Please Select Broker ";
          }
    
          if (!values.licence) {
            errors.licence = "Please Select License Type";
          }
    
          if (!values.groupservice) {
            errors.groupservice = "Please select group service ";
          }
          return errors;
        },
    
        onSubmit: async (values) => {
          const req = {
            ProfileImg: ".",
            FullName: values.fullName,
            UserName: values.username,
            Email: values.email,
            license_type: values.licence,
            PhoneNo: values.phone,
            Balance: values.balance || null,
            subadmin_service_type: null,
            strategy_Percentage: null,
            Per_trade: null,
            Strategies: selectedCheckboxesAndPlan,
            parent_id: user_id,
            parent_role: Role || "SUBADMIN",
            demat_userid: values.demat_userid,
            group_service: values.groupservice,
            broker: values.broker,
            Service_Type: values.Service_Type,
            per_trade_value: values.per_trade_value || null,
            employee_id: values.Employees || null,
          };
     
          await dispatch(AddUsers(req))
            .unwrap()
            .then(async (response) => {
              if(balance <= 0){
                Swal.fire({
                    title: "Insufficient Balance",
                    icon: "error",
                    timerProgressBar: true,
                });
            
                return;
            }
              if (response.status) {
                
                Swal.fire({
                  title: "Create Successful!",
                  text: response.msg,
                  icon: "success",
                  timer: 1500,
                  timerProgressBar: true,
                });
                setTimeout(() => {
                  navigate("/subadmin/users");
                }, 1500);
              } else {
                Swal.fire({
                  title: "Error",
                  text: response.msg,
                  icon: "error",
                  timer: 1500,
                  timerProgressBar: true,
                });
              }
            })
            .catch((error) => {
              console.log("Error", error);
            });
        },
      });



      const fields = [
        {
          name: "fullName",
          label: "Full Name",
          type: "text",
          label_size: 6,
          col_size: 6,
          disable: false,
        },
        {
          name: "username",
          label: "Username",
          type: "text",
          label_size: 12,
          col_size: 6,
          disable: false,
        },
        {
          name: "email",
          label: "Email",
          type: "text",
          label_size: 12,
          col_size: 6,
          disable: false,
        },
    
        {
          name: "phone",
          label: "Phone Number",
          type: "text3",
          label_size: 12,
          col_size: 6,
          disable: false,
        },
        {
          name: "licence",
          label: "License Type",
          type: "select",
          options: [
            { label: "Demo", value: "1" },
            { label: "2 Day Live", value: "0" },
            { label: "Live", value: "2" },
          ],
          label_size: 12,
          col_size: 6,
          disable: false,
        },
        {
          name: "Service_Type",
          label: "Service Type",
          type: "test",
          label_size: 12,
          col_size: 6,
          disable: false,
          showWhen: (values) => subadmin_service_type1 == 1,
        },
        {
          name: "balance",
          label: "Balance",
          type: "text3",
          label_size: 12,
          col_size: 6,
          disable: false,
          showWhen: (values) =>
            subadmin_service_type1 == 1 &&
            values.licence === "2" &&
            formik.values.Service_Type == 2,
        },
        {
          name: "broker",
          label: "Broker",
          type: "select",
          options:
            getAllBroker &&
            getAllBroker.map((item) => ({
              label: item.title,
              value: item.broker_id,
            })),
          showWhen: (values) => values.licence === "2" || values.licence === "0",
          label_size: 12,
          col_size: 6,
          disable: false,
        },
        {
          name: "demat_userid",
          label:
            formik.values.broker == 9
              ? "User Id"
              : formik.values.broker == 2
              ? "Demat User ID"
              : "",
          type: "text",
          showWhen: (values) => values.broker === "9" || values.broker === "2",
          label_size: 12,
          col_size: 6,
          disable: false,
        },
        {
          name: "app_key",
          label: formik.values.broker == 5 || 6 ? "App Key" : "",
          type: "text",
          showWhen: (values) => values.broker === "5",
          label_size: 12,
          col_size: 6,
          disable: false,
        },
        {
          name: "groupservice",
          label: "Group Service",
          type: "select",
          options:
            allGroupService.data &&
            allGroupService.data.map((item) => ({
              label: item.name,
              value: item._id,
            })),
          label_size: 12,
          col_size: 6,
          disable: false,
        },
        {
          name: "Employees",
          label: "Employees",
          type: "select1",
          options:
            employeeNames.data &&
            employeeNames.data.map((item) => ({
              label: item.UserName,
              value: item._id,
            })),
          label_size: 12,
          col_size: 6,
          disable: false,
        },
      ];



  return (
    <div>
      
        <>
          <AddForm
            fields={fields.filter(
              (field) => !field.showWhen || field.showWhen(formik.values)
            )}
            page_title="Add New User"
            btn_name="Add User"
            btn_name1="Cancel"
            formik={formik}
            btn_name1_route={"/subadmin/users"}
            additional_field={
              <>
               
              </>
            }
          />

    </>
    </div>
  )
}

export default EditClient
