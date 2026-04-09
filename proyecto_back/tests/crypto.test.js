import { describe, test,expect } from "vitest";
import { decryptText,encryptText } from "../src/utils/crypto";

describe("Crypto util tests", ()=>{
    test("encripta y desencripta bien", ()=>{
        const text = "necesito practicas"
        const encrypted = encryptText(text)
        const decryted = decryptText(encrypted)

        expect(encrypted).not.toBe(text)
        expect(decryted).toBe(text)
    })
})