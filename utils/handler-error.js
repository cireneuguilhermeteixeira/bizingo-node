module.exports = function(resp,message){
    return  {   
        success : false,
        data : resp,
        message : message || 'erro'
    };
}

 