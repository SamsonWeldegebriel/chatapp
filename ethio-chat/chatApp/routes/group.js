// var express = require('express');
// var router = express.Router();
// var mongoose =require('mongoose');
// var Group = require('../models/group')
 
// mongoose.connect('mongodb://s:s@ds215388.mlab.com:15388/mydatabase');

// //get all group
// router.get('/', (req, res, next) => {
//     console.log('Get All group');
//     Group.find({}).exec((err, groups)=> {
//        if(err){
//            res.send('Error Occured');
//        }else{
//         console.log(groups);
//            res.json(groups);
//            ;
//        }
//     })
// });

// //get one book by group name 

// router.get('/:groupname', (req, res, next) => {
//     console.log('getting One group');
//     Group.findOne({ gname: req.params.groupname }).exec((err, group)=> {
//        if(err){
//            res.send('Error Occured');
//        }else{
//         console.log(group);
//            res.json(group);
//            ;
//        }
//     });
// });

// //insert new group into the mongodb using mongoose

// router.post('/', (req, res) => {
//     console.log('add group');
//     var newGroup = new Group(req.body);
//     newGroup.save((err, newGroupToBeSave) => {
//        if(err){
//            res.json('error','error saving group');
//        }else{
//         console.log(newGroupToBeSave);
//            res.json(newGroupToBeSave);    
//        }
//     });
// });

// router.delete('/:groupname', (req, res, next) => {
//    Group.find({gname : req.params.groupname}).remove().exec(function(err, data) { 
//        if(err){
//            console.log('delete error')
//        }
//        console.log('Deleted')
//    });
// });

// // update group information
// router.put('/:groupname', (req, res, next) => {
//     Group.findOneAndUpdate({ name:req.params.groupname },
//         { $set : {gname: req.body.gname, description : req.body.description, photo : req.body.photo}},
//                {upsert : true}, 
//               function(err, updatedGroup)
//              {
//                    if(err) { 
//                       console.log('err');
//                    }    
//                       console.log(updatedGroup);
//                       res.json(updatedGroup);
                  
//             });
//         });

//    //get all user from  selected group              
//    router.get('/:groupname/users', (req, res, next) => {
//     console.log('getting all user from selected group');
//     Group.findOne({ gname: req.params.groupname }).exec((err, group)=> {
//        if(err){
//            res.send('Error Occured');
//        }else{
//         console.log(group.users);
//            res.json(group.users);
           
//        }
//     });
// });

// //user join group handler method
// router.put('/:groupname/join',(req, res, next) => {
   
//     Group.update({gname : req.params.groupname},
//                {$push : {users: { username: req.body.username, status : req.body.status } }},
//                {upsert: true},(err, joingroup) =>{
//                    if(err){
//                        console.log('error');
//                    }
//                    console.log(joingroup);
//                    res.json(joingroup);
//                 });
//             });
          



// //remove user from the group

// router.put('/:groupname/leave',(req, res, next) => {
   
//     Group.update({gname : req.params.groupname},
//                { $pop :{user: {username: req.body.username}}},
//                (err, joingroup) =>{
//                    if(err){
//                        console.log('error');
//                    }
//                    console.log(joingroup);
//                    res.json(joingroup);
//                 });
//             });

// module.exports = router;