# API WEATHER

![image](https://github.com/user-attachments/assets/4ee863fe-acfe-4590-a788-77e13cbc6737)

> Support for POST and GET requests

## Resource Information
* Response Formats: JSON
* Requires Authentication? NO.

## How do I run the project?
1. Create a .env file in the /src directory
2. Fill in the following fields:
   

#### URL: http://localhost:{{PORT}} or http://localhost:3004

| Request | Endpoint     |
|---------|--------------|
| GET     | /listWeather |
| POST    | /addWeather  |

Content-type: x-www-form-urlencoded

Parameters required on body:
| Key         | value |
|-------------|-------|
| humidity    |  int  |
| temperature |  int  |

![image](https://github.com/user-attachments/assets/58957b0a-3f21-4a94-91ba-8e6958d688bb)

### Messages about updates on the server via webSocket:

![image](https://github.com/user-attachments/assets/d013a6b5-e081-4c5e-bf85-dae82c93c10b)




