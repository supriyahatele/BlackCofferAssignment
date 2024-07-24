const { dataModel } = require("../models/dataModel");

  const getData=async (req, res) => {
    try {
        const data = await dataModel.find();
        if(data.length>0){
          return res.status(200).json(data); 
        }else{
          return res.status(200).json({"msg": "No data found"});
        }
      
    } catch (error) {
     return  res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
  module.exports ={getData}