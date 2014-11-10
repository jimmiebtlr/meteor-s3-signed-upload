uploadFiles = function( profile, files, func ){
  // Build map for name -> file lookup
  var fileMap = {};
  _.each( files, function(file ){
    fileMap[ file.name ] = file;
  });

  var fileObjs = _.map( files, function( file ){
    return {
      type: file.type,
      name: file.name,
      size: file.size
    };
  });
  Meteor.call("requestUploads", profile, fileObjs, function(err, resp) {
    console.log( resp );
    if( !err ){
      _.each( resp.files, function( file ){
        if( !file.error ){
          var xhr = new XMLHttpRequest();
          xhr.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 ) {
              func( file );
            }
          });                    
          xhr.open('PUT', file.surl, true);
          xhr.setRequestHeader("Content-Type",fileMap[file.name].type);
          xhr.setRequestHeader("Cache-Control","max-age=" + 3600*24*365);
          xhr.send(fileMap[file.name]);
 
        }else{
          console.log( err );
        }
      });
    }else{
      console.log( err );
    }
  });
}

