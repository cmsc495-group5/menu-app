package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection= "order_items")
public class OrderItem {
    @Id
    String id;
    Integer count;
    @BsonProperty(value="prep_notes")
    String prepNotes;
    String updated;
    
    @DBRef
    Item item;
    
    @DBRef
    Table table;
    
    @DBRef
    Option[] options;
    
     public OrderItem(Integer count, String prepNotes, Item item, Table table, Option[] options) {
        this.count = count;
        this.prepNotes = prepNotes;
        this.item = item;
        this.table = table;
        this.options = options;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
    
    public Item getItem() {
        return item;
    }
    
    public void setItem(Item item) {
        this.item = item;
    }
    
    public Table getTable() {
        return table;
    }
    
    public void setTable(Table table) {
        this.table = table;
    }
    
     public Option[] getOptions() {
        return options;
    }

    public void setOptions(Option[] options) {
        this.options = options;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }
}