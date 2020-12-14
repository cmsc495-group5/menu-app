/*
 * file Name: Item.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Model for Items
 */

package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "items")
public class Item {
    @Id
    String id;
    String name;
    String description;

    @BsonProperty(value = "internal_description")
    String internalDescription;
    Double price;
    String updated;

    @DBRef
    Image image;

    @DBRef
    Option[] options;


    public Item(String name, String description, String internalDescription, Double price, Image image, Option[] options) {
        this.name = name;
        this.description = description;
        this.internalDescription = internalDescription;
        this.price = price;
        this.image = image;
        this.options = options;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInternalDescription() {
        return internalDescription;
    }

    public void setInternalDescription(String internalDescription) {
        this.internalDescription = internalDescription;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
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
