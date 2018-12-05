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


  Project.find({}).exec(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send(data);
    }
  })
})

router.post('/Project', function(req, res, next) {


  //res.send('In new project route');
  var name = req.body.name;
  var url = req.body.url;

  var projObject = new Project({
    name: name,
    url: url
  });

  projObject.save(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send('Save successfully');
    }
  })
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
})

router.delete('/Project/:id', function(req, res, next) {

  //res.send('In delete project route');
  var pid = req.params.id;
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
})

router.get('/ProjectGroup',function(req, res, next){

  //res.send('In getting all project Group route');

  projectGroup.find({}).exec(function(err,data){
    if(err){
      throw new Error();
      }
    else{
      res.send(data);
    }
  })
})

router.post('/ProjectGroup', function(req, res, next) {

  //res.send('In new project group route');

  var name = req.body.name;
    var projgrpObject = new projectGroup({
    name: name
    });

  projgrpObject.save(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send('Save successfully');
    }
  })
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
})

router.delete('/ProjectGroup/:id', function(req, res, next) {

  //res.send('In delete project group route');
  var pgid = req.params.id;
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
})

router.get('/Server', function(req, res, next) {
  //res.send('In getting all server route');
  Server.find({}).exec(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send(data);
    }
  })
})

router.get('/PopulateByProject', function(req, res, next) {
  Server.find({})
    .populate('project')
    .exec(function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send(data);
      }
    })
})

router.get('/PopulateByProjectGroup', function(req, res, next) {
  Server.find({})
    .populate('group')
    .exec(function(err, data) {
      if (err) {
        throw new Error();
        } else {
        res.send(data);
      }
    })
})

router.get('/PopulateByProjectAndProjectGroup', function(req, res, next) {
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
})

router.get('/ServerListByProject', function(req, res, next) {
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
})
router.get('/ServerListByProjectGroup', function(req, res, next) {
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
})
router.get('/ServersByProjectAndProjectGroup', function(req, res, next) {
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
  serverObject.save(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send(data);
      }
  })
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
})
router.delete('/Server/:id', function(req, res, next) {
  //res.send('In delete server route');
  var serverid = req.params.id;
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
})

router.get('/User',function(req, res, next){

  //res.send('In getting all user route');

  User.find({}).exec(function(err,data){
    if(err){
      throw new Error();
      }
    else{
      res.send(data);
    }
  })
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

  userObject.save(function(err, data) {
    if (err) {
      throw new Error();
      } else {
      res.send('Save successfully');
    }
  })
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
})

router.delete('/User/:id', function(req, res, next) {

  //res.send('In delete user route');
  var uid = req.params.id;
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
})


module.exports = router;