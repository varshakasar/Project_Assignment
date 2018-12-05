var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var projectSchema = require('../schema/projectSchema.js');
var projectGroupSchema = require('../schema/projectGroupSchema.js');
var serverSchema = require('../schema/serverSchema.js');
var userSchema = require('../schema/userSchema.js');

var Server = mongoose.model('server', serverSchema);
var Project = mongoose.model('project', projectSchema);
var projectGroup = mongoose.model('projectgroup', projectGroupSchema);
var User = mongoose.model('user', userSchema);



router.get('/Project', function(req, res, next) {

  //res.send('In getting all project route');
  try{
    Project.find({}).exec(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send(data);
    }
  })
  }
  catch(e){
    //console.log(e);
    next(e);
  }
})

router.post('/Project', function(req, res, next) {


  //res.send('In new project route');
  var name = req.body.name;
  var url = req.body.url;

  var projObject = new Project({
    name: name,
    url: url
  });
  try{
    projObject.save(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send('Save successfully');
    }
  })
  }
  catch(e){
    next(e);
  }

})

router.put('/Project/:id', function(req, res, next) {

  //res.send('In update project route');

  var pid = req.params.id;
  var pname = req.body.name;
  var purl = req.body.url;

  var obj = {
    name:pname,
    url: purl
  };

  var query = {
    $set: obj
  };
  try{
    Project.findOneAndUpdate({
      _id: pid
    },
    query,
    function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send('Updation done successfully');
      }
    });
  }
  catch(e){
    next(e);
  }

})

router.delete('/Project/:id', function(req, res, next) {

  //res.send('In delete project route');
  var pid = req.params.id;
  try{
    Project.findOneAndDelete({
      _id: pid
    },
    function(err, data) {
      if (err) {
        throw new Error();
       } else {
        res.send('Deletion done successfully');
      }
    })
  }
  catch(e){
    next(e);
  }

})

router.get('/ProjectGroup',function(req, res, next){

  //res.send('In getting all project Group route');
  try{
    projectGroup.find({}).exec(function(err,data){
    if(err){
      throw new Error();
      }
    else{
      res.send(data);
    }
  })
  }
  catch(e){
    next(e);
  }

})

router.post('/ProjectGroup', function(req, res, next) {

  //res.send('In new project group route');

  var name = req.body.name;
    var projgrpObject = new projectGroup({
    name: name
    });
    try{
        projgrpObject.save(function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send('Save successfully');
        }
        })
    }
    catch(e){
      next(e);
    }

})

router.put('/ProjectGroup/:id', function(req, res, next) {

  //res.send('In update project group route');

  var pgid = req.params.id;
  var pgname = req.body.name;


  var obj = {
    name:pgname,
   };

  var query = {
    $set: obj
  };
  try{
    projectGroup.findOneAndUpdate({
      _id: pgid
    },
    query,
    function(err, data) {
      if (err) {
        throw new Error();
       } else {
        res.send('Updation done successfully');
      }
    });
  }
  catch(e){
    next(e);
  }
})

router.delete('/ProjectGroup/:id', function(req, res, next) {

  //res.send('In delete project group route');
  var pgid = req.params.id;
  try{
    projectGroup.findOneAndDelete({
      _id: pgid
    },
    function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send('Deletion done successfully');
      }
    })
  }
  catch(e){
    next(e);
  }

})

router.get('/Server', function(req, res, next) {
  //res.send('In getting all server route');
  try{
    Server.find({}).exec(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send(data);
    }
  })
  }
  catch(e){
    next(e);
  }

})

router.get('/PopulateByProject', function(req, res, next) {
  try{
    Server.find({})
    .populate('project')
    .exec(function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send(data);
      }
    })
  }
  catch(e){
    next(e);
  }

})

router.get('/PopulateByProjectGroup', function(req, res, next) {
  try{
    Server.find({})
    .populate('group')
    .exec(function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send(data);
      }
    })
  }
  catch(e){
    next(e);
  }

})

router.get('/PopulateByProjectAndProjectGroup', function(req, res, next) {
  try{
    Server.find({})
    .populate('project')
    .populate('group')
    .exec(function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send(data);
      }
    })
  }
  catch(e){
    next(e);
  }

})

router.get('/ServerListByProject', function(req, res, next) {
  try{
    Server.aggregate([{
    $group: {
      _id: '$project',
      'Server Name': {
        '$push': '$name'
      },
      count: {
        $sum: 1
      }
    }
  }], function(err, result) {
    if (err) {
      throw new Error();
     } else {
      res.send(result);
    }
  })
  }
  catch(e){
    next(e);
  }

})
router.get('/ServerListByProjectGroup', function(req, res, next) {
  try{
    Server.aggregate([{
    $group: {
      _id: '$project',
      'Server Name': {
        '$push': '$name'
      },
      count: {
        $sum: 1
      }
    }
  }], function(err, result) {
    if (err) {
      throw new Error();
      } else {
      res.send(result);
    }
  })
  }
  catch(e){
    next(e);
  }
})
router.get('/ServersByProjectAndProjectGroup', function(req, res, next) {
  try{
    Server.aggregate([{
    $group: {
      _id: {
        'project': '$project',
        'group': '$group'
      },
      ServerName: {
        '$push': '$name'
      },
      count: {
        $sum: 1
      }
    }
  }], function(err, result) {
    if (err) {
      throw new Error();
      } else {
      res.send(result);
    }
  })
  }
  catch(e){
    next(e);
  }

})
router.post('/Server', function(req, res, next) {
  //res.send('In new server route');
  var sname = req.body.name;
  var sip = req.body.ip;
  var stype = req.body.type;
  var projectId = req.body.projectId;
  var projectGroupId = req.body.projectGroupId;
  var sgiturl = req.body.giturl;
  var serverObject = new Server({
    name: sname,
    ip: sip,
    type: stype,
    project: projectId,
    group: projectGroupId,
    giturl: sgiturl
  });
  try{
    serverObject.save(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send(data);
      }
  })
  }
  catch(e)
  {
    next(e);
  }

})
router.put('/Server/:id', function(req, res, next) {
  //res.send('In update server route');
  var serverid = req.params.id;
  var servername = req.body.name;
  var serverip = req.body.ip;
  var servertype = req.body.type;
  var serverproject = req.body.project;
  var servergroup = req.body.group;
  var servergiturl = req.body.giturl;
  var obj = {
    name: servername,
    ip: serverip,
    type: servertype,
    project: serverproject,
    group: servergroup,
    giturl: servergiturl
  };
  var query = {
    $set: obj
  };
  try{
    Server.findOneAndUpdate({
      _id: serverid
    },
    query,
    function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send('Updation done successfully');
      }
    });
  }
  catch(e)
  {
    next(e);
  }

})
router.delete('/Server/:id', function(req, res, next) {
  //res.send('In delete server route');
  var serverid = req.params.id;
  try{
    Server.findOneAndDelete({
      _id: serverid
    },
    function(err, data) {
      if (err) {
        throw new Error();
       } else {
        res.send('Deletion done successfully');
      }
    })
  }
  catch(e){
    next(e);
  }

})

router.get('/User',function(req, res, next){

  //res.send('In getting all user route');
  try{
    User.find({}).exec(function(err,data){
    if(err){
      throw new Error();
      }
    else{
      res.send(data);
    }
  })
  }
  catch(e){
    next(e);
  }

})

router.post('/User', function(req, res, next) {

  res.send('In new user route');
  //console.log(req.body);
  var name = req.body.name;
  var password = req.body.password;
  var allowedServer = req.body.allowedServer;
  var publicKeys = req.body.publicKeys;

  var userObject = new User({
    name: name,
    password:password,
    allowedServer:allowedServer,
    publicKeys:publicKeys
  });
  try{
    userObject.save(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send('Save successfully');
    }
  })
  }
  catch(e){
    next(e);
  }

})

router.put('/User/:id', function(req, res, next) {

  //res.send('In update user route');

  var uid = req.params.id;
  var uname = req.body.name;
  var upassword = req.body.password;
  var uallowedServer = req.body.allowedServer;
  var upublicKeys = req.body.publicKeys;

  var obj = {
    name:uname,
    password: upassword,
    allowedServer:uallowedServer,
    publicKeys:upublicKeys
  };

  var query = {
    $set: obj
  };
  try{
    User.findOneAndUpdate({
      _id: uid
    },
    query,
    function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send('Updation done successfully');
      }
    });
  }
  catch(e){
    next(e);
  }
})

router.delete('/User/:id', function(req, res, next) {

  //res.send('In delete user route');
  var uid = req.params.id;
  try{
    User.findOneAndDelete({
      _id: uid
    },
    function(err, data) {
      if (err) {
        throw new Error();
       } else {
        res.send('Deletion done successfully');
      }
    })
  }
  catch(e){
    next(e);
  }

})


module.exports = router;