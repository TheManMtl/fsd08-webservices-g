/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package midtermauctionsrwstjavaswingclient;

/**
 *
 * @author Admin
 */
public class Auction {
    
    private int id;
     private String itemCode;
    private String itemDesc;
    private String sellerEmail;
    private String lastBidderEmail;
    private Double lastBid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemDesc() {
        return itemDesc;
    }

    public void setItemDesc(String itemDesc) {
        this.itemDesc = itemDesc;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    public String getLastBidderEmail() {
        return lastBidderEmail;
    }

    public void setLastBidderEmail(String lastBidderEmail) {
        this.lastBidderEmail = lastBidderEmail;
    }

    public Double getLastBid() {
        return lastBid;
    }

    public void setLastBid(Double lastBid) {
        this.lastBid = lastBid;
    }
      
     @Override
    public String toString() {
        return String.format("%d %s  %s  %s  %s  %.2f",
                id, itemCode, itemDesc, sellerEmail,lastBidderEmail,lastBid);
    }
    
}
