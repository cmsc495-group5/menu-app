package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Arrays;
import java.util.HashMap;

@Document(collection= "items")
public class Item {
    @Id
    String id;
    String name;
    String description;

    @BsonProperty(value="section_id")
    String sectionId;

    @BsonProperty(value="internal_description")
    String internalDescription;
    Double price;
    String updated;

    HashMap img;
    String imgID;

    public String getImgID() {
        return imgID;
    }

    public void setImgID(String imgID) {
        this.imgID = imgID;
    }

    public HashMap getImg() {
        return img;
    }

    public void setImg(HashMap img) {
        this.img = img;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", sectionId='" + sectionId + '\'' +
                ", internalDescription='" + internalDescription + '\'' +
                ", price=" + price +
                ", updated='" + updated + '\'' +
                ", img=" + img +
                ", imgID='" + imgID + '\'' +
                ", options=" + Arrays.toString(options) +
                '}';
    }

    @DBRef
    Option[] options;


     public Item(String name, String description, String internalDescription, String sectionId, Double price, Option[] options, HashMap img) {
        this.name = name;
        this.description = description;
        this.internalDescription = internalDescription;
        this.sectionId = sectionId;
        this.price = price;
        this.options = options;
        this.img = img;
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

    public String getSectionId() {
        return sectionId;
    }

    public void setSectionId(String sectionId) {
        this.sectionId = sectionId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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