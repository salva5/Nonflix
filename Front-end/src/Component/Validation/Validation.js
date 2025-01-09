
const Validation = (error) => {
   const regexName = /^[a-zA-Z\s']+$/u
   let newError = {}
   

   if (!regexName.test(error.name)) {
      newError.name = "Enter a valid name"
   }
   if (error.password) {
      if (error.password.length < 8) {
         newError.password = "Use at least 8 characters";
      }
      if (!/[!@#$%^&*]/.test(error.password)) {
         if (newError.password) {
            newError.password += ", You are missing a special character";
         } else {
            newError.password = "You are missing a special character";
         }
      }
      if (!/[a-z]/.test(error.password)) {
         if (newError.password) {
            newError.password += ", Falta al menos una letra minúscula";
         } else {
            newError.password = "Falta al menos una letra minúscula";
         }
      }
      if (!/\d/.test(error.password)) {
         if (newError.password) {
            newError.password += ", use at least one number";
         } else {
            newError.password = "Use at least one number";
         }
      }
   }
   return newError
}

export default Validation
