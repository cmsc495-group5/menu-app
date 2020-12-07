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

    @DBRef
    Section[] sections;

    public Menu(String title, String description, String internalDescription, Section[] sections, HashMap img) {
        this.title = title;
        this.description = description;
        this.internalDescription = internalDescription;
        this.active = false;
        this.sections = sections;
        this.img = img;
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
                ", sections=" + Arrays.toString(sections) +
                '}';
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

}
