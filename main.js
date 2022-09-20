function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
    
    //A( 0.5, 0.5)
    //B( 0.0, 0.0)
    //C(-0.5, 0.5)

    var vertices =[
        0.5, 0.5, 
        0.0, 0.0, 
        -0.5, 0.5,
        0.0, 1.0
    ];

    //Create a linked-list for storing vertices data in GPU
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // storing vertices data 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
    //VERTEX SHADER
    var vertexShaderCode = `
      attribute vec2 aPosition;
      uniform float uTheta;
      void main() {
        gl_PointSize = 15.0;
        vec2 position;  vec2(aPosition);
        position.x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
        position.y = sin(uTheta) * aPosition.y + cos(uTheta) * aPosition.x;
        gl_Position = vec4(position, 0.0, 1.0);
        //gl_Position is the Final destination for storing
        //positional data for the rendered vertex
      }
    `;
  
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);
  
    //FRAGMENT SHADER --> manage color data
    var fragmentShaderCode = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
      //gl_FragColor is the final destinatio for storing
      //color data for rendered fragment
      
    }
    `;
  
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);
  
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //All the quilifiers needed by shaders
    var uTheta = gl.getUniformLocation(shaderProgram, "uTheta")

    var theta = 0.0;

    //Teach computer how to collect the positional values for ARRAY_BUFFEr
    //for each vertex being proccesed

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0,0 )
    gl.enableVertexAttribArray(aPosition);
  
    const render = () => {
      gl.clearColor(1.0, 0.75, 0.79, 1.0);
      theta += 0.01;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTheta,theta);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4); //mode -> primitive assembly
    }
    setInterval(render,1000/60);
  }
  