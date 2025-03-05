function empty(value){
    return value.trim() === '';
}

function email(value){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(!value)
        return false
    else
        return reg.test(value)
}