// 'use strict';
//
// module.exports = function(app){
//   app.controller('ProjectController', ['$http','AuthService', '$location', function($http, AuthService, $location){
//     const projectRoute = 'http://localhost:3000/projects';
//     this.projects = ['projects']
//
//
//     this.getProject = function(){
//       $http.get(projectRoute, {
//         headers: {
//           token: AuthService.getToken()
//         }
//       })
//       .then(function(result){
//         this.projects = result.data;
//       }, (err)=>{
//         return err;
//         $location.path('/signup');
//       });
//     };
//     this.createProject = function(project){
//       $http.post(projectRoute, project, {
//         headers: {
//           token: AuthService.getToken()
//         }
//       })
//       .then(function(res){
//         console.log(res);
//         this.projects.push(res.data);
//         this.newProject = null;
//       });
//     };
//     this.removeProject = function(project){
//       $http.delete(projectRoute + '/' + project._id, {
//         headers: {
//           token: AuthService.getToken()
//         }
//       })
//       .then(function(res){
//         this.projects = this.projects.filter((p)=> p._id != project._id);
//       });
//     };
//     this.updateProject = function(project){
//       $http.put(projectRoute + '/' + project._id, project, {
//         headers: {
//           token: AuthService.getToken()
//         }
//       })
//       .then((res)=>{
//         project.editing = false;
//       }, (err)=> console.log(err));
//     };
//     this.toggleForm = function(project){
//       if(!project.editing){
//         project.backupName = project.name;
//         project.editing = true;
//       } else {
//         project.name = project.backupName;
//         project.editing = false;
//       }
//     }
// }]);
//
// };
