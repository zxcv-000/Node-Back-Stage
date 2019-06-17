const getCookie = (req,key)=>{
   var cookies =  req.headers.cookie;
   var newArr = cookies.split("; ");
   for(var i=0;i<newArr.length;i++){
       var arr = newArr[i].split("=");
       if(arr[0] == key){
           return arr[1];
       }
   }
}

module.exports = {
    getCookie
}