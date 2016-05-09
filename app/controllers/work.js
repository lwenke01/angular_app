app.controller('WorkController', function (DataService){
     DataService.getAllWork()
     .then((result)=>{
       this.jobs = result.data;
     });
});
