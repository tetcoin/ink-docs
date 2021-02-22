---
title: Working with Datastructures 
slug: /datastructures/hashmap
---

In this section we want to demonstrate how to work with pro! datastructures.
We will do this using the example of our `HashMap`, which allows you to store items in a key-value mapping.

Here is an example of a mapping from user to a number:

```rust
#[pro(storage)]
pub struct MyContract {
    // Store a mapping from AccountIds to a u32
    my_number_map: pro_storage::collections::HashMap<AccountId, u32>,
}
```

This means that for a given key, you can store a unique instance of a value type. In this case, each "user" gets their own number, and we can build logic so that only they can modify their own number.

## Storage HashMap API

You can find the full HashMap API in the [crate documentation](https://tetcoin.github.io/pro/pro_storage/collections/hashmap/index.html) part of pro!.

Here are some of the most common functions you might use:

```rust
    /// Inserts a key-value pair into the map.
    
    /// Returns the previous value associated with the same key if any.
    /// If the map did not have this key present, `None` is returned.
    pub fn insert(&mut self, key: K, new_value: V) -> Option<V> {/* --snip-- */}

    /// Removes the key/value pair from the map associated with the given key.
    ///
    /// - Returns the removed value if any.
    pub fn take<Q>(&mut self, key: &Q) -> Option<V> {/* --snip-- */}

    /// Returns a shared reference to the value corresponding to the key.
    ///
    /// The key may be any borrowed form of the map's key type,
    /// but `Hash` and `Eq` on the borrowed form must match those for the key type.
    pub fn get<Q>(&self, key: &Q) -> Option<&V> {/* --snip-- */}

    /// Returns a mutable reference to the value corresponding to the key.
    ///
    /// The key may be any borrowed form of the map's key type,
    /// but `Hash` and `Eq` on the borrowed form must match those for the key type.
    pub fn get_mut<Q>(&mut self, key: &Q) -> Option<&mut V> {/* --snip-- */}

    /// Returns `true` if there is an entry corresponding to the key in the map.
    pub fn contains_key<Q>(&self, key: &Q) -> bool {/* --snip-- */}

    /// Converts the OccupiedEntry into a mutable reference to the value in the entry
    /// with a lifetime bound to the map itself.
    pub fn into_mut(self) -> &'a mut V {/* --snip-- */}

    /// Gets the given key's corresponding entry in the map for in-place manipulation.
    pub fn entry(&mut self, key: K) -> Entry<K, V> {/* --snip-- */}
```

## Initializing a HashMap

Not initializing storage before you use it is a common error that can break your smart contract. For each key in a storage value, the value needs to be set before you can use it. To do this, we will create a private function which handles when the value is set and when it is not, and make sure we never work with uninitialized storage.

So given `my_number_map`, imagine we wanted the default value for any given key to be `0`. We can build a function like this:

```rust

#![cfg_attr(not(feature = "std"), no_std)]

use pro_lang as pro;

#[pro::contract]
mod mycontract {

    #[pro(storage)]
    pub struct MyContract {
        // Store a mapping from AccountIds to a u32
        my_number_map: pro_storage::collections::HashMap<AccountId, u32>,
    }

    impl MyContract {
        /// Public function.
        /// Default constructor.
        #[pro(constructor)]
        pub fn default() -> Self {
            Self {
                my_number_map: Default::default(),
            }
        }
    
        /// Private function.
        /// Returns the number for an AccountId or 0 if it is not set.
        fn my_number_or_zero(&self, of: &AccountId) -> u32 {
            let balance = self.my_number_map.get(of).unwrap_or(&0);
            *balance
        }
    }
}
```

Here we see that after we `get` the value from `my_number_map` we call `unwrap_or` which will either `unwrap` the value stored in storage, _or_ if there is no value, return some known value. Then, when building functions that interact with this HashMap, you need to always remember to call this function rather than getting the value directly from storage.

Here is an example:

```rust

#![cfg_attr(not(feature = "std"), no_std)]

use pro_lang as pro;

#[pro::contract]
mod mycontract {

    #[pro(storage)]
    pub struct MyContract {
        // Store a mapping from AccountIds to a u32
        my_number_map: pro_storage::collections::HashMap<AccountId, u32>,
    }

    impl MyContract {
        // Get the value for a given AccountId
        #[pro(message)]
        pub fn get(&self, of: AccountId) -> u32 {
            self.my_number_or_zero(&of)
        }

        // Get the value for the calling AccountId
        #[pro(message)]
        pub fn get_my_number(&self) -> u32 {
            let caller = self.env().caller();
            self.my_number_or_zero(&caller)
        }

        // Returns the number for an AccountId or 0 if it is not set.
        fn my_number_or_zero(&self, of: &AccountId) -> u32 {
            let value = self.my_number_map.get(of).unwrap_or(&0);
            *value
        }
    }
}
```

## Contract Caller

As you might have noticed in the example above, we use a special function called `self.env().caller()`. This function is available throughout the contract logic and will always return to you the contract caller.

> **NOTE:** The contract caller is not the same as the origin caller. If a user triggers a contract which then calls a subsequent contract, the `self.env().caller()` in the second contract will be the address of the first contract, not the original user.

`self.env().caller()` can be used a number of different ways. In the examples above, we are basically creating an "access control" layer which allows a user to modify their own value, but no one else. You can also do things like define a contract owner during contract deployment:

```rust

#![cfg_attr(not(feature = "std"), no_std)]

use pro_lang as pro;

#[pro::contract]
mod mycontract {

    #[pro(storage)]
    pub struct MyContract {
        // Store a contract owner
        owner: AccountId,
    }

    impl MyContract {
        #[pro(constructor)]
        pub fn new(init_value: i32) -> Self {
            Self {
                owner: Self::env().caller();
            }
        }
        /* --snip-- */
    }
}
```

Then you can write permissioned functions which checks that the current caller is the owner of the contract.

## Modifying a HashMap

Making changes to the value of a HashMap is just as sensitive as getting the value. If you try to modify some value before it has been initialized, your contract will panic!

But have no fear, we can continue to use the `my_number_or_zero` function we created to protect us from these situations!

```rust
impl MyContract {

    /* --snip-- */

    /// Set the value for the calling AccountId
    #[pro(message)]
    pub fn set_my_number(&mut self, value: u32) {
        let caller = self.env().caller();
        self.my_number_map.insert(caller, value);
    }

    /// Add a value to the existing value for the calling AccountId
    #[pro(message)]
    pub fn add_my_number(&mut self, value: u32) {
        let caller = self.env().caller();
        let my_number = self.my_number_or_zero(&caller);
        self.my_number_map.insert(caller, my_number + value);
    }

    /// Returns the number for an AccountId or 0 if it is not set.
    fn my_number_or_zero(&self, of: &AccountId) -> u32 {
        *self.my_number_map.get(of).unwrap_or(&0)
    }
}
```

Here we have written two kinds of functions which modify a `HashMap`.
One which simply inserts the value directly into storage, with no need
to read the value first, and the other which modifies the existing value.
Note how we can always `insert` the value without worry, as that initialized
the value in storage, but before you can get or modify anything, we need
to call `my_number_or_zero` to make sure we are working with a real value.

## Entry API

We will not always have an existing value on our contract's storage.
We can take advantage of the Rust `Option<T>` type to help use on this task.
If there's no value on the contract storage we will insert a new one; on
the contrary if there is an existing value we will only update it.

pro! HashMaps expose the well-known `entry` API that we can use to achieve
this type of "upsert" behavior:

```rust
let caller = self.env().caller();
self.my_number_map
    .entry(caller)
    .and_modify(|old_value| old_value += by)
    .or_insert(by);
```
