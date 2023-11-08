const mongoose = require("mongoose");

const node_info = new mongoose.Schema({

    node_id : {
        type : String
    },

    last_time_update : {
        type : String,
        default : Date.now()        // this will get the current date and time
    },

    network_speed : {
        type : Number               // Bytes per second
    },

    battery_status_ : {
        type : String               // Battery Percentage
    },

    pair_status_ : {
        type : Array,               // Pairing Status
    },

    free_bytes_ : {
        type : Number               // Free stirage that can be stored in Bytes
    },

    used_bandwidth_ : {
        type : Number               // Used bandwidth in Bytes
    },

    active_status : {
        type : Boolean              // Active Status
    }

});


const node_info_ = mongoose.model("node_status", node_info);

module.exports = { node_info_ };
