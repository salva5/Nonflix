const validations = ({name, password}) => {
const errors = {
    name: ""
}
if (name === "") {
    errors.name =  "Your name cannot be empty" ;
  }else{
    if(name.length < 10){
      errors.name = "Your name must have at least 10 characters";  
    }else{
      errors.name = ""
    }
  }

if(password.length < 7){
    errors.password = "Your password must have at least 6 characters";  
  }else {
    errors.password = "" ;  
  }

  return errors;
}
export default validations;