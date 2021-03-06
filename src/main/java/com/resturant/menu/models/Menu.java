/*
 * file Name: Menu.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Model for Menus
 */

package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "menus")
public class Menu {
    @Id
    String id;
    String title;
    String description;
    Boolean active;
    @BsonProperty(value = "internal_description")
    String internalDescription;
    String updated;

    @DBRef
    Image image;

    @DBRef
    Section[] sections;

    public Menu(String title, String description, String internalDescription, Image image, Section[] sections) {
        this.title = title;
        this.description = description;
        this.internalDescription = internalDescription;
        this.active = false;
        this.image = image;
        this.sections = sections;
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

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
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
