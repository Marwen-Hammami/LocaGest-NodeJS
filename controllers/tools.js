import Tool from '../models/Tools.js';


export async function addTool(req, res)  {

    try {
      const { name, stock, price, marque, type, image} = req.body;
      if (!name || !stock || !price || !marque || !type || !image) {
        return res.status(400).json({ statue: false, msg: "Entrer tous les champs" });
      }
      const newTool = new Tool({
        name,
        stock,
        price, 
        marque,
        email,
        type, 
        image
      });
      await newTool.save();
      res.json({ msg: "Tools envoyé avec succées." });
    }
    catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  };
  export async function getAllTools (req, res)  {
   
    try {
      const tool = await Tool.findOne()
      if (!tool) {
        return res.status(400).json({ msg: "Tools not Found." });
      }
      const tools = await Tool.find().exec();
        res.json({tools: tools, result: tools })
    } 
    catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  
  };
  export async function getToolById (req, res) {

    try {
      const tools = await Tool.findOne({_id: req.params.tools_id}).exec();
        res.json({tools, result: tools })
    } catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  };

  export async function deleteTool (req, res) {
    try{
      await Tool.findByIdAndDelete({ _id: req.params.tools_id });
      res.json({ msg: "Tools is Deleted" });
    
   }  catch (err) {
      
        return res.status(400).send("Erreur : " + err + " ,  essayer de nouveau");
      }
  };

 
  
