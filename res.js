'use strict';

exports.ok = function(values,res){
    var data ={
        'status':200,
        'values':values
    };

     res.json(data);
     
}

exports.error = function(values,res){
    var data ={
        'status':400,
        'values':values
    };

     res.json(data);
     
}