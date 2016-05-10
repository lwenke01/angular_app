'use strict';

require('../app/index.js');
const angular = require('angular');
require('angular-mocks');

describe('test for all projects', ()=>{
  var ProjectController;
  beforeEach(angular.mock.module('myApp'))
  beforeEach(angular.mock.inject(function($controller){
    ProjectController = $controller('ProjectController');
  }));
  it('should construct a controller', () => {
    expect(typeof ProjectController).toBe('object');
    expect(typeof ProjectController.projects[0]).toBe('object');
    expect(typeof ProjectController.getProjects).toBe('function');
  });
  describe('CRUD tests', ()=>{
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
    }));
    afterEach(()=>{
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
    it('should get all projects', ()=>{
      $httpBackend.expectGET('http://localhost:3000/projects')
       .respond(200, {projects: [{name: 'Hey', description: 'thisistest', created: '5/2/16', course: '410'}]});
       ProjectController.getProjects();
       $httpBackend.flush();
       console.log(ProjectController.projects);
      //  expect(ProjectController.projects.length).toBeGreaterThan(0);
       expect(ProjectController.projects[0].name).toBe('Hey');
       expect(ProjectController.projects[0].description).toBe('thisistest');
       expect(ProjectController.projects[0].created).toBe('5/2/16');
       expect(ProjectController.projects[0].course).toBe('410');

    });
    it('post a new project', ()=>{
      $httpBackend.expectPOST('http://localhost:3000/projects', {name: 'Hey', description: 'thisistest', created: '5/2/16', course: '410'})
      .respond(200, {name: 'Hey', description: 'thisistest', created: '5/2/16', course: '410'});
      ProjectController.createProject({name: 'Hey', description: 'thisistest', created: '5/2/16', course: '410'});
      $httpBackend.flush();
      console.log(ProjectController.projects);
      expect(ProjectController.projects.length).toBeGreaterThan(0);

    });
    it('should delete a project', ()=>{
      $httpBackend.expectDelete('http://localhost:3000/projects/6')
      .respond(200, {msg: 'project removed'});
      ProjectController.projects.push({name: 'Hey', description: 'thisistest', created: '5/2/16', course: '410', _id: 6});
      ProjectController.removeProject({name: 'Hey', description: 'thisistest', created: '5/2/16', course: '410', _id: 6});
      $httpBackend.flush();
      expect(ProjectController.projects.length).toBe(1);
      expect(ProjectController.projects.every((p)=> p._id !=6)).toBe(true);
    });
  });

});
