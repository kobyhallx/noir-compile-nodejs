import test from 'ava';

import { initialiseResolver } from "@noir-lang/noir-source-resolver";
import { init_log_level, compile } from '@noir-lang/noir_wasm';

import fs from "fs";

const MAIN_NR_PATH = "circuits/main.nr";
const CONTRACT_NR_PATH = "circuits/contract.nr";

// init_log_level("debug");

test('It compiles noir Program code with default nodejs initializer, receiving circuit bytes and abi object.', t => {

    try {
        const compiled_noir = compile(
            {
                entry_point: MAIN_NR_PATH,
                contracts: false,
            }
        );
        t.truthy(compiled_noir.circuit, "Expected circuite attribute.");
        t.truthy(compiled_noir.abi, "Expected abi attribute.");
    } catch (err) {
        t.fail(`Compile throws error: ${err}`);
    }

});

test('It compiles noir program code, receiving circuit bytes and abi object.', t => {

    initialiseResolver((source_id) => {
        try {
            const string =
                fs.readFileSync(MAIN_NR_PATH, { encoding: "utf8" });
            ;
            return string;
        } catch (err) {
            console.error(err);
            throw err;
        }
    });

    const compiled_noir = compile();

    t.truthy(compiled_noir.circuit, "Expected circuite attribute.");
    t.truthy(compiled_noir.abi, "Expected abi attribute.");

});

test('It compiles noir contract code, receiving circuit bytes and abi object.', t => {

    initialiseResolver((source_id) => {
        try {
            const string =
                fs.readFileSync(CONTRACT_NR_PATH, { encoding: "utf8" });
            ;
            return string;
        } catch (err) {
            console.error(err);
            throw err;
        }
    });

    const compiled_noir = compile(
        {
            contracts: true,
        }
    );

    t.is(compiled_noir[0][0], "Foo-main");
    t.truthy(compiled_noir[0][1].circuit, "Expected circuite attribute.");
    t.truthy(compiled_noir[0][1].abi, "Expected abi attribute.");
});
