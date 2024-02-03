'use client'

import { Game } from "@/components/Game";

//import { Application, Circle, Graphics } from "pixi.js";

//import { Stage, Container, Sprite, Text } from '@pixi/react';

export default function GamePage() {
  return (
    <div>
      <Game></Game>
    </div>
    // <Stage width={window.innerWidth} height={window.innerHeight} ref={stage}>
    //   <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" x={100} y={100} anchor={{ x: 0.5, y: 0.5 }} />

    //   <Container x={400} y={330}>
    //     <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} />
    //   </Container>
    // </Stage>
  );
};