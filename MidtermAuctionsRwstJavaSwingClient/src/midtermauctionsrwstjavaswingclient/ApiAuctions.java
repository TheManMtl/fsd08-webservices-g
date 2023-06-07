/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package midtermauctionsrwstjavaswingclient;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author Admin
 */
public class ApiAuctions {

    static final String BASE_URL = "http://localhost:2023/api";

    private final Gson gson = new GsonBuilder()
            .create();

    public ArrayList<Auction> getAllAuction(String sort) throws IOException {
        try {
            URL url = new URL(BASE_URL + "/auctions?sortBy=" + sort);
            connect("GET", url);
            String jsonString = getString(url);
            //Using the GSON library parse the string straight into an arraylist of todos and return it
            Gson gson = new Gson();
            return gson.fromJson(jsonString, new TypeToken<ArrayList<Auction>>() {
            }.getType());
        } catch (IOException e) {
            throw new IOException(e);
        }
    }

    // no btn to implement
    public Auction getById(int id) throws IOException {
        //TODO select from list fill the fields on window
        try {
            URL url = new URL(BASE_URL + "/auctions/" + id);
            connect("GET", url);

            String jsonString = getString(url);
            //Using the GSON library parse the string straight into an arraylist of airports and return it
            return gson.fromJson(jsonString, Auction.class);

        } catch (MalformedURLException e) {
            throw new IOException(e);
        }
    }

    public int update(Auction auction) throws IOException {
        try {
            URL url = new URL(BASE_URL + "/auctions/" + auction.getId());
            System.out.println("url:  " + connect("PATCH", url));
            //HttpURLConnection conn = connect("PATCH", url);
            auction.setItemCode("");
            auction.setItemDesc("");
            //auction.setSellerEmail("");
            return sendJson(auction, connect("PATCH", url));
        } catch (IOException e) {
            throw new IOException(e);
        }
    }

    private int sendJson(Auction auction, HttpURLConnection conn) throws IOException {
        String json = gson.toJson(auction);
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
            throw new IOException("HttpResponseCode: " + responseCode);
        }
        StringBuilder responseBody = new StringBuilder();
        try (Scanner scanner = new Scanner(conn.getInputStream())) {
            //Write all the JSON data into a string using a scanner
            while (scanner.hasNext()) {
                responseBody.append(scanner.nextLine());
            }
        }

        System.out.println(responseBody);
        return gson.fromJson(responseBody.toString(), Auction.class).getId();
    }

    private String getString(URL url) throws IOException {
        StringBuilder jsonString = new StringBuilder();
        try (Scanner scanner = new Scanner(url.openStream())) {
            //Write all the JSON data into a string using a scanner
            while (scanner.hasNextLine()) {
                jsonString.append(scanner.nextLine());
            }

            return jsonString.toString();
        } catch (IOException e) {
            throw new IOException(e);
        }
    }

    private HttpURLConnection connect(String method, URL url) throws IOException {
        try {
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(method);

            if (method.equals("GET") || method.equals("DELETE")) {
                conn.connect();
                int responseCode = conn.getResponseCode();
                if (responseCode != 200 && responseCode != 201) {
                    throw new IOException("HttpResponseCode: " + responseCode);
                }
            } else if (method.equals("PUT") || method.equals("POST") || method.equals("PATCH")) {
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoOutput(true);
            } else {
                throw new IOException("Method not valid");
            }
            return conn;
        } catch (IOException e) {
            throw new IOException(e);
        }
    }
}
