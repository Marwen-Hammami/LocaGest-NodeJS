import Tool from '../models/Tools.js';


export async function addTool(req, res)  {

  let Image = ""
    if(req.file){
      Image = req.file.filename
      console.log("here")
      console.log(Image)
    }

    try {

      const { name, stock, price, marque, type } = req.params;
      const image = Image ;
      if (!name || !stock || !price || !marque || !type) {
        return res.status(400).json({ statue: false, msg: "Entrer tous les champs" });
      }
      const newTool = new Tool({
        name,
        stock,
        price, 
        marque,
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
      const tool = await Tool.find()
      if (!tool) {
        return res.status(400).json({ msg: "Tools not Found." });
      }
     
        res.json( tool )
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
      await Tool.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Tools is Deleted" });
    
   }  catch (err) {
      
        return res.status(400).send("Erreur : " + err + " ,  essayer de nouveau");
      }
  };

  export async function updatetool(req, res)  {
    
    Tool.findById(req.params.id)
    .then(Tool => {
      Tool.name = req.params.name;
      Tool.stock = req.params.stock;
      Tool.price = req.params.price;

      Tool.marque = req.params.marque;
      Tool.type = req.params.type; 
      
      
        
        if(req.file){
          Tool.image = req.file.filename
        }else {Tool.image = ""};   
       
        Tool.save() 
        .then(response => {
            res.status(200).json(Tool)
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        })    
    })
    .catch(err => res.status(400).json('Error: ' + err));  
    };
  
    
  export async function updatetoolNoimaga(req, res)  {
    
    Tool.findById(req.params.id)
    .then(Tool => {
      Tool.name = req.params.name;
      Tool.stock = req.params.stock;
      Tool.price = req.params.price;

      Tool.marque = req.params.marque;
      Tool.type = req.params.type; 
      
      
        
         
       
        Tool.save() 
        .then(response => {
            res.status(200).json(Tool)
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        })    
    })
    .catch(err => res.status(400).json('Error: ' + err));  
    };