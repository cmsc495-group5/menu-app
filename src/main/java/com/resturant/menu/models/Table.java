package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection= "tables")
public class Table {
    @Id
    String id;
    String qrCode;
    @BsonProperty(value="table_id")
    String tableIdentifier;
    
     public Table(String tableIdentifier) {
        this.tableIdentifier = tableIdentifier;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdentifier() {
        return tableIdentifier;
    }

    public void setIdentifier(String tableIdentifier) {
        this.tableIdentifier = tableIdentifier;
    }

    public String getQrCode() {
        //@TODO implment qr code logic
        return "i need to generate a base64";
    }
}