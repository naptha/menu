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


// what should the items specificaiton look like?
// ignore falsey values (false, null, etc)
// regular strings are simple menu items
// arrays are automatically flattened
// normally its an array object
// the contents can be specified with the fields
// {text, html, dom} where text and html are strings

// it's exposed as one function: context_menu
// calling it paints a context menu at the given
// position


// i.e. context_menu(root_menu, e.clientX, e.clientY)


function root_menu(state){
  return [
    { text: 'Check Me!', checked: state.field1, toggle: function(val){ state.field1 = val; } }
  ]
}


document.addEventListener('contextmenu', right_click, true)

function right_click(e){
  e.preventDefault()
  e.stopImmediatePropagation()
  e.stopPropagation()

  if(menu_levels.some(function(menu){ return is_child(e.target, menu) })) return;


  context_menu(root_menu(), e.clientX, e.clientY)
}

function root_menu(){
  var items = [
    {html: 'Copy Text'},
    {html: 'Open in New Tab'},
    {html: 'Search for <span style="color: gray">\'mozilla\'</span>'},
    '-',
    {html: 'Language', items: lang_menu},
    {html: 'Translate', items: trans_menu},
    '-',
    {html: 'Options', items: opt_menu},
    {html: 'Advanced', items: adv_menu},
    {html: 'naptha <small>0.8.2</small>', gray: true},
  ];
  return items;
}

function lang_menu(){
  function engine(id, name){
    return {html: name, checked: id == 'ocrad'}
  }
  var items = [
    engine('ocrad', "English <small>Ocrad.js</small>"),
    '+',
    engine("tess:eng", "English <small>Tesseract</small>"),
    engine("tess:joh", "Internet Meme"),
    engine("tess:rus", "Russian"),
    engine("tess:deu", "German"),
    engine("tess:spa", "Spanish"),
    engine("tess:chi_sim", "Chinese Simplified"),
    '-',
    engine("tess:chi_tra", "Chinese Traditional"),
    engine("tess:fra", "French"),
    engine("tess:jpn", "Japanese"),
    engine("tess:chi_tra", "Chinese Traditional"),
    engine("tess:fra", "French"),
    engine("tess:joh", "Internet Meme"),
    engine("tess:rus", "Russian"),
    engine("tess:deu", "German"),
    engine("tess:spa", "Spanish"),
    engine("tess:jpn", "Japanese"),
    engine("tess:joh", "Internet Meme"),
    engine("tess:rus", "Russian"),
    engine("tess:deu", "German"),
    engine("tess:spa", "Spanish"),
    engine("tess:jpn", "Japanese"),
  ];
  return items;
}

function trans_menu(){
  function engine(id, name){
    return {html: name, checked: id === null}
  }
  var items = [
    engine(null, 'No Translation'),
    engine('erase', 'Erase Text'),
    engine('custom', 'Modify Text <small>(BETA)</small>'),
    {type: 'scroll', height: 200},
    engine('en', 'English <small>Google Translate</small>'),
    engine('es', 'Spanish <small>Microsoft Translate</small>'),
    engine('ru', 'Russian <small>Yandex Translate</small>'),
    engine('zh-CN', 'Chinese Simplified'),
    engine('zh-TW', 'Chinese Traditional'),
    
    true && engine('pt', 'ONE'),
    false && engine('de', 'TWO'),
    null && engine('zh-CN', 'THREE'),
    undefined && engine('zh-TW', 'FOUR'),

    '-',
    engine('ja', 'Japanese'),
    engine('pt', 'Portuguese'),
    engine('de', 'German'),
    [
      engine('zh-CN', 'Chinese Simplified'),
      engine('zh-TW', 'Chinese Traditional'),
      engine('ja', 'Japanese'),
      engine('pt', 'Portuguese'),
      engine('de', 'German'),
      engine('zh-CN', 'Chinese Simplified'),
      engine('zh-TW', 'Chinese Traditional'),
      engine('ja', 'Japanese'),
    ],
    engine('pt', 'Portuguese'),
    engine('de', 'German'),
    engine('zh-CN', 'Chinese Simplified'),
    engine('zh-TW', 'Chinese Traditional'),
    engine('ja', 'Japanese'),
    engine('pt', 'Portuguese'),
    engine('de', 'German'),
    engine('zh-CN', 'Chinese Simplified'),
    engine('zh-TW', 'Chinese Traditional'),
    engine('ja', 'Japanese'),
    engine('pt', 'Portuguese'),
    engine('de', 'German'),
  ];
  return items;
}

function opt_menu(){
  var items = [
    {html: 'Show OCR Disclaimer', checked: true},
    {html: 'Disable Lookup'},
    {html: 'Preemptive OCR'},
    '-',
    {html: 'Disable for this image'},
    {html: 'Disable on this page'},
    {html: 'Disable on <i>test</i>'},
    '-',
    {html: 'Add Translate Key'},
    {html: 'Report Issue'},
  ];
  return items;
}

function adv_menu(){
  var items = [
    {html: 'Show Regions'},
    {html: 'Show Lines'},
    {html: 'Show Stitching'},
    {html: 'Show Words'},
    {html: 'Show Letters'},
    {html: 'Show Contours'},
    {html: 'Show Chunks'},
    {html: 'Show Recognition'},
    '-',
    {html: 'Clear State'},
    {html: 'Debug Mode'},
  ];
  return items;
}




