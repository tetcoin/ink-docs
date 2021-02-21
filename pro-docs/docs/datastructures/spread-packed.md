---
title: Spread vs. Packed
slug: /datastructures/spread-packed-layout
---

### Storage Organization

The following schema depicts the storage which is exposed
to pro! by the contracts pallet:

<div class="schema">
    <img src="../img/kv.svg" alt="Storage Organization: Layout" />
</div>

Storing or loading complex data structures to and from contract storage can be done in many different ways. You could store all information into a single storage cell or you could try to store all information into as many different cells as possible. Both strategies have pros and cons under different conditions.

For example it might be a very good idea to store all the information under the same cell if all the information is very compact. For example when we are dealing with a byte vector that is expected to never be larger than approx a thousand elements it would probably be more efficient if we store all those thousand bytes in the same cell and especially if we often access many of those (or all) in our contract messages.

On the other hand spreading information across as many cells as possible might be much more efficient if we are dealing with big data structures, a lot of information that is not compact, or when messages that operate on the data always only need a small fraction of the whole data.
An example for this use case is if you have a vector of user accounts where each account stores potentially a lot of information, e.g. a 32-byte hash etc and where our messages only every operate on only a few of those at a time.

The `pro_storage` crate provides the user full control over the strategy or a mix of these two root strategies through some fundamental abstractions that we are briefly presenting to you.

### Default: Spreading Mode

By default pro! spreads information to as many cells as possible. For example if you have the following `#[pro(storage)]` struct every field will live in its own single storage cell. Note that for `c` all 32 bytes will share the same cell!

```rust
#[pro(storage)]
pub struct Spreaded {
    a: i32,
    b: pro_storage::Lazy<i32>,
    c: [u8; 32],
}
```

The following schema depicts the storage layout for a vector with three elements,
persisted to storage in a spreaded layout.

<div class="schema">
    <img src="../img/spread.svg" alt="Storage Organization: Spreading" />
</div>


### Packing Storage

We can alter this behaviour by using the `pro_storage::Pack` abstraction:

```rust
pub struct Spreaded {
    a: i32,
    b: pro_storage::Lazy<i32>,
    c: [u8; 32],
}

#[pro(storage)]
pub struct Packed {
    packed: pro_storage::Pack<Spreaded>,
}
```

Now all fields of `Spreaded` will share the same storage cell. This means whenever one of them is stored to or loaded from the contract storage, all of them are stored or loaded. A user has to choose wisely what mode of operation is more suitable for their contract.

These abstractions can be combined in various ways, yielding full control to the users. For example, in the following only `a` and `b` share a common storage cell while `c` lives in its own:

```rust
pub struct Spreaded {
    a: i32,
    b: pro_storage::Lazy<i32>,
}

#[pro(storage)]
pub struct Packed {
    packed: pro_storage::Pack<Spreaded>,
    c: [u8; 32],
}
```

The following schema depicts the spreaded vector from the previous
section in a packed layout.

<div class="schema">
    <img src="../img/packed.svg" alt="Storage Organization: Packing" />
</div>


### Spreading Array Cells

If we prefer to store all bytes of `c` into their own storage cell we can make use of the `SmallVec` data structure. The `SmallVec` is a high-level data structure that allows to efficiently organize a fixed number of elements similar to a Rust array. However, unlike a Rust array it acts lazily upon the storage and spreads its elements into different cells.

```rust
use typenum::U32;

pub struct Spreaded {
    a: i32,
    b: pro_storage::Lazy<i32>,
}

#[pro(storage)]
pub struct Packed {
    packed: pro_storage::Pack<Spreaded>,
    c: SmallVec<u8, U32>,
}
```
