const mongoose= require('mongoose');

var healthSchema = new mongoose.Schema({
    employee_id: {
        type:String
    },
    healthvalue: {
        type: Number
    },
    date:{
        type: Date
    }
})

mongoose.model('healthstatus', healthSchema);