package com.resturant.menu.models;

import net.glxn.qrgen.QRCode;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.ByteArrayOutputStream;
import java.util.Base64;

@Document(collection= "tables")
public class Table {
    @Id
    String id;
    String label;
    String updated;
    
    //Reading from application.properties would be a good next step
    private final String tableBaseUrl = "http://localhost:8080/order/table/";
    
    public Table(String label) {
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getQrCode() {
        String url = tableBaseUrl + id;
        System.out.println(url);
        
        return getQRCodeImage(url, 600, 600);
    }
    
    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }
    
    private String getQRCodeImage(String text, int width, int height) {
        try {
            ByteArrayOutputStream stream = QRCode
            .from(text)
            .withSize(width, height)
            .stream();
            
            byte[] pngData = stream.toByteArray();
            
            String encoded = Base64.getEncoder().encodeToString(pngData);
            String img = "data:image/jpeg;base64," + encoded;
            return img;
        } catch (Exception e) {
            return "";
        }
    }
}