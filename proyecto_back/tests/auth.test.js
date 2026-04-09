import { describe, test,expect, vi} from "vitest";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken"
import  request  from "supertest";

vi.mock("../src/repositories/userRepository",()=>({
    createUser : vi.fn(),
    getUserByEmail: vi.fn()
}))

import app from "../src/app";
import { env } from "../src/config/env"; 
import { createUser, getUserByEmail } from "../src/repositories/userRepository";

describe("Auth api", ()=>{

    test("Registrar a un usuario y devuelve un token", async()=>{
        getUserByEmail.mockResolvedValue(null);
        createUser.mockResolvedValue({
            name: "MAria",
            email: "maria@gmail", 
            password_hash: "hhklasdfghjk"
        });
        const response = await request(app)
        .post("/api/auth/register")
        .send({
            name: "MAria",
            email: "maria@gmail", 
            password: "hhklasdfghjk"
        })
        expect(response.status).toBe(201)
        //expect(response.body.token).toBeTruthy()
        expect(response.body).toHaveProperty("token")
        expect(response.body.user.email).toBe("maria@gmail")
    })
})