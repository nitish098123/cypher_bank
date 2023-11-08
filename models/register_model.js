const mongoose = require("mongoose");

const register_device = new mongoose.Schema({
    ip_address_ : {
        type : String
    },

    active_status : {
        type : Boolean,
        default : true
    },

    paired_status : {
        type : Boolean,
        default : false
    },
    payload : {
        type : Boolean,
        default : false
    }
});


const Register_device = mongoose.model("Register_device", register_device);

module.exports = { Register_device };
