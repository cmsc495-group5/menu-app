package com.resturant.menu.models;


import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Arrays;
import java.util.HashMap;

@Document(collection= "menus")
public class Menu {
    @Id
    String id;
    String title;
    String description;
    Boolean active;
    @BsonProperty(value="internal_description")
    String internalDescription;
    String updated;
    HashMap img;
    String imgID;

    @DBRef
    Section[] sections;

    public Menu(String id, String title, String description, Boolean active, String internalDescription, String updated, HashMap img, String imgID, Section[] sections) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.active = active;
        this.internalDescription = internalDescription;
        this.updated = updated;
        this.img = img;
        this.imgID = imgID;
        this.sections = sections;
    }

    public String getImgID() {
        return imgID;
    }

    public void setImgID(String imgID) {
        this.imgID = imgID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public HashMap getImg() {
        return img;
    }

    public void setImg(HashMap img) {
        this.img = img;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Section[] getSections() {
        return sections;
    }

    public void setSections(Section[] sections) {
        this.sections = sections;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", active=" + active +
                ", internalDescription='" + internalDescription + '\'' +
                ", updated='" + updated + '\'' +
                ", img=" + img +
                ", imgID='" + imgID + '\'' +
                ", sections=" + Arrays.toString(sections) +
                '}';
    }
}
