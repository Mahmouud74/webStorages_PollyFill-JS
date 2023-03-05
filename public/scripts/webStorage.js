if (typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined') {
    (function(){
        function Storage(type){
            this.setData = function(data){
                data = JSON.stringify(data);
                if(type=='session'){
                    setCookie('sessionStorage',data);
                }
                else{
                    let date = new Date();
                    date.setFullYear(date.getFullYear()+1);
                    setCookie("localStorage",data,date);
                }
            }
            this.getData=function(){
                var data = type==session?getCookie("sessionStorage"):getCookie("localStorage");
                return data ? JSON.parse(data):{};
            }
            this.clearWebStorage=function(){
                if(type=="session"){
                    setCookie("sessionStorage",'');
                }
                else{
                    let date = new Date();
                    date.setMonth(date.getMonth()+1);
                    setCookie("localStorage",'',date);
                }
            }
            var data = this.getData();
            return{
                length:0,
                setItem:function(key,value){
                    data[key]=value+'';
                    this.length++;
                    setData(data);
                },
                getItem:function(key){
                   return data[key];
                },
                clear:function(){
                    data=[];
                    clearWebStorage();
                    this.length=0;
                },
                removeItem:function(key){
                    delete data[key];
                    this.length--;
                    setData(data);
                }
            }
        };
        if (typeof window.localStorage == 'undefined') {
            window.localStorage = new Storage('local');
        }
        if (typeof window.sessionStorage == 'undefined') {
            window.sessionStorage = new Storage('session');
        }
    })()

}
/*var date = new Date();
date.setFullYear(date.getFullYear()+1);
function setLocalStorageItem(key,value){


    setCookie('localStorage',value,date);
}
function getLocalStorageItem(){

    return getCookie('localStorage');
}
function setSessionStorageItem(key,value){
    setCookie('sessionStorage',value);
}
function getSessionStorageItem(){
    return getCookie("sessionStorage");
}
function clearLocalStorageData(){

    setCookie('localStorage','',date);
}
function clearSessionStorageData(){

    setCookie('sessionStorage','');
}
function removeLocalStorageItem(key){

    setCookie('localStorage','',date);

}
function removeSessionStorageItem(key){

    setCookie('sessionStorage','',sessionStorageData);
}
setLocalStorageItem('first','111');
*/
