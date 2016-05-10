// app.controller('ResumeController', ['$http','$window','AuthService', 'ErrorService', '$location', function($http,$window, AuthService,  ErrorService, $location){
//   const resumeRoute = 'http://localhost:3000/resumes';
//   const mainRoute = 'http://localhost:3000';
//   const vm = this;
//   vm.resumes = [{name: 'Create New Resume'}];
//   vm.error = ErrorService();
//   console.log(vm.error);
//
//
//
//   vm.getResumes = function(){
//     var tokenFromLocalStorage = $window.localStorage.token;
//     console.log('localStorage?? ' + $window.localStorage.token);
//     $http.get(resumeRoute, {
//       headers: {
//         token: AuthService.getToken()
//       }
//     })
//     .then(function(result){
//       vm.error = ErrorService(null);
//       console.log(result);
//       console.log(result.data);
//       vm.resumes = result.data;
//     }, (err)=>{
//       vm.error = ErrorService('Please Sign in');
//       $location.path('/signup');
//     });
//   };
//   vm.createResume = function(resume){
//     $http.post(resumeRoute, resume,{
//       headers: {
//         token: AuthService.getToken()
//       }
//     })
//     .then(function(res){
//       console.log(res);
//       vm.resumes.push(res.data);
//       vm.newResume = null;
//     });
//   };
//   vm.removeResume = function(resume){
//     $http.delete(resumeRoute + '/' + resume._id, {
//       headers: {
//         token: AuthService.getToken(),
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(function(res){
//       vm.resumes = vm.resumes.filter((p)=> p._id != resume._id);
//     });
//   };
//   vm.updateResume = function(resume){
//     $http.put(resumeRoute + '/' + resume._id, resume, {
//       headers: {
//         token: AuthService.getToken(),
//         'Content-Type': 'application/json'
//       },
//       data: {
//         name: resume.name,
//         description: resume.description,
//         created: resume.created,
//         course: resume.course
//       }
//     })
//     .then((res)=>{
//       resume.editing = false;
//     }, (err)=> console.log(err));
//   };
//   vm.toggleForm = function(resume){
//     if(!resume.editing){
//       resume.backupName = resume.name;
//       resume.editing = true;
//     } else {
//       resume.name = resume.backupName;
//       resume.editing = false;
//     }
//   }
// }]);
