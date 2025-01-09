export const postMovieValidation = (inputName, inputValue) => {

   if(inputName==="title") {
      if(inputValue==="") return ""
      if(inputValue.length > 35) return "Max 35 characters";
      if(!/^[A-Z]/.test(inputValue)) return "Title has to start with a capital letter";
      else return "";
   };
   if(inputName==="duration") {
      if(inputValue==="") return ""
      if(!/^[0-9]+$/.test(inputValue)) return "Please insert an integer";
      else return "";
   };
   if(inputName==="year") {
      if(inputValue==="") return ""
      if(!/^[0-9]+$/.test(inputValue)) return "Please insert a year";
      if(inputValue.length !== 4) return "Please insert a valid year";
      else return "";
   };
   if(inputName==="description") {
      if(inputValue==="") return ""
      if(inputValue < 100) return "Description must be at least 100 characters";
      if(inputValue > 500) return "Description cannot be longer than 500 charactes";
      else return "";
   };
   if(inputName==="language") {
      if(inputValue==="") return ""
      if(inputValue.length > 15) return "Max 15 characters";
      else return "";
   };
   if(inputName==="image") {
      if(inputValue==="") return ""
      const urlRegex = /^(https?:\/\/|ftp:\/\/)[^\s/$.?#].[^\s]*$/;
      if(!urlRegex.test(inputValue)) return "Input a valid URL"
      else return "";
   };
   if(inputName="trailer"){
      if(inputValue==="")return "";
      const trailerRegex = /^https?:\/\/[^\s/$.?#].[^\s]*\.mp4$/;
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/;
      if(!trailerRegex.test(inputValue) && !youtubeRegex.test(inputValue)) return "Input a valid URL"
      else return "";
   }
   return "";
};