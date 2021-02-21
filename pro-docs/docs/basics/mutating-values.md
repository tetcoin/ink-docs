---
title: Mutating Storage Values
slug: /basics/mutating-values
---

It's time to modify some storage!

## Mutable and Immutable Functions

You may have noticed that the function templates included `self` as the first parameter of the contract functions. It is through `self` that you gain access to all your contract functions and storage items.

If you are simply _reading_ from the contract storage, you only need to pass `&self`. But if you want to _modify_ storage items, you will need to explicitly mark it as mutable, `&mut self`.

```rust
impl MyContract {
    #[pro(message)]
    pub fn my_getter(&self) -> u32 {
        self.my_number
    }

    #[pro(message)]
    pub fn my_setter(&mut self, new_value: u32) {
        self.my_number = new_value;
    }
}
```

## Lazy Storage Values

There is [a `Lazy` type](https://tetcoin.github.io/pro/pro_storage/struct.Lazy.html) that can be used for pro! storage values that don't need to be loaded in some or most cases. Because they do not meet this criteria, many simple pro! examples
do not require the use `Lazy` values. Since there is some overhead associated with `Lazy` values, they should only be used where required.

```rust
#[pro(storage)]
pub struct MyContract {
    // Store some number
    my_number: pro_storage::Lazy<u32>,
}

impl MyContract {
    #[pro(constructor)]
    pub fn new(init_value: i32) -> Self {
        Self {
            my_number: Default::default(),
        }
    }

    #[pro(message)]
    pub fn my_setter(&mut self, new_value: u32) {
        pro_storage::Lazy::<u32>::set(&mut self.my_number, new_value);
    }

    #[pro(message)]
    pub fn my_adder(&mut self, add_value: u32) {
        let my_number = &mut self.my_number;
        let cur = pro_storage::Lazy::<u32>::get(my_number);
        pro_storage::Lazy::<u32>::set(my_number, cur + add_value);
    }
}
```
