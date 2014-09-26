// so how am i going to interact with this menu script?

document.addEventListener("contextmenu", function(e){
  // there needs to be some way to pass this event to the context menu generator
})

// what else does the thing need to keep track of?
// mouseup for when something is clicked
// mousedown to remove the context menu when it's not needed anymore
// keyup/keydown for keyboard driven stuff
// resize so that it disappears when the viewport changes
// mousemove for deciding which things to keep open

// all of which, however can be added on the contextmenu event
// (there should also be a way to pass a key event instead for
// when the context menu should be triggered by a key sequence)

// how are we going to initialize this thing?

var menu = new ContextMenu([
  "hello world", // we pass either a list of things or something which returns a list of things
  "test"
]);

// so what can we pass into this constructor

["string1", "string2", "-", "string3"] // this isn't terribly useful because clicking doesnt do anything
// perhaps these should be rendered as disabled?

// "-" is a separator

[
  {
    text: "hello",
    action: function(){
      // this is what happens when something is clicked
      // it automatically closes the menu
    }
  },
  {
    text: "glue",
    checked: true, // should this thing be rendered as checked or not
    toggle: function(state){
      // this is what happens when something is clicked
      // state that gets passed is inverted whenever something happens
      // the list/generator is re-rendered following this
      // the context menu is not automatically closed
    }
  }
]


// you can have a function which returns an array

function(){
  return ["one", "two", "-", "three"]
}

// or use a helper method thingy?

function(item){
  item("one")
  item("two")
  item({
    html: "yolo"
  })
  item("three")
  item("-")
}


// TODO: figure out how to do groups

document.addEventListener("contextmenu", function(e){
  menu.contextmenu(e)
})
