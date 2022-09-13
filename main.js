function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //A( 0.5, 0.5)
    //B( 0.0, 0.0)
    //C(-0.5, 0.5)

    var vertices =[
        0.5, 0.5, 
        0.0, 0.0, 
        -0.5, 0.5
    ];

    //Create a linked-list for storing vertices data in GPU
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // storing vertices data 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
    //VERTEX SHADER
    var vertexShaderCode = `
      attribute vec2 aPosition;
      void main() {
        gl_PointSize = 15.0;
        gl_Position = vec4(aPosition, 0.0, 1.0);
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

    //Teach computer how to collect the positional values for ARRAY_BUFFEr
    //for each vertex being proccesed

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0,0 )
    gl.enableVertexAttribArray(aPosition);
  
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINT, 0, 3); //mode -> primitive assembly
  }
  