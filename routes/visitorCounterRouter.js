const express = require("express");
const { node_info_ } = require("../models/node_status")     // this is for storing the current node 
const router = express.Router();


/*
  if device is dead then partner will send request here with ipaddress and will update that
  IN RESPONSE THE NEW ACTIVE DEVICE WILL BE SENDED
*/


router.post("/register", async (req, res) => {

    // check status 
    const { node_id_ , network_speed_, battery_status, free_bytes, used_bandwidth } = req.body
    const check_status = await node_info_.findOne({ node_id : node_id_ })   // check the node id into the database
    
    console.log("THE NODE_ID IS ::"+ node_id_, " && device existed is ::" + check_status);


    // this is new node
    if(check_status == null || check_status == "" || check_status == NaN){
      
      await node_info_.create({node_id : node_id_,
                                    network_speed : network_speed_,
                                    battery_status_ : battery_status,
                                    pair_status_ : false,
                                    free_bytes_ : free_bytes,
                                    used_bandwidth_ : used_bandwidth,
                                    active_status : true })

      console.log("NEW DEVICE REGISTERED.")
      res.send("New Device")
    }


    // new node is already registered
    else {

      /* first get the last time update */
      const status_ = await node_info_.findOneAndUpdate({ node_id : node_id_ }, { $set: { last_time_update : Date.now() } } )

      console.log("Registered device is updated Activeness. :: " + status_)
      res.send("Device is already existed::")
    }

});



// update the Paired status
// this is also for dead partner device
router.post("/unpair",  async (req , res)=>{
  
    try{
      const ip_ = req.body.ip_;                   // ip address of live node
      const partner_ip =  req.body.ip_partner;    // ip address of dead node


      await Register_device.findOneAndUpdate( { ip_address_ : ip_ } , {$set: {active_status : true , paired_status : false }} ,  { upsert: false } )
      await Register_device.findOneAndUpdate({ip_address_ : partner_ip} , {$set: {active_status : false , paired_status : false}} ,  { upsert: false } )

      res.status(201).json({ message : "updated_successfully"});
    }
    catch(error) {
      res.status(404).json({ message : `${error}`});
    }
  
});


// if a node is paired to another node
router.post("/pair", async (req,res)=>{
   
  try {
    
    const node_1_ip = req.body.node_1_ip;
    const node_2_ip = req.body.node_2_ip;

    console.log("THE IPADDRESS IS ::"+node_1_ip+" && "+node_2_ip);

    await Register_device.findOneAndUpdate({ip_address_ : node_1_ip} , { $set: { active_status : true , paired_status : true }},  { upsert: false } )
    await Register_device.findOneAndUpdate({ ip_address_ : node_2_ip } , {$set: { active_status : true , paired_status : true}},  { upsert: false } )
  
    res.status(201).json({message : "updated_successfully"});

  } 
  catch (error) {
    res.status(404).json({ message : `${error}`})
  }

});


// update the payload status
router.post("/update_payload", async (req,res)=>{ 

  try {
    const ip_ = req.body.ip_;
    const payload = req.body.payload_status;

    await Register_device.findOneAndUpdate({ ip_address_ : ip_} , {$set: { payload : payload }} ,  { upsert: false } );

    res.status(201).json({message : "updated_successfully"});
  }
  catch (error) {
    res.status(404).json({ message : `${error}`})
  }

})


// get_request for partner node
router.post("/get_new_node", async (req, res)=>{

  try {

    const available_node_ = await Register_device.findOne({ active_status : true , paired_status : false , payload : false })  
    res.status(201).json({message : `${available_node_}`})
  }
  catch (error) {
    res.status(404).json({ message : `${error}`})
  }

});


module.exports = router;
// db.myCollection.updateMany({}, { $set: { newField: 'someValue' } })
