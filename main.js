function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
  
    //VERTEX SHADER
    var vertexShaderCode = `
      void main() {
        gl_PointSize = 100.0;
        gl_Position = vec4(-1.0, 1.0, 0.0, 1.0);
        //gl_Position is the Final destination for storing
        //positional data for the rendered vertex
      }
    `;
  
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);
  
    //FRAGMENT SHADER --> manage color data
    var fragmentShaderCode = `
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
  
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINT, 0, 1); //mode -> primitive assembly
  }
  