package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection= "order_items")
public class OrderItem {
    @Id
    String id;
    @BsonProperty(value="prep_notes")
    Double total;
    String prepNotes;
    String updated;
    
    @DBRef
    Item[] items;
    
    @DBRef
    Table table;
    
     public OrderItem(String prepNotes, Item[] items, Table table) {
        this.prepNotes = prepNotes;
        this.items = items;
        this.table = table;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getPrepNotes() {
        return prepNotes;
    }
    
    public void setPrepNotes(String prepNotes) {
        this.prepNotes = prepNotes;
    }
    
    public Item[] getItems() {
        return items;
    }
    
    public void setItems(Item[] items) {
        this.items = items;
        
        Double price = 0.0;
        
        for (Item item : items) {
            price += item.getPrice();
        }
        
        setTotal(price);
    }
    
    public Double getTotal() {
        return total;
    }
    
    public void setTotal(Double total) {
        this.total = total;
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