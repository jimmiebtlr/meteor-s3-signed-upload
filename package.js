Package.describe({
  summary: "S3 signed uploads for meteorjs.",
  version: "0.0.1",
  git: "https://github.com/jimmiebtlr/s3-signed-upload.git"
});

Package.on_use(function(api){
  api.use(['mrt:aws-sdk'], 'server');
  api.use(['aldeed:simple-schema']);
  api.export(['uploadFile'],'client');
  api.export(['S3SignedUploadTmp'],'server');

  api.add_files([
    'client.js'
  ], 'client');

  api.add_files([
    'server.js'
  ], 'server');
});
