uploadFile = function( profile, file, func ){
  Meteor.call("requestUpload", profile, file.type, function(err, resp) {
    if (!err) {
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', resp.surl, true);
      xhr.setRequestHeader("Content-Type",file.type);
      xhr.setRequestHeader("Cache-Control","max-age=" + 3600*24*365);
      xhr.send(file);
     
      funcWrapper = function(){
        func(resp);
      }

      //TODO fix this crappy hack
      setTimeout(funcWrapper, 1000);
    } else {
      console.log(err);
    }
  })
}

