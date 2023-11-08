// THIS FILE WILL CHECK IN EVERY 13 SEC into the database
/* IF THIS WILL FIND THAT ANY NODE IS NOT UPDATED FOR 10-11 sec then consider this as dead node */

const { node_info_ } = require("../models/node_status")


// this is the checking function
async function check_node_status() {

    // this will store dead nodes
    const dead_nodes_id = [];

    // check into the database if the node is dead or not
    const curent_milliseconds = Date.now()
    const target_millisecond_ = curent_milliseconds - 10000;

    // check if last_update is < target_millisecond_ then consider it as dead node
    const result_ = await node_info_.find({ last_time_update : { $lt: target_millisecond_ }});
    

    // this is for getting dead nodes
    if(result_ != null){
       
        console.log("Dead nodes found && result is ::" + result_)

        // if the result_ is not empty then consider it as dead node
        if(result_.length > 0){
            result_.forEach(node=>{
                dead_nodes_id.push(node.node_id)
            });
        }

        // now check if dead_nodes_id is not empty or not
        if(dead_nodes_id.length > 0){
            
            console.log("Dead nodes found")

            /* Update that node as inactive */
            /* Find Out what are teh chunks ids were their inside node */
            /* get the respective perent nodes of chunks */
            /* now replicate that all chucnks into new node */
            /* now update the node id's of all chunks */

        }

    }


    // this is for not getting dead nodes
    else {
        console.log("No dead nodes found")
    }

}



// this function will run in every 13 sec
function start_check_node_status(){
    setInterval(check_node_status, 13000);
}

module.exports = { start_check_node_status };