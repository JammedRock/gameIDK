import kaboom from "kaboom"
var score
kaboom({
  background: [52, 174, 235]
})


loadSprite("grass", "sprites/grass.png")
loadSprite("dirt", "sprites/dirt.png")
loadSprite("end", "sprites/end.png")
loadSprite("bean2", "sprites/bean.png")
loadSprite("grass2", "sprites/grass2.png")
loadSprite("flower", "sprites/flower.png");
loadSprite("bush", "sprites/bush.png");
loadSprite("sign0", "sprites/sign1.png");
loadSprite("sign1", "sprites/sign2.png");
loadSprite("sign2", "sprites/sign3.png");
loadSprite("sign3", "sprites/sign4.png");
loadSprite("sign4", "sprites/sign5.png");
loadSprite("sign5", "sprites/sign6.png");
loadSprite("sign6", "sprites/sign7.png");
loadSprite("sign7", "sprites/sign8.png");
loadSprite("sign8", "sprites/sign9.png");
loadSprite("sign9", "sprites/sign10.png");
loadSprite("sign10", "sprites/sign11.png");
loadSprite("box", "sprites/box.png");
loadSound("end", "sounds/end.mp3");
loadSound("get_box", "sounds/get_box.wav");
loadSprite("lava", "sprites/lava.png");
loadSprite("end", "sprites/end2.png",{
    	sliceX: 4,
	anims: {
		"idle": {
			from: 0,
			to: 3,
			speed: 5,
			loop: true,
		},
	},
})
loadSprite("coin", "sprites/coin.png")
loadSprite("bean", "sprites/bean4.png",{
    	sliceX:15,
	anims: {
		"idle": {
			from: 0,
			to: 10,
			speed: 10,
			loop: true,
		},
        "jump":{
          from:12,
            to:14,
            speed:50,
            loop:false,
        },
	},
})
var SPEED = 320
var JUMP = 820
var GRAVITY = 1600
const FALL_DEATH = 2400
level = 0

layers([
    "game",
    "ui",
],"game")


const LEVELS = [
    [
    
        "                           ",
        "                           ",
        "o                          ",
        "      m   bc   |   !       ",
        "    c===  ==   =--==       ",
        "   ==xx         xxx        ",
        "                           ",
        "|  i|m  ?  m b|   m ?| m  b m        b|mm  ?m c",
        "======--========================---=============",
        "xxxx xxxx      xxx             xxxxx  xxx     x"
    
    ],
    [
        "!",
        "=   m        b|  b",
        "x====---=  ? ==-== cmb",
        " oxxxxxxx====xxxxx====",
        "                      ",
        " m  c|  b  m    m   ?  m",
        "==  ==  == =  ===  ==  =",
        "",
    ],
    [
        " o                     m    |" ,
        "                   c   =    =     b c",
        "                   =              =-=",
        "        |     m  b x              xxx        ",
        "        =     =  =         ",
        "   |m   x                  ",
        "   ==                      ",
        "  i cmm      bm   ?|m     mm  cm      m ?bmm c!",
        "=========   ===--=====   ========     =========",
        "xxxx  xx       xxx        x    xx     xxx     x"
    ],
    [
        "o                          ",
        "                     m     ",
        "                     =    !",
        "        c   m     |  x   b=",
        "        =   =     =      =x",
        "    |?      x              ",
        "    ==                      ",
        " i   x   m    m b     ?|mm c",
        "==--=x====   =====    ======",
        "xxxx  xx       xxx    xxx   "
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "o                         !",
        "                          =",
        "                 m    |    ",
        "                 =    =    ",
        "ci     |b    = =  m ?|mmm c",
        "==     ===  =x=x--=========",
        "xx             xxxx    xxx "
    ],
    [
        "                 ?m c|mb      m    m      o ",
        "                =========-----==   =        ",
        "                x     xx xxxxxxx     b      ",
        "                      x     xxxx  m  =   ic?",
        "                              xx--===x=--===--=",
        "                                xxx    xxx  xxx",
        "                                          m!",
        "                                          ==",
        "                c      m     b    ?| m  =-xx",
        "                =    ====    ==   ======xxxxx"
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        " o                         ",
        "m|i   b   m m       b    ||  mm b m|    ? m c   m    |bm     m    b         m   | b    b  ? ! b ?",
        "===   =   = =  = =  =  = ==  == = ===   = = === = = ==== = === =  = = ===   =-=== = = === = = = =",
        " xx       x    x         xx       xx      x  xx   x   xx x     x      x x    xxx       xx   x   x",
    ],
    [
        "  o  ?c ! mm b ",
        "     ==========?",
        "        xxxxxxx===",
        "                    m|",
        "            cbm   b===",
        "mmi|   bb m====--==xxx",
        "====---====xxxxxx",
        "x  xxxxx xx  xx",
    ],
    [
        "                                                   m    b  | |  mm",
        "  o                              m    b       c   ==    = == == ===      m!   ?",
        "                   b|    ?   =   =    =  =    =   xx    x xx xx xxx     ===   =",
        "       c m|     b ====---=   x   x    x  x    x",
        "  mi  =====-=--===xxxxxxxx",
        "======xxx xxxxxx",
    ],
    [
        "   o        |?m m mcb|",
        "           =============  |mm",
        "     =             xxxxx=====",
        "=                      c |bbm",
        "  mim |          ?!  m ======",
        "========---------======xxxx",
        "xxxxx  xxxxxxxxxxx   x",
    ],
    [
        " ||coimb ",
        "=========",
        "xx   xx x",
    ],
    ]
    scene("game", ({ levelIdx }) => {
        gravity(GRAVITY)
        addLevel(LEVELS[levelIdx || 0],{
        width:64,
        height:64,
        "=": () => [
            sprite("grass"),
            area(),
            solid(),
        ],
        "o": () => [
            scale(0.9),
            sprite("bean"),
            area(),
            solid(),
            body(),
            origin("bot"),
            "bean",

        ],
        "x": () => [
            sprite("dirt"),
            area(),
            solid(),
        ],
        "!": () => [
            sprite("end"),
            area(),
            "end",
        ],
        "m": () => [
            sprite("grass2"),
            area(),
        ],
        "-": () => [
            sprite("lava"),
            area(),
            "kill",
            "lava",
        ],
        "|": () => [
            sprite("flower"),
            area(),
            layer("ui")
        ],
        "b": () => [
            sprite("bush"),
            area(),
        ],
        "i": () => [
            sprite("sign"+level),
            area(),
        ],
        "c": () => [
            sprite("coin"),
            area(),
            "coin",
        ],
        "?": () => [
            sprite("box"),
            area(),
            "box"
        ]
})
const bean = get("bean")[0]
if (level != LEVELS.length - 1){
    const end = get("end")[0]
    end.play("idle")
    bean.play("idle")
}

bean.onGround(() => {
    bean.play("jump")
    wait(0.5, ()=> {
        bean.play("idle")
    })
})


onKeyDown(["left","a"], () => {
	bean.move(-SPEED, 0)
})

onKeyDown(["right","d"], () => {
	bean.move(SPEED, 0)
})

onKeyDown(["up","w"], () => {
	if(bean.isGrounded()){
        bean.jump(JUMP)
    }
})
bean.onCollide("end", () => {
    play("end")
    if (levelIdx < LEVELS.length - 1){
        level += 1
        go("game",{
            levelIdx: levelIdx + 1
        })
    }else{
    }
})
bean.onCollide("coin", (coin) => {
    score++
    destroy(coin)
    textit.text = "Score: "+score
})
bean.onCollide("box", (box) => {
    destroy(box)
    play("get_box")
    number = Math.floor(Math.random() * (5) + 1)
    if (number == "1"){
        SPEED = 400
    }
    else if (number == "2"){
        SPEED = 280
    }
    else if (number == "3"){
        JUMP = 1000
    }
    else{
        SPEED = 700
    }
})
               
bean.onCollide("kill", () => {
    die()
})
    
bean.onUpdate(() => {
    camPos(bean.pos)
    if (bean.pos.y >= FALL_DEATH){
        die()
    }
})


const textit = add([
    fixed(),
	text("Score: "+score),
	pos(20, 20),
    scale(0.7)
	])
})

function die(){
    score /= 2
    score = Math.floor(score)
    GRAVITY = 1600
    JUMP = 820
    SPEED = 320
    go("game",{
        levelIdx:level,
    })
}

function start(){
    score = 0
    go("game",{
        levelIdx:0,
    })
}


start()
