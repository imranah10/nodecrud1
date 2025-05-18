
import User from '../models/User.Model.js';

// Creating user
const Create = async (req, res) => {
    try {
        const UserData = new User(req.body);
        const Saveddata = await UserData.save();
        res.status(200).json({ success: true, message: 'User created Successfully', data: Saveddata });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ message: 'Error Occurred', error: error.message });
    }
};

// fetching all users
const getAll=async(req,res)=>{
    try {
        const ExistUsers=await User.find()
        if(!ExistUsers){
            res.status(404).json({success:false, message:'No Users Found'})
        }
        res.status(200).json({success:true, message:'Users Found', data:ExistUsers})
        
    } catch (error) {
        res.status(500).json({ message: 'Error Occurred', error });
        
    }
}
// fetching single/particular user 
const singleOne=async(req,res)=>{
    try {
        const {id}=req.params;
        const ExistUser=await User.findById(id)
        if(!ExistUser){
            res.status(404).json({success:false, message:'User Not Found'})
        }
        res.status(200).json({success:true, message:'User Found', data:ExistUser})
    } catch (error) {
        res.status(500).json({ message: 'Error Occurred', error });
        
    }
}
// updating users 
const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const ExistUser=await User.findByIdAndUpdate(id,req.body,{new:true})
        if(!ExistUser){
            res.status(404).json({success:false, message:'User Not Found'})
        }
        res.status(200).json({success:true, message:'User Updated Successfully', data:ExistUser})
    } catch (error) {
        res.status(500).json({ message: 'Error Occurred', error });
        
    }
}



// deleting users
const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const ExistUser = await User.findByIdAndDelete(id);

        if (!ExistUser) {
            return res.status(404).json({ success: false, message: 'User Not Found' });
        }

        res.status(200).json({ success: true, message: 'User Deleted Successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error Occurred', error });
    }
};


export { Create ,getAll,singleOne,update,deleteOne};
