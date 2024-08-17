const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@description : Get all contacts
//@route :GET /api/contacts/
//@acess :public 
const getContacts =asyncHandler( async (req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json({contacts});
});

//@description : Create contact
//@route :POST /api/contacts/
//@acess :public 
const createContacts =asyncHandler(async (req,res)=>{
    console.log("The request body :",req.body);
    const {name,email,phone} = req.body
    if(!name ||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandetory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(200).json(contact)
})

//@description : get a contact
//@route :GET /api/contacts/:id
//@acess :public 
const getContact =asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
})

//@description : update a contact
//@route :PUT /api/contacts/:id
//@acess :public 
const updateContact =asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    const UpdatedContact = await Contact.findById(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(UpdatedContact)
})

//@description : delete a contact
//@route :DELETE /api/contacts/:id
//@acess :public 
const deleteContact =asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    await Contact.deleteOne();
    res.status(200).json(contact)
})

module.exports ={getContacts,createContacts,getContact,updateContact,deleteContact};