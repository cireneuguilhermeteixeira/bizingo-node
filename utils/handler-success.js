module.exports = function(resp,message){
    return  {   
            success : true,
            data : resp,
            message : message || 'ok'
        }
    ;
}
