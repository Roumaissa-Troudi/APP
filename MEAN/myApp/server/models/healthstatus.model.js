const mongoose= require('mongoose');

var healthSchema = new mongoose.Schema({
    employee_id: {
        type:String
    },
    healthvaluePhy: {
        type: Number
    },
    healthvaluePsy: {
        type: Number
    },
    date:{
        type: Date
    }
})

mongoose.model('healthstatus', healthSchema);