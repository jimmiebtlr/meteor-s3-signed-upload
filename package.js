Package.describe({
  summary: "S3 signed uploads for meteorjs."
});

Package.on_use(function(api){
  api.use(['aws-sdk'], 'server');
  api.export(['uploadFile'],'client');

  api.add_files([
    'client.js'
  ], 'client');

  api.add_files([
    'server.js'
  ], 'server');
});
