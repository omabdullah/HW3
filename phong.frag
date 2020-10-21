#version 330 core
out vec4 color;

in vec3 FragPos;  
in vec3 Normal;  
  
uniform vec3 lPos; 
uniform vec3 vPos;
uniform vec3 lCol;
uniform vec3 oCol;

void main()
{
    // Ambient
    float ambientStrength = 0.1f;
    vec3 ambient = ambientStrength * lCol;
  	
    // Diffuse 
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lPos - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lCol;
    
    // Specular
    float specularStrength = 0.5f;
    vec3 viewDir = normalize(vPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    vec3 specular = specularStrength * spec * lCol;  
        
    vec3 result = (ambient + diffuse + specular) * oCol;
    color = vec4(result, 1.0f);
} 

// REFERENCE: https://learnopengl.com/code_viewer.php?code=lighting/basic_lighting-exercise2 