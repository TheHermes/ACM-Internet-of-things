var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var Door = require('../../models/doors');
describe('Doors Model Test', function(){
    var new_door;
    before(function(done){
        mongoose.connect('mongodb://localhost/acmiot_test');
        done()
    });
    beforeEach(function(done){
        new_door = new Door.model({id: 1, ip: "123.123.123.123" });
        new_door.save(function(){});
        done()
    });
    afterEach(function(done){
        Door.model.remove({}, function(){
            done()
        });
    });

    describe('Get Object From Model', function(){
        describe('On success', function(){

            it('Should find one object with success', function(done){
                Door.model.find({id: 1}, function(err, q){
                    q.length.should.equal(1)
                    q[0].ip.should.equal(new_door.ip);
                    done();
                })
            });

            it('Should not find anything', function(done){
                Door.model.find({id: 3}, function(err, q){
                    q.length.should.equal(0)
                    done();
                })
            });

        });
    });
});