import NotesModel from "../models/Notes.js";


const CreateNotes=async(req,res)=>{
    try {
        const userId=req.userId
        const {title,description}=req.body;
        if(!title){
            return res.status(303).json({success:false,message:"Title are required"})
        }
        const CreateNotes= new NotesModel({
            title,description,userId:userId
        })
        await CreateNotes.save()
        res.status(200).json({success:true,message:"Notes created Successfully",Notes:CreateNotes})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})

    }
}
const UpdateNotes=async(req,res)=>{
    try {
        const userId=req.userId
        const NotesId=req.params.id
        const {title,description}=req.body // Add description here
        const FindeNotes= await NotesModel.findById({_id:NotesId})
        if (!FindeNotes) {
        res.status(404).json({success:false,message:"Notes not Found",})
            
        }
      const NotesUserId=FindeNotes.userId.toString()
      
      if (userId.toString() !== NotesUserId) {
       return res.status(404).json({success:false,message:"Unauthorized user",})
        
      }
      console.log("NotesUserId",NotesUserId)
 
        const UpdateNotes= await NotesModel.findByIdAndUpdate(
            {_id:NotesId},
            {title,description},{new:true} 
        )
        console.log(FindeNotes)
        res.status(200).json({success:true,message:"Notes Updates Successfully",UpdateNotes})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})
    }
}
const Delete=async(req,res)=>{
    try {
        const userId=req.userId
        const NotesId=req.params.id
        const FindeNotes=await NotesModel.findById(NotesId)

        if (userId.toString() !== FindeNotes.userId.toString()) {
       return res.status(404).json({success:false,message:"Unauthorized user",})
            
        }
        const Delete=await NotesModel.findByIdAndDelete(NotesId)


              res.status(200).json({success:true,message:"Notes Deleted Successfully",Delete})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})
    }
}
const GetNotes=async(req,res)=>{
    try {
        const userId=req.userId
        
        const Notes=await NotesModel.find({userId})


        res.status(200).json({success:true,Notes})
    } catch (error) {
        console.error("Error in GetNotes controller:", error);
        return res.status(500).json({success:false,message:"Internal Server Error",error: error.message});
    }
}
export {CreateNotes,UpdateNotes,Delete,GetNotes}