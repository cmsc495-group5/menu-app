package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "order_items")
public class OrderItem {
    @Id
    String id;
    Double total;
    @BsonProperty(value = "prep_notes")
    String prepNotes;
    String updated;
    Integer count;


    @BsonProperty(value = "item_id")
    String itemId;
    @BsonProperty(value = "item_name")
    String itemName;
    Double price;
    String[] options;

    public OrderItem(String id, Double total, String prepNotes, String updated, Integer count, String itemId, String itemName, Double price, String[] options) {
        this.id = id;
        this.total = total;
        this.prepNotes = prepNotes;
        this.updated = updated;
        this.count = count;
        this.itemId = itemId;
        this.itemName = itemName;
        this.price = price;
        this.options = options;
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

    public Double getTotal() {
        return total;
    }
    
    public void setTotal(Double total) {
        this.total = total;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String[] getOptions() {
        return options;
    }

    public void setOptions(String[] options) {
        this.options = options;
    }
}