const validations = (values) => {
   const errors = {}
   if(!values.name){
      errors.name = "Name is required"
   } else if(values.name.length > 17) {
      errors.name = "Name no valid"
   }
   if (!values.email ) {
      errors.email = "Email Required";
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
   }
   if(!values.password){
      errors.password = "Password Required"
   } else if(values.password.length < 6){
      errors.password = "Password must be at least 6 characters"
   }
   console.log(errors);
   return errors;
}
export default validations;