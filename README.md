# Table-API-request-project
# Description 
Simple project consisting of backend and frontend. The program calls for an JSON-RPC API providing data about car brands. The data is taken and put in the main table. The user can select the interval for the cars data and the table updates on-apply.

# Flow

Once the user enters the website, a request is sent to the backend asking for all the brands of the API. The backend fetches the API with the fetch() method from the internet and takes the all the brands. Then, a request is made for every brandname to fetch their data using .get_brand_data API function, with "date" parameter(default with {-1,-1} for last 30 days call). Then, as the responses come, the table is built row by row.

By clicking the dates button, the user can select the interval for the data to be requested. After selecting and clicking the "Apply" button, the current table is deleted and the same calls are made, this time the "date" parameter different from {-1,-1}.

# Base tehnologies
Server-side tehnologies used: 
* NODE.JS  (+ node-fetch())
* EXPRESS.JS

Client-side tehnologies used:
* HTML/CSS
* Jquery/Bootstrap
* Javascript

Project-level:
* dotenv 
# How to use

1. Clone the project.
2. Make a file called ".env" and edit it like in the file .env_sample with your API_KEY.
3. In the root project folder run the following command in terminal
```sh
node index.js
```
4. In your browser, enter "http://localhost:3000/". 3000 is the port selected by default by the project.

# Known issues
* Fetching the data from the API is very slow as it always loads the WHOLE API (on a particular brand)
* Restarting the API fetch process while it is ALREADY RUNNING by clicking "Apply" on the datetime-range-picker may result in an error resulting in wrong data order in the table.

# Screenshots
[Building_table](https://imgur.com/SGSI8BR) <br>
[Fully_loaded_table_with_button_view](https://imgur.com/5KXWUKK)

# License
MIT License
