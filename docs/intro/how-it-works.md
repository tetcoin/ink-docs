---
title: How it Works ‒ Substrate
slug: /how-it-works
---

<div class="schema">
    <img src="./img/how-it-works.svg" alt="How it Works" />
</div>

Substrate's [Framework for Runtime Aggregation of Modularised Entities (FRAME)](https://substrate.dev/docs/en/next/conceptual/runtime/frame) contains
a module  which implements an API for typical functions smart contracts need (storage, querying information about accounts, …).
This module is called the `contracts` pallet,
you can find its repository [here](https://github.com/paritytech/substrate/blob/master/frame/contracts/README.md).

The `contracts` pallet requires smart contracts to be uploaded to the blockchain as a Wasm blob.

pro! is a smart contract language which targets the API exposed by `contracts`.
Hence pro! contracts are compiled to Wasm.

When executing `cargo contract build` an additional file `metadata.json` is created.
It contains information about e.g. what methods the contract provides for others to call.
