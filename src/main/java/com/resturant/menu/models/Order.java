package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection= "orders")
public class Order {
    @Id
    String id;
    String status;
    String updated;
    
    @DBRef
    OrderItem[] items;
    
    @DBRef
    Table table;
    
     public Order(String status, OrderItem[] items, Table table) {
        this.status = status;
        this.items = items;
        this.table = table;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public OrderItem[] getItems() {
        return items;
    }
    
    public void setItems(OrderItem[] items) {
        this.items = items;
    }
    
    public Table getTable() {
        return table;
    }
    
    public void setTable(Table table) {
        this.table = table;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }
}