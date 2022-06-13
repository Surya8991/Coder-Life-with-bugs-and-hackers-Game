
import kaboom from "kaboom"

// initialize context
kaboom(
  {
    font:"sink",
    background:[0, 173, 181],
  }
)

// load assets
loadSprite("coder1", "sprites/coder1.png");
loadSprite("bug", "sprites/bug.png");
loadSprite("hacker", "sprites/hacker.jpg");
loadSprite("cofee", "sprites/cofee.png");


//load sounds
loadSound("Background", "sounds/Background.mp3");
loadSound("sip", "sounds/sip.mp3");
loadSound("score", "sounds/score.mp3");
loadSound("harry harry", "sounds/harry harry.mp3");
loadSound("gameover", "sounds/gameover.mp3");

//Adding player
const player = add([
    sprite("coder1"), // renders as a sprite
    health(3),
    pos(120, 80), // position in world
    scale(0.13),
    area(),          // has a collider
])
//Defining game constants
let SPEED=650;
let BSPEED=1;
let SCORE=0;
let scoreText;
let bg;
let backgroundMusic;
const displayScore = ()=>{
  destroy(scoreText)
  // a simple score counter
  scoreText = add([
      text("Score: " + SCORE),
      scale(3),
      pos(width() - 181, 21),
      color(10, 10, 255)
  ])
}
//To play background music
const playBg = ()=>
  {
    if(!bg)
    {
      backgroundMusic=play("Background",{volume:0.5})
      bg=true;
    }
  }


//Movement with even Handelers
onKeyDown("left", () => {
  playBg();
    player.move(-SPEED, 0)
})
onKeyDown("right", () => {
   playBg();
   player.move(SPEED, 0)
})
onKeyDown("up", () => {
   playBg();
    player.move(0,-SPEED)
})
onKeyDown("down", () => {
   playBg();
   player.move(0,SPEED)
})
//Lets add bug and hacker on loop
loop(4,()=>{
  for(let i=0; i<2; i++){
    let x = rand(0, width())
    let y = height()
    let x1=rand(0,width())
    let c = add([
       sprite("bug"),   
       pos(x, y),   
       area(),
       scale(0.13), 
       "bug"
    ])
    let d = add([
       sprite("hacker"),   
       pos(x1, y),   
       area(),
       scale(0.05), 
       "bug"
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x, c.pos.y - BSPEED)
    })
    d.onUpdate(()=>{
      d.moveTo(d.pos.x, d.pos.y - BSPEED)
    })
    if(BSPEED<15)
    {
      BSPEED+=1;
    }
  }
  for(let i=0; i<2; i++){
    let x = rand(0, width())
    let y = height()
    let cof = add([
       sprite("cofee"),   
       pos(x, y),   
       area(),
       scale(0.13), 
       "coffee"
    ])
    cof.onUpdate(()=>{
      cof.moveTo(cof.pos.x, cof.pos.y - BSPEED)
    })
  }
})
player.onCollide("bug",()=>
  {
    play("gameover");
    destroy(player);
    addKaboom(player.pos);
    scoreText = add([
      text("Game Over Restart to play Again"),
      scale(5),
      pos(width() / 2, height() / 2 + 80),
      color(10, 10, 255),
      origin("center")
  ])
  })
player.onCollide("coffee",(cof)=>
  {
    backgroundMusic.volume(0.1);
   play("sip", {
    volume: 2
  });
    destroy(cof);
    SCORE += 1;
    displayScore()
    wait(3, () => {
      backgroundMusic.volume(0.2)
  })
  })


displayScore()