var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');

// var app = express()

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(global.messageList);
  var uuid = req.cookies.uuid;
  if (!uuid) {
    uuid = uuidv4();
    res.cookie('uuid', uuid);
  }
  var messageList = [];
  var hasReadList = global.hasReadList[uuid];
  if (!hasReadList) {
    hasReadList = [];
  }
  global.messageList.forEach((item) => {
    if (hasReadList.indexOf(item.id) === -1) {
      item.hasRead = false;
    } else {
      item.hasRead = true;
    }
    messageList.push(item);
  })

  res.render('index', {
    uuid,
    title: 'Socket.IO chat',
    msgList: messageList,
    msgListJson: JSON.stringify(messageList)
  });
});

module.exports = router;
