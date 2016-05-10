// module.exports = function(app){
// app.controller('ProjectController', ['$http','$window','AuthService', 'ErrorService', '$location', function($http,$window, AuthService,  ErrorService, $location){
//   const projectRoute = 'http://localhost:3000/projects';
//   const mainRoute = 'http://localhost:3000';
//   const vm = this;
//   vm.projects = [{name: 'Create New Project'}];
//   vm.error = ErrorService();
//   console.log(vm.error);
//
//
//
//   vm.getProjects = function(){
//     var tokenFromLocalStorage = $window.localStorage.token;
//     console.log('localStorage?? ' + $window.localStorage.token);
//     $http.get(projectRoute, {
//       headers: {
//         token: AuthService.getToken()
//       }
//     })
//     .then(function(result){
//       vm.error = ErrorService(null);
//       console.log(result);
//       console.log(result.data);
//       vm.projects = result.data;
//     }, (err)=>{
//       vm.error = ErrorService('Please Sign in');
//       $location.path('/signup');
//     });
//   };
//   vm.createProject = function(project){
//     $http.post(projectRoute, project,{
//       headers: {
//         token: AuthService.getToken()
//       }
//     })
//     .then(function(res){
//       console.log(res);
//       vm.projects.push(res.data);
//       vm.newProject = null;
//     });
//   };
//   vm.removeProject = function(project){
//     $http.delete(projectRoute + '/' + project._id, {
//       headers: {
//         token: AuthService.getToken(),
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(function(res){
//       vm.projects = vm.projects.filter((p)=> p._id != project._id);
//     });
//   };
//   vm.updateProject = function(project){
//     $http.put(projectRoute + '/' + project._id, project, {
//       headers: {
//         token: AuthService.getToken(),
//         'Content-Type': 'application/json'
//       },
//       data: {
//         name: project.name,
//         description: project.description,
//         created: project.created,
//         course: project.course
//       }
//     })
//     .then((res)=>{
//       project.editing = false;
//     }, (err)=> console.log(err));
//   };
//   vm.toggleForm = function(project){
//     if(!project.editing){
//       project.backupName = project.name;
//       project.editing = true;
//     } else {
//       project.name = project.backupName;
//       project.editing = false;
//     }
//   }
//   }]);
// };
