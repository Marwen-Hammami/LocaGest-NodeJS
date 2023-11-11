import Distribution from '../models/Distribution.js';


export async function addDistribution (req, res) {

    try {
      const { typeRepair, pieces, cars, description, technicien, startDate,endDate,statusCar} = req.body;
      if (!typeRepair || !pieces || !cars || !description || !technicien || !startDate|| !endDate || !statusCar) {
        return res.status(400).json({ statue: false, msg: "Entrer tous les champs" });
      }
      const newDistribution = new Distribution({
        typeRepair,
        pieces,
        cars, 
        description,
        technicien,
        startDate, 
        endDate,
        statusCar
      });
      await newDistribution.save();
      res.json({ msg: "Distributions envoyé avec succées." });
    }
    catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  };
  export async function getAllDistributions (req, res)  {
   
    try {
      const distribution = await Distribution.findOne()
      if (!distribution) {
        return res.status(400).json({ msg: "Distributions not Found." });
      }
      const distributions = await Distribution.find().exec();
        res.json({distributions: distributions, result: distributions })
    } 
    catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  
  };
  export async function getDistributionById (req, res)  {

    try {
      const distributions = await Distribution.findOne({_id: req.params.distributions_id}).exec();
        res.json({distributions, result: distributions })
    } catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  };

  
  export async function deleteDistribution  (req, res)  {
    try{
      await Distribution.findByIdAndDelete({ _id: req.params.distributions_id });
      res.json({ msg: "Distribution is Deleted" });
    
   }  catch (err) {
      
        return res.status(400).send("Erreur : " + err + " ,  essayer de nouveau");
      }
  };

 
  
