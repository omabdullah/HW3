# HW3
PSID: 1838738 Osama Abdullah

The objective of this assignment is to utilize the  GLUT, GLEW, GLFW, and GLM openGL libraries to implement a 3D viewing of a cube which outputs a Phong shading model and shaders. This is done by creating a vertex and fragment shader for the predefined cube geometry constructed in the main.cpp. Two facilitating files will be used for this process, the camera.h and shader.h files. We achieve the Phong output image by first creating ambient shading, followed by diffuse, and specular. These will all be added together to create the Phong reflection.

For this assignment, we will be using Visual Studio on Windows, accompanied by the GLUT, GLEW, GLFW, and GLM openGL libraries. 
Should you not have these libraries installed, you can follow the following tutorials:
https://www.youtube.com/watch?v=gCkcP0GcCe0&t=689s
https://www.youtube.com/watch?v=6nGpoY-L2Xk&t=210s
https://www.youtube.com/watch?v=8p76pJsUP44&t=528s

After the aforementioned libraries are installed, you can simply compile the given code from the repository and use your mouse and the W,A,S,D keys to navigate around the shaded cube.

When the program has been successfully compiled, a representation of a Phong shaded cube should appear, as such:
![Scene1](https://github.com/omabdullah/HW3/blob/main/phong.png?raw=true "Scene 1")

To view merely the ambient shading of the cube, simply navigate to the phong.frag file to line 31, where you will encounter the line of code specifying:
    vec3 result = (ambient + diffuse + specular) * oCol;
Within this line, delete "+ diffuse + specular" and leave only ambient, which should only output the ambient shading as a result, due to the fact that Phong is a result of ambient, diffuse, and specular added together. As a result, the following image of ambient should appear:

![Scene2](https://github.com/omabdullah/HW3/blob/main/ambient.png?raw=true "Scene 1")

To view merely the diffuse shading of the cube, simply navigate to the phong.frag file to line 31, where you will encounter the line of code specifying:
    vec3 result = (ambient + diffuse + specular) * oCol;
Within this line, delete "ambient" and "specular" and leave only diffuse, which should only output the diffuse shading as a result, due to the fact that Phong is a result of ambient, diffuse, and specular added together. As a result, the following image of diffuse should appear:

![Scene2](https://github.com/omabdullah/HW3/blob/main/diffuse.png?raw=true "Scene 1")

Finally, to view merely the specular shading of the cube, simply navigate to the phong.frag file to line 31, where you will encounter the line of code specifying:
    vec3 result = (ambient + diffuse + specular) * oCol;
Within this line, delete "ambient" and "diffuse" and leave only specular, which should only output the specular shading as a result, due to the fact that Phong is a result of ambient, diffuse, and specular added together. As a result, the following image of specular should appear:

![Scene2](https://github.com/omabdullah/HW3/blob/main/specular.png?raw=true "Scene 1")

Should you want to view the Phong shading representation of the cube, simply revert vec3 result back to the following:
    vec3 result = (ambient + diffuse + specular) * oCol;
This will add all the shading together and result in the Phong reflection representation as shown in the first image in the readme.


Now that all of the images have been represented, the code will be gone over, file by file.
Camera.h
Starting with this file, the GetViewMatrix() function has been editted to return the view matrix calculated using Eular Angles and the LookAt Matrix. This allows us to properly move around the scene since OpenGL is not aware of a camera feature conceptually, so we have to edit it to make it appear as if we are moving around the object. As shown in the code, we create two floats: camX and camY. These variables in return use GLFW's glfwGetTime function to create a new view matrix each frame, recalculating the x and y coordinates, and sin and cos are used based on which axis we are moving on. A radius of 10 is used since we are always moving a circle (hence the sin and cos), allowing a bigger traversal movement.

Moving on to the main.cpp file
Within the main, we define attributes of the objects, such as object color, light color, position, camera matrix. This is done through functions namely being: glGetUniformLocation(), glUniform3f(), glUniformMatrix4fx() to pass the uniform values.
Consistently, we use the following format, glUniform3f(GLint location, GLfloat v0, GLfloat v1, GLfloat v2).
For example, glUniform3f(glGetUniformLocation(lightingShader.Program, "lPos"), lightPos.x, lightPos.y, lightPos.z);
Breaking this down, glUniform3f specifies the value of a uniform variable for the current program output.
glGetUniformLocation("lightingShader.Program, "lPos") returns an integer that represents the location of a specific uniform variable within a program object from the fragment file.
Finally, lightPos.x, lightPos.y, lightPos.y will give the values of those coordinates for the light position using the fragment shader.

Similarly, glUniformMatrix4fv is a similar concept, but instead takes in the following parameters:
void glUniformMatrix4fv(GLint location, GLsizei count, GLboolean transpose, const GLfloat * value);
This will pass the matrices to the shader.
For example, glUniformMatrix4fv(glGetUniformLocation(lightingShader.Program, "model"), 1, GL_FALSE, glm::value_ptr(glm::mat4(1.0)));
This one grabs information from the vertex shading, in this case the "model", 1 for the count, we'll set the transpose to false, passing through the model matrix "mat4(1.0)."

Now, the phong.vs file (the vertex shader file):
We declare GLSL version to be 3.3 to match the openGL version.
Following such, we declare the uniforms, model, view, and projection.
Now, we have the per vertex attributes, declaring the model, view, and projection.
As for gl_Position is the clip-space output position of the current vertex, so we take projection, view, and model, multiplying them together by the matrix of vec4(pos,1.0) to extend 3D to 4D homogenous coordinates.

Now that we have the vertex shader file, we need to create one more file, the fragment shader file, phong.frag:
Similar to the phong.vs file, we declare GLSL to 3.3 to match the openGL version.
The uniforms here will take material properties, textures, light positions, light color, object color.
We begin by creating the ambient shading, which includes the strength and 3D coordinates of the strength and light color.
Then, the diffuse shading is created, adding in light direction, normalization, and diffusion.
Finally, the specular shading is created, setting the strength, view direction, reflection direction.
Using all this information, we create a vec3 result by adding all of the ambient, diffuse, and specular together, multiplying them by the object color to create a Phong lighting representation.
