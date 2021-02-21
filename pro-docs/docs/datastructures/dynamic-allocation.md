---
title: Dynamic Storage Allocator
slug: /datastructures/dynamic-allocation
---

In the previous section we have seen how the default mode of operation is to spread information
and how we can opt-in to pack information into single cells via `pro_storage::Packed`.

However, what if we wanted to store a vector of a vector of `i32` for example?
Naturally a user would try to construct this as follows:

```rust
use pro_storage::Vec as StorageVec;

#[pro(storage)]
pub struct Matrix {
    values: StorageVec<StorageVec<i32>>,
}
```

However, this will fail compilation with an error indicating that `StorageVec<T>` requires for its `T` to be packed (`T: PackedLayout`) which `StorageVec<T>` itself does not since it always stores all of its elements into different cells. The same applies to many other storage data structures provided by `pro_storage` and is a trade-off the pro! team decided for the case of efficiency of the overall system.
Instead what a user can do in order to get their vector-of-vector to be working is to make use of pro!'s dynamic storage allocator capabilities.

For this the contract author has to first enable the feature via:

```rust
use pro_lang as pro;

#[pro::contract(dynamic_storage_allocator = true)]
mod matrix {
    // contract code ...
}
```

And then we can define our `Matrix` `#[pro(storage)]` as follows:

```rust
use pro_storage::{
    Vec as StorageVec,
    Box as StorageBox,
};

#[pro(storage)]
pub struct Matrix {
    values: StorageVec<StorageBox<StorageVec<i32>>>,
}
```

With `pro_storage::Box<T>` we can use a `T: SpreadLayout` as if it was `T: PackedLayout` since the `pro_storage::Box<T>` itself suffices the requirements and can be put into a single contract storage cell. The whole concept works quite similar to how Rust's `Box` works: by an indirection - contract authors are therefore advised to make use of dynamic storage allocator capabilities only if other ways of dealing with ones problems are not applicable.


