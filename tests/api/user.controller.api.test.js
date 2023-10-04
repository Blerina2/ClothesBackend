// https://dev.to/ali_adeku/guide-to-writing-integration-tests-in-express-js-with-jest-and-supertest-1059

const userDataMock = require('../mocks/user.data.mock');
const request = require('supertest');
const clothes_server = require('../../server');

describe("Testing User CRUD", () => {
    test("(create, read, update, delete)", async () => {

        let userDTO = userDataMock.createRequestBody();

        let response = await request(clothes_server)
            .post("/user/signup")
            .set("content-type", "application/json")
            .set("authorization", "application/json")
            .send(userDTO);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message.firstname).toBe("user.converter.tests.js");

        response = await request(clothes_server)
            .get("/user/signin")
            .auth(userDTO.email, userDTO.password);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        let token = response.body.message;
        response = await request(clothes_server)
            .get("/user/profile")
            .set("Authorization", "Bearer " + token);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message.birthday).toBe("17/02/2008");

        userDTO.firstname = "Updating process";
        let userID = response.body.message.id;
        response = await request(clothes_server)
            .put("/user/byId/" + userID)
            .auth(userDTO.email, userDTO.password)
            .set("content-type", "application/json")
            .send(userDTO);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        userDTO.id = userID
        response = await request(clothes_server)
            .put(("/user/byId/" + userID))
            .auth(userDTO.email, userDTO.password)
            .set("content-type", "application/json")
            .send(userDTO);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message.firstname).toBe("Updating process");
        expect(response.body.message.id).toBe(userID);

        response = await request(clothes_server)
            .get("/user/byId/" + userID)
            .set("Authorization", "Bearer " + token);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message.firstname).toBe("Updating process");

        response = await request(clothes_server)
            .get("/user/logout")
            .set("Authorization", "Bearer " + token);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Logged out");


        response = await request(clothes_server)
            .delete("/user/byId/" + userID)
            .set("Authorization", "Bearer " + token);

        expect(response.status).toBe(204);

        response = await request(clothes_server)
            .get("/user/profile")
            .set("Authorization", "Bearer " + token)
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("You must provide your credentials (token or user with password) to access the resource");

    });

    afterAll(async () => {
        clothes_server.close();
    });
});