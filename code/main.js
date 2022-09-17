import kaboom from "kaboom"
var score
kaboom({
    background: [52, 174, 235],
    canvas: document.querySelector("#kaboom"),
    font: "sinko",
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
loadSprite("sign11", "sprites/sign12.png");
loadSprite("sign12", "sprites/sign13.png");
loadSprite("spikes", "sprites/spikes.png");
loadSprite("sign13", "sprites/sign14.png");
loadSprite("box", "sprites/box.png");
loadSound("end", "sounds/end.mp3");
loadSound("bounce", "sounds/bounce.wav");
loadSound("get_box", "sounds/get_box.wav");
loadSprite("platform", "sprites/platform2.png", {
    sliceX: 4,
    anims: {
        "idle": {
            from: 0,
            to: 3,
            speed: 5,
            loop: true,
        },
    },
});
loadSprite("lava", "sprites/lava3.png",{
    sliceX: 4,
    anims: {
        "idle": {
            from: 0,
            to: 3,
            speed: 2,
            loop: true,
        },
    },
});
loadSprite("end", "sprites/end3.png", {
    sliceX: 6,
    anims: {
        "idle": {
            from: 0,
            to: 5,
            speed: 10,
            loop: true,
        },
    },
})
loadSprite("platform2", "sprites/platform2.png", {
    sliceX: 4,
    anims: {
        "idle": {
            from: 0,
            to: 3,
            speed: 3,
            loop: true,
        },
    },
})
loadSprite("coin", "sprites/coin.png")
loadSprite("bean", "sprites/bean4.png", {
    sliceX: 15,
    anims: {
        "idle": {
            from: 0,
            to: 10,
            speed: 10,
            loop: true,
        },
        "jump": {
            from: 12,
            to: 14,
            speed: 50,
            loop: false,
        },
    },
})
var SPEED = 320
var JUMP = 800
var GRAVITY = 1600
const FALL_DEATH = 2400
level = 0

layers([
    "game",
    "ui",
], "game")


const LEVELS = [
    [

        "                           ",
        "                           ",
        "o                          ",
        "      ms  pp   |   !       ",
        "    c===       =--==       ",
        "   ==xx         xxx        ",
        "                           ",
        "|  i|m  ? sm b|   m ?| m  b m        b|mm ",
        "======--========================---=============",
        "xxxx xxxx      xxx             xxxxx  xxx     x"

    ],
    [
        "!",
        "==s m        b|  b",
        "xx===---=  ? ==-== cmb",
        " oxxxxxxx====xxxxx====",
        "                      ",
        "im  c|  b  p    m   ?  m",
        "==  ==  ==    ===  == ==",
        "",
    ],
    [
        " o                     p    |",
        "                   c        =     b c",
        "                   =              =-=",
        "        |     p  b x              xxx        ",
        "        =        =         ",
        "   |m   x                  ",
        "   ==                                         ",
        "  i cmm      bm  s?|m     mm  cm      m ?bmm c!",
        "=========   ===--=====   ========     =========",
        "xxxx  xx       xxx        x    xx     xxx     x"
    ],
    [
        "o                          ",
        "                     m     ",
        "                     =    !",
        "            m     |  x   b=",
        "        p   =     =      =x",
        "    |?      x              ",
        "    ==                      ",
        " i   x   m    m bs    ?|mm c",
        "==--=x====   =====    ======",
        "xxxx  xx       xxx    xxx   "
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "o                         !",
        "                          =",
        "                 p    |    ",
        "                      =    ",
        "ci     |bs   = =  m ?|mmm c",
        "==     ===  =x=x--=========",
        "xx             xxxx    xxx "
    ],
    [
        "                 ?msc|mb      m           o ",
        "                =========-----==   p        ",
        "                x     xx xxxxxxx     b      ",
        "                      x     xxxx  m  =s  ic?",
        "                              xx--===x=--===--=",
        "                                xxx    xxx  xxx",
        "                                          m!",
        "                                          ==",
        "                c     sm     b    ?| m  =-xx",
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
        "m|i   b   m m  s p  b    ||  mm b m|    ? m cs  m p  |bm    sm    b         m  s| b    b  ? ! b ?",
        "===   =   = =  =    =  = ==  == = ===   = = === =   ==== = === =  = = ===   =-=== = = === = = = =",
        " xx       x    x         xx       xx      x  xx       xx x     x      x x    xxx       xx   x   x",
    ],
    [
        "  o  ?c ! mm b ",
        "     ==========?",
        "     xxxxxxxxxx===",
        "                    m|",
        "            cbm   b===",
        "mmi|   bb m====--==xxx",
        "====---====xxxxxx",
        "x  xxxxx xx  xx",
    ],
    [
        "                                                   m    b  | |s mm",
        "  o                              m    b  p    c   ==    = == == ===      m!   ?",
        "                   b|s   ?   =   =    =       =   xx    x xx xx xxx     ===   =",
        "       c m|     b ====---=   x   x    x       x",
        "  mi  =====-=--===xxxxxxxx",
        "======xxx xxxxxx",
    ],
    [
        "   o        |?msm mcb|     s",
        "     p     =============  |==",
        "                   xxxxx===x ",
        "=                      c |bbm",
        "  mim |          ?!  m ======",
        "========---------======xxxx",
        "xxxxx  xxxxxxxxxxx   x",
    ],
    [
        "oi  m|b ",
        "========    p",
        "xxxxxxxx",
        " xxxxx  ",
        "  xxxxc ",
        "  xxxx=b",
        "   xxxx=== b  ?|| m",
        "      xxxx==--====== cm !",
        "          x xxxx  xx ===="
    ],
    [
        "oi     m",
        "===    =   c                                                  s!",
        "x          =    =    ?    m       c  m   p    p   p   p   p  ===",
        "           x         =    =   =   =  =                        xx",
    ],
    [
        "                                                      io",
        "  !    p  c    ?n p    p   p   cs   |    b m     pp   ===",
        "===       ==   ==              ==   =    ===  =     ==xx"
    ],
    [
        " ||coimb ",
        "=========",
        "xx   xx x",
    ],
]
scene("game", ({ levelIdx }) => {
    gravity(GRAVITY)
    addLevel(LEVELS[levelIdx || 0], {
        width: 64,
        height: 64,
        "=": () => [
            sprite("grass"),
            area(),
            solid(),
            origin("botleft"),
			outview({ hide: true,}),
        ],
        "p": ()=> [
            sprite("platform"),
            area({width:64, height:20}),
            solid(),
            origin("botleft"),
            "unstable",
			outview({ hide: true,}),
        ],
        "o": () => [
            scale(0.9),
            sprite("bean"),
            area({height:64, width:64}),
            solid(),
            body(),
            origin("botleft"),
            "bean",

        ],
        "x": () => [
            sprite("dirt"),
            area(),
            solid(),
            origin("botleft"),
			outview({ hide: true,}),
        ],
        "!": () => [
            sprite("end"),
            area(),
            origin("botleft"),
            "end",
			outview({ hide: true,}),
        ],
        "m": () => [
            sprite("grass2"),
            area(),
            origin("botleft"),
			outview({ hide: true,}),
        ],
        "-": () => [
            sprite("lava"),
            area({ height: 55 }),
            origin("botleft"),
            "kill",
			outview({ hide: true,}),
            "lava",
        ],
        "s": () => [
            sprite("spikes"),
            area({ widther: 50, height: 10 }),
            origin("botleft"),
            "kill",
			outview({ hide: true,}),
        ],
        "|": () => [
            sprite("flower"),
            area(),
            origin("botleft"),
			outview({ hide: true,}),
        ],
        "b": () => [
            sprite("bush"),
            area(),
            origin("botleft"),
			outview({ hide: true,}),
        ],
        "i": () => [
            sprite("sign" + level),
            area(),
            origin("botleft"),
			outview({ hide: true,}),
        ],
        "c": () => [
            sprite("coin"),
            area(),
            origin("botleft"),
            "coin",
			outview({ hide: true,}),
        ],
        "?": () => [
            sprite("box"),
            area(),
            origin("botleft"),
            "box",
			outview({ hide: true,}),
        ]
    })
    const bean = get("bean")[0]
	every("unstable",(plat) => {
		plat.play("idle")
	})
	every("lava",(lava) => {
		lava.play("idle")
	})
    if (level != LEVELS.length - 1) {
        const end = get("end")[0]
        end.play("idle")
        bean.play("idle")
    }

    bean.onGround(() => {
        bean.play("jump")
        wait(0.5, () => {
            bean.play("idle")
        })
    })


    onKeyDown(["left", "a"], () => {
        if (isKeyDown("a") && isKeyDown("left") == false) {
            bean.move(-SPEED, 0)
        }
        else if (isKeyDown("left") && isKeyDown("a") == false) {
            bean.move(-SPEED, 0)
        }
    })

    onKeyDown(["right", "d"], () => {
        if (isKeyDown("d") && isKeyDown("right") == false) {
            bean.move(SPEED, 0)
        }
        else if (isKeyDown("right") && isKeyDown("d") == false) {
            bean.move(SPEED, 0)
        }
    })
    onKeyDown(["up", "w", "space"], () => {
        if (bean.isGrounded()) {
            bean.jump(JUMP)
            //play("bounce")
        }
    })
    bean.onCollide("end", () => {
        play("end")
        if (levelIdx < LEVELS.length - 1) {
            level += 1
            go("game", {
                levelIdx: levelIdx + 1
            })
        } else {
        }
    })
    bean.onCollide("coin", (coin) => {
        score++
        destroy(coin)
        textit.text = "Score: " + score
    })
    bean.onCollide("unstable", (unstable) => {
        wait(1,() => {
            destroy(unstable)
        })
    })
    bean.onCollide("box", (box) => {
        destroy(box)
        play("get_box")
        number = randi(4)
        if (number == "1") {
            SPEED = 400
        }
        else if (number == "2") {
            SPEED = 280
        }
        else if (number == "3") {
            JUMP = 1000
        }
        else {
            SPEED = 700
        }
    })

    bean.onCollide("kill", () => {
        die()
    })

    bean.onUpdate(() => {
        camPos(bean.pos)
        if (bean.pos.y >= FALL_DEATH) {
            die()
        }
    })

    //debug.inspect = true
    const textit = add([
        fixed(),
        text("Score: " + score),
        pos(20, 20),
        scale(5)
    ])
})

function die() {
    score /= 2
    score = Math.floor(score)
    GRAVITY = 1600
    JUMP = 820
    SPEED = 320
    go("game", {
        levelIdx: level,
    })
}

function start() {
    score = 0
    go("game", {
        levelIdx: 0,
    })
}


start()
