---
title: Creating an pro! Project
slug: /getting-started/creating-an-pro-project
---

pro! is an [Embedded Domain Specific Language](https://wiki.haskell.org/Embedded_domain_specific_language) (EDSL) that you can use to write WebAssembly based smart contracts in the Rust programming language.

pro! is just standard Rust in a well defined "contract format" with specialized `#[pro(…)]` attribute macros. These attribute macros tell pro! what the different parts of your Rust smart contract represent, and ultimately allow pro! to do all the magic needed to create Substrate compatible Wasm bytecode!

Use the pro! CLI to generate an initial smart contract with some scaffolding code.

Make sure you are in your working directory, and then run:

```bash
cargo contract new flipper
```

This command will create a new project folder named `flipper` with this content:

```
flipper
|
+-- lib.rs                <-- Contract Source Code
|
+-- Cargo.toml            <-- Rust Dependencies and pro! Configuration
|
+-- .gitignore
```

## Contract Source Code

The pro CLI automatically generates the source code for the "Flipper" contract, which is about the simplest "smart" contract you can build. You can take a sneak peak as to what will come by looking at the source code here:

[Flipper Example Source Code](https://github.com/tetcoin/pro/blob/v3.0.0-rc1/examples/flipper/lib.rs)

The Flipper contract is nothing more than a `bool` which gets flipped from true to false through the `flip()` function. 

## Testing Your Contract

You will see at the bottom of the source code there is a simple test which verifies the functionality of the contract. We can quickly test that this code is functioning as expected using the **off-chain test environment** that pro! provides.

In your project folder run:

```bash
cargo +nightly test
```

To which you should see a successful test completion:

```bash
$ cargo +nightly test
    running 2 tests
    test flipper::tests::it_works ... ok
    test flipper::tests::default_works ... ok

    test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

Now that we are feeling confident things are working, we can actually compile this contract to Wasm in the next step.


