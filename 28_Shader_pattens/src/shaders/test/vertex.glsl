varying vec2 vUv;
uniform float uTime;
//uniform mat4 modelPosition;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}
