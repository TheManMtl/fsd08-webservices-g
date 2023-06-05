/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package day05airports;

/**
 *
 * @author Ethan Motlag
 */
public class Airport {
    
    private String code;
    private String city;
    private double latitude;
    private double longitude;
    private Kind kind;
    
    public enum Kind{
        Passenger,Cargo,Military,Private
    };

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Kind getKind() {
        return kind;
    }

    public void setKind(Kind kind) {
        this.kind = kind;
    }
    
    
    
     @Override
    public String toString() {
        return String.format("%s: in %s %f , %f  for (%s)", code, city, latitude, longitude,kind);
    }
    
}
