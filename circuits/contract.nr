contract Foo {
  fn main(x : u64, y : pub u64) {
    constrain x < y;
  }
}