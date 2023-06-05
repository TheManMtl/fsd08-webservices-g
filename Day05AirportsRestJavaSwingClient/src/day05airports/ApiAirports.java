/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package day05airports;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author Admin
 */
public class ApiAirports {

    static final String BASE_URL = "http://localhost:8080/api";

    private final Gson gson = new GsonBuilder()
            .create();

    
    public ArrayList<Airport> getAllAirports() throws ApiErrorException {
        try {
            URL url = new URL(BASE_URL + "/airports"); 
            connect("GET", url);
            String jsonString = getString(url);
            //Using the GSON library parse the string straight into an arraylist of todos and return it
            Gson gson = new Gson();
            return gson.fromJson(jsonString, new TypeToken<ArrayList<Airport>>() {
            }.getType());
        } catch (IOException e) {
            throw new ApiErrorException(e);
        }
    }

   
    private String sendJson(Airport airport, HttpURLConnection conn) throws IOException, ApiErrorException {
        String json = gson.toJson(airport);
        JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();
        jsonObject.remove("id");

        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonObject.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = conn.getResponseCode();

        if (responseCode != 200 && responseCode != 201) {
            StringBuilder errorBody = new StringBuilder();
            try (Scanner scanner = new Scanner(conn.getErrorStream())) {
                //Write all the JSON data into a string using a scanner
                while (scanner.hasNext()) {
                    errorBody.append(scanner.nextLine());
                }
            }

            System.err.println(errorBody);
            throw new ApiErrorException("HttpResponseCode: " + responseCode);
        }
        StringBuilder responseBody = new StringBuilder();
        try (Scanner scanner = new Scanner(conn.getInputStream())) {
            //Write all the JSON data into a string using a scanner
            while (scanner.hasNext()) {
                responseBody.append(scanner.nextLine());
            }
        }

        System.out.println(responseBody);
        return gson.fromJson(responseBody.toString(), Airport.class).getCode();
    }

    private String getString(URL url) throws ApiErrorException {
        StringBuilder jsonString = new StringBuilder();
        try (Scanner scanner = new Scanner(url.openStream())) {
            //Write all the JSON data into a string using a scanner
            while (scanner.hasNextLine()) {
                jsonString.append(scanner.nextLine());
            }

            return jsonString.toString();
        } catch (IOException e) {
            throw new ApiErrorException(e);
        }
    }

    private HttpURLConnection connect(String method, URL url) throws ApiErrorException {
        try {
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(method);

            if (method.equals("GET") || method.equals("DELETE")) {
                conn.connect();
                int responseCode = conn.getResponseCode();
                if (responseCode != 200 && responseCode != 201) {
                    throw new ApiErrorException("HttpResponseCode: " + responseCode);
                }
            } else if (method.equals("PUT") || method.equals("POST") || method.equals("PATCH")) {
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoOutput(true);
            } else {
                throw new ApiErrorException("Method not valid");
            }
            return conn;
        } catch (IOException e) {
            throw new ApiErrorException(e);
        }
    }
}


 /*
    public Todo getById(int id) throws ApiErrorException {
        //TODO select from list fill the fields on window
        try {
            URL url = new URL(BASE_URL + "/" + id);
            connect("GET", url);

            String jsonString = getString(url);
            //Using the GSON library parse the string straight into an arraylist of todos and return it
            return gson.fromJson(jsonString, Todo.class);

        } catch (MalformedURLException e) {
            throw new ApiErrorException(e);
        }
    }

    public long addNew(Todo todo) throws ApiErrorException {
        //throw new RuntimeException("Not implemented");
        try {
            URL url = new URL(BASE_URL + "/todos"); // ex
           
            return sendJson(todo, connect("POST", url));
        } catch (IOException e) {
            throw new ApiErrorException(e);
        }
    }

    public long update(Todo todo) throws ApiErrorException {
        try {
            URL url = new URL(BASE_URL + "/" + todo.id);
            HttpURLConnection conn = connect("PUT", url);

            return sendJson(todo, conn);

        } catch (IOException e) {
            throw new ApiErrorException(e);
        }
    }

    public boolean delete(int id) throws ApiErrorException {
         try {
            URL url = new URL(BASE_URL + "/" + id);
            HttpURLConnection conn = connect("DELETE", url);

            //Using the GSON library parse the string straight into an arraylist of todos and return it
            return conn.getResponseCode() == 200 || conn.getResponseCode() == 201;

        } catch (IOException e) {
            throw new ApiErrorException(e);
        }
    }
     */
