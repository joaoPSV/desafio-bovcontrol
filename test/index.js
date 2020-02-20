const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../routes/animals');
const models = require('../models/animals');

chai.use(chaiHttp);
chai.should();

describe('Animals', () => {
    describe("GET /v1/animals/:id", () => {
        it("Get an existing animal", (done) => {
            const id = '5e4e9553734ae947c5702950';
            chai.request(app)
                .get(`/v1/animals/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(id);
                    res.body.should.have.property('age');
                    res.body.should.have.property('name');
                    res.body.should.have.property('weight');
                    res.body.should.have.property('type');
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Try to get a nonexistent animal", (done) => {
            const id = '5e4da4ca221bfa228cbb3111';
            chai.request(app)
                .get(`/v1/animals/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        })

        it("Try to get an animal with an invalid id", (done) => {
            const id = '5e4da4ca221bfa228cb';
            chai.request(app)
                .get(`/v1/animals/${id}`)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("POST /v1/animals", () => {
        it("Create an animal", (done) => {
            const data = {
                name: "Galinha 72",
                type: "CHICKEN",
                age: 2,
                weight: 0.8
            };
            chai.request(app)
                .post(`/v1/animals`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('id')
                    res.body.should.have.property('age');
                    res.body.should.have.property('name');
                    res.body.should.have.property('weight');
                    res.body.should.have.property('type');
                    res.body.should.be.a('object');
                    models.remove(res.body.id);
                    done();
                });
            
        });

        it("Try to create with a invalid param", (done) => {
            const data = {
                name: "Vaca02",
                type: "COW",
                age: "VACA",
                weight: 58
            };
            chai.request(app)
                .post(`/v1/animals`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Try to create with a empty param", (done) => {
            const data = {
                name: "Vaca02",
                type: "COW",
                age: null,
                weight: 58
            };
            chai.request(app)
                .post(`/v1/animals`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Try to create with a nonexisting param", (done) => {
            const data = {
                name: "Vaca02",
                type: "COW",
                age: 18,
                weight: 58,
                test: 123
            };
            chai.request(app)
                .post(`/v1/animals`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Try to create missing a param", (done) => {
            const data = {
                name: "Vaca02",
                type: "COW",
                age: 18,
            };
            chai.request(app)
                .post(`/v1/animals`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("PUT /v1/animals/:id", () => {
        it("Update an existing animal", (done) => {
            const id = '5e4e9553734ae947c5702950';
            const data = {
                age: 19,
            };
            chai.request(app)
                .put(`/v1/animals/${id}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(id);
                    res.body.should.have.property('age');
                    res.body.should.have.property('name');
                    res.body.should.have.property('weight');
                    res.body.should.have.property('type');
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Try to update an nonexistent animal", (done) => {
            const id = '5e4da4ca221bfa228cbb3660';
            const data = {
                name: 'Vaca02',
            };
            chai.request(app)
                .put(`/v1/animals/${id}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Try to update with a invalid param", (done) => {
            const id = '5e4e9553734ae947c5702950';
            const data = {
                age: 'Vaca',
            };
            chai.request(app)
                .put(`/v1/animals/${id}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Try to update with a empty param", (done) => {
            const id = '5e4e9553734ae947c5702950';
            const data = {
                age: null,
                name: "TESTE"
            };
            chai.request(app)
                .put(`/v1/animals/${id}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Try to update with a nonexisting param", (done) => {
            const id = '5e4e9553734ae947c5702950';
            const data = {
                test: 123
            };
            chai.request(app)
                .put(`/v1/animals/${id}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
